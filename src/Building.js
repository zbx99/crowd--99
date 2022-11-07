import * as THREE from "three";
import JSZip from 'jszip';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

export class Building{
    constructor(scene){
        this.parentGroup = new THREE.Group()
        // this.parentGroup.scale.set(0.0005,0.0005,0.0005)
        this.parentGroup.scale.set(0.00005,0.00005,0.00005)

        scene.add(this.parentGroup)

        this.load()
    }
    load(){
        var self = this
        var url = "assets/Building/tiyuguan.zip"
        var promise = JSZip.external.Promise
        var baseUrl = "blob:"+THREE.LoaderUtils.extractUrlBase(url)
        new promise(function(resolve,reject){
            var loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
            loader.setResponseType('arraybuffer')
            loader.load(url,resolve,()=>{},reject)
        }).then(function(buffer){
            return JSZip.loadAsync(buffer)
        }).then(function(zip){
            var fileMap = {}
            var pendings = []
            for (var file in zip.files){
                var entry = zip.file(file)
                if(entry===null) continue
                pendings.push(entry.async("blob").then(function(file,blob){
                    fileMap[baseUrl+file] = URL.createObjectURL(blob)
                }.bind(this,file)))
            }
            return promise.all(pendings).then(function(){
                return fileMap
            })
        }).then(function(fileMap){
            return {
                urlResolver:function(url){
                    return fileMap[url]?fileMap[url]:url
                }}
        }).then(function(zip){
            var manager = new THREE.LoadingManager()
            manager.setURLModifier(zip.urlResolver)
            return manager
        }).then(function(manager){
            new THREE.FileLoader(manager).load("blob:assets/Building/structdesc.json",json=>{
                var structList = JSON.parse(json)
                new THREE.FileLoader(manager).load("blob:assets/Building/smatrix.json",json=>{
                    var matrixList = JSON.parse(json)
                    new GLTFLoader(manager).load("blob:assets/Building/output.glb",gltf=>{
                        var meshNodeList = gltf.scene.children[0].children
                        self.processMesh(meshNodeList,structList,matrixList)
                    })
                })
            })
        })
    }
    processMesh(meshNodeList,structList,matrixList){
        var wire = new THREE.LineBasicMaterial({color: 0x444444})
        for(let i=0; i<meshNodeList.length; i++){
            var node = meshNodeList[i]
            var stride = node.geometry.attributes.position.data.stride
            for(let j=0; j<structList[i].length; j++){
                var object = node.clone()
                object.geometry = node.geometry.clone()
                object.material = new THREE.MeshStandardMaterial({
                    color:new THREE.Color(0.6+Math.random()*0.4,0.6+Math.random()*0.4,0.6+Math.random()*0.4),
                    emissive:new THREE.Color(Math.random()*0.4,Math.random()*0.4,Math.random()*0.4),
                    side:2
                })
                var group = structList[i][j]
                var index_arr = []
                for(let k=0; k<group.c*3; k+=3){
                    for(let l=0; l<3; l++){
                        index_arr.push(node.geometry.index.array[group.s*3+k+l])
                    }
                }
                var position_arr = []
                var pushed_index = []
                var updated_index_arr = []
                for(let k=0; k<index_arr.length; k++){
                    var t = pushed_index.indexOf(index_arr[k])
                    if(t===-1){
                        pushed_index.push(index_arr[k])
                        updated_index_arr.push(position_arr.length/3)
                        for(let l=0; l<3; l++){
                            position_arr.push(node.geometry.attributes.position.array[index_arr[k]*stride+l])
                        }
                    }else{
                        updated_index_arr.push(t)
                    }
                }
                var new_position_array = new Float32Array(position_arr)
                var new_index_array = new Uint16Array(updated_index_arr)
                object.geometry.attributes.position = new THREE.BufferAttribute(new_position_array,3)
                object.geometry.index = new THREE.BufferAttribute(new_index_array,1)
                object.geometry.computeBoundingBox()
                object.geometry.computeBoundingSphere()
                delete object.geometry.attributes.normal
                object.geometry.computeVertexNormals()

                matrixList[group.n].it.push([1,0,0,0,0,1,0,0,0,0,1,0])
                var instanceMesh = new THREE.InstancedMesh(object.geometry,object.material,matrixList[group.n].it.length)
                for(let k=0; k<matrixList[group.n].it.length; k++){
                    var mat = matrixList[group.n].it[k]
                    var instanceMatrix = new THREE.Matrix4().set(
                        mat[0], mat[1], mat[2], mat[3],
                        mat[4], mat[5], mat[6], mat[7],
                        mat[8], mat[9], mat[10], mat[11],
                        0, 0, 0, 1)
                    instanceMesh.setMatrixAt(k,instanceMatrix)
                }
                this.parentGroup.add(instanceMesh)
                if(matrixList[group.n].it.length===1&&object.geometry.boundingSphere.radius>1000000){
                    var edges = new THREE.EdgesGeometry(object.geometry,60)
                    var lines = new THREE.LineSegments(edges,wire)
                    this.parentGroup.add(lines)
                }
            }
        }
    }
}

import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader.js'
//RGBMLoader
import { Crowd } from '../lib/Crowd.js'//let Crowd=Pack// 
import { CrowdMesh } from '../lib/CrowdMesh.js'//用于预加载动画数据
import { Building } from './Building.js'
import { UI } from './UI.js'
import {MaterialProcessor1,MaterialProcessor2 } from './MaterialProcessor.js'
import {LightProducer } from './LightProducer.js'
export class Loader{
    constructor(body){
        this.body = body
        this.canvas = document.getElementById('myCanvas')
        window.addEventListener('resize', this.resize.bind(this), false)
        this.initScene()
    }
    async initScene(){
        window.timeTest.measure("initScene start")
        this.renderer = new THREE.WebGLRenderer({
            alpha:true,
            antialias: true,
            canvas:this.canvas,
            preserveDrawingBuffer:true
        })
        this.renderer.setSize(this.body.clientWidth,this.body.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        window.renderer=this.renderer
        this.body.appendChild(this.renderer.domElement)
        
        // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		// this.renderer.toneMappingExposure = 1;
		// this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute'
        this.stats.domElement.style.left = '0px'
        this.stats.domElement.style.top = '0px'
        var statsContainer = document.createElement('div')
        statsContainer.id = 'stats-container'
        statsContainer.appendChild(this.stats.domElement)
        this.body.appendChild(statsContainer)

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(50,this.body.clientWidth/this.body.clientHeight,0.1,5000)
        this.camera.position.set(0,900,1200)
        this.camera.position.set( 0.3929843495083386,  3.2093757045637235,  -0.280051510840248)
        this.camera.position.set(28.702579663394783, 2.5203256354368047, -30.803680165450757)
        this.camera.position.set(127.66061219919953,  4.469088314660405,  -50.15099201633093)
        this.camera.position.set(-43.486343682038736,  2.127206120237504,  -8.698678933445201)
        this.camera.lookAt(0,0,0)
        window.camera=this.camera
        
        this.scene.add(this.camera)
        this.orbitControl = new OrbitControls(this.camera,this.renderer.domElement)
        new LightProducer(this.scene)
        
        this.animate = this.animate.bind(this)
        requestAnimationFrame(this.animate)

        this.assets={}//为了防止资源重复加载，相同路径的资源只加载一次
        var pathAnima="assets/animation_woman.bin"//"assets/animation_woman.json"
        window.timeTest.measure("Anima start await")
        this.assets[pathAnima]=await CrowdMesh.loadAnimJSON(pathAnima)
        window.timeTest.measure("Anima end await")
        this.load_model1()
        this.load_model2()
        // new UI(this.scene,new THREE.Object3D())
        new Building(this.scene)
        this.initSky(()=>{
            
        })
    }
    animate(){
        this.stats.update()
        this.renderer.render(this.scene,this.camera)
        requestAnimationFrame(this.animate)
    }
    resize(){
        this.canvas.width = window.innerWidth;//this.body.clientWidth
        this.canvas.height = window.innerHeight;//this.body.clientHeight
        this.camera.aspect = this.canvas.width/this.canvas.height;//clientWidth / clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.canvas.width, this.canvas.height)
    }
    load_model1(){
        var self = this
        var pathModel="assets/woman01.gltf"//woman01_0.glb"
        var pathAnima="assets/animation_woman.bin"//"assets/animation_woman.json"
        var pathLodGeo="assets/woman01LOD/"
        window.timeTest.measure("gltf load start")
        new GLTFLoader().load(pathModel, (glb) => {
            window.timeTest.measure("gltf load end")
            console.log(glb)
            new MaterialProcessor1(glb)
            window.timeTest.measure("MaterialProcessor1 end")
            var crowd=new Crowd({
                camera:self.camera,
                count:100*100/2,//5*100*100,
                animPathPre:pathAnima,
                pathLodGeo:pathLodGeo,
                assets:self.assets,
                useColorTag:[//需要进行颜色编辑的区域mesh名称
                    "CloW_A_kuzi_geo","CloW_A_waitao_geo1","CloW_A_xiezi_geo","hair"
                ],
                lod_distance:[10,20,45,70,90],//6级LOD
                lod_geometry:[19,13,8,4,2,0],
                lod_set:()=>{
                    for(let i=0;i<crowd.children.length;i++){
                        var crowdGroup0=crowd.children[i]
                        crowdGroup0.getMesh("teeth").visible=false
                        if(i==0){
                        }else if(i==1){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                        }else if(i==2){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                        }else if(i==3){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_A_xiezi_geo").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                        }else if(i==4){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_A_xiezi_geo").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                            crowdGroup0.getMesh("hair").visible=false
                        }else if(i==5){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_A_xiezi_geo").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                            crowdGroup0.getMesh("hair").visible=false
                        }
                    }
                },
            })
            window.timeTest.measure("set param start")
            self.setParam(crowd,0)
            window.timeTest.measure("set param end")
            console.log(crowd)
            self.scene.add(crowd)
            window.timeTest.measure("init start")
            crowd.init(
                glb.scene,
                ()=>{
                    window.timeTest.measure("init finish")
                }
            )
            new UI(this.scene,crowd.children[0])
        })
    }
    load_model2(){
        var self = this
        var pathModel="assets/woman02.gltf"//woman01_0.glb"
        var pathAnima="assets/animation_woman.bin"//"assets/animation_woman.json"
        var pathLodGeo="assets/woman02LOD/"
        new GLTFLoader().load(pathModel, (glb) => {
            console.log("model2",glb)
            new MaterialProcessor2(glb)
            var crowd=new Crowd({
                camera:self.camera,
                count:100*100/2,//5*100*100,
                animPathPre:pathAnima,
                pathLodGeo:pathLodGeo,
                assets:self.assets,
                useColorTag:[//需要进行颜色编辑的区域mesh名称
                    "CloW_C_qunzi_geo3456",
                    "CloW_C_shangyi_geo",
                    "CloW_C_xie_geo",
                    "hair"
                ],
                lod_distance:[10,20,45,70,90],//6级LOD
                lod_geometry:[19,13,8,4,2,0],
                lod_set:()=>{
                    for(let i=0;i<crowd.children.length;i++){
                        var crowdGroup0=crowd.children[i]
                        crowdGroup0.getMesh("teeth").visible=false
                        if(i==0){
                        }else if(i==1){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                        }else if(i==2){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                        }else if(i==3){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_C_xie_geo").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                        }else if(i==4){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_C_xie_geo").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                            crowdGroup0.getMesh("hair").visible=false
                        }else if(i==5){
                            crowdGroup0.getMesh("eyelash").visible=false
                            crowdGroup0.getMesh("CloW_C_xie_geo").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeRight_geo01").visible=false
                            crowdGroup0.getMesh("CloW_E_eyeLeft_geo02").visible=false
                            crowdGroup0.getMesh("hair").visible=false
                        }
                    }
                },
            })
            self.setParam(crowd,1)
            self.scene.add(crowd)
            window.crowd=crowd
            console.log(crowd)
            crowd.init(
                glb.scene
            )
        })
    }
    setParam(crowd,model_index){
        var crowd_count=100*100
        for(var i0=0;i0<crowd_count;i0++){
            var scale=[
                1,
                Math.random()*0.3+0.85,
                1,
            ]
            for(var i=0;i<3;i++)scale[i]*=1.3
            var animtionType=Math.floor(12*Math.random())
            if(i0<1250){
                if(Math.random()>0.5)animtionType=5
                else animtionType=8
            }else if(animtionType==5)animtionType=0
            else if(animtionType==8)animtionType=1

            var speed=Math.random()*2.5+2
            if(animtionType==5)speed+=1.5
            
            if(i0%2==model_index)continue
            let i00=Math.floor(i0/2)

            crowd.setSpeed(i00, speed)
            crowd.setObesity(i00, 0.85+1.1*Math.random())
            if(animtionType==5||animtionType==8)
                crowd.setMoveMaxLength(i00, 4+2*Math.random())
            crowd.setScale(i00, scale)

            var PosRot=this.getPosRot(i0)
            crowd.setPosition(i00,PosRot.pos)
            crowd.setRotation(i00,PosRot.rot)

            crowd.setAnimation(i00,animtionType,10000*Math.random())

            if(model_index==1){
                crowd.setColor(i00, [
                    62*Math.random(),
                    62*Math.random(),
                    62*Math.random()
                ],"CloW_C_qunzi_geo3456")
                crowd.setColor(i00, [
                    -Math.random(),
                    -Math.random(),
                    -Math.random()
                ],"CloW_C_shangyi_geo")
                crowd.setColor(i00, [
                    67*Math.random(),
                    67*Math.random(),
                    67*Math.random()
                ],"CloW_C_xie_geo")
                crowd.setColor(i00, [
                    20*Math.random(),
                    12*Math.random(),
                    12*Math.random()
                ],"hair")
            }else if(model_index==0){
                crowd.setColor(i00, [
                    12*Math.random(),
                    12*Math.random(),
                    12*Math.random()
                ],"CloW_A_kuzi_geo")
                crowd.setColor(i00, [
                    12*Math.random(),
                    12*Math.random(),
                    12*Math.random()
                ],"CloW_A_waitao_geo1")
                crowd.setColor(i00, [
                    12*Math.random(),
                    12*Math.random(),
                    12*Math.random()
                ],"CloW_A_xiezi_geo")
                crowd.setColor(i00, [
                    20*Math.random(),
                    12*Math.random(),
                    12*Math.random()
                ],"hair")
            }
        }//end

    }
    getPosRot(i0) {
        var c=[//分组情况
            1250,   //运动
            15*182,     //大看台1
            21*182,     //大看台2
            20*60   //小看台1
        ]
        if(i0<c[0]){
            var col_count=25
            var row_count=50
            var i=i0%col_count
            var j=Math.floor(i0/col_count)
            var position=[
                2*(1.8*i+1.5*Math.random()-col_count/2-20+11),
                0,
                2*(1.8*j+1.5*Math.random()-row_count/2-25+5),
            ]
            var rotation=[0,Math.PI*2*Math.random(),0]
        }
        else if(i0<c[0]+c[1]){//大看台1
            i0-=c[0]
            var row_count=182
            var row=i0%row_count
            var col=Math.floor(i0/row_count)+1
            var position=[
                1.5*-31-1.5*(col)*1.9,
                1.3*col,//
                0.82*row-75,
            ]
            var rotation=[0,-Math.PI*0.5,0]
        }
        else if(i0<c[0]+c[1]+c[2]){//大看台2
            i0-=(c[0]+c[1])
            var row_count=182
            var row=i0%row_count
            var col=Math.floor(i0/row_count)+1
            var position=[
                1.5*31+1.5*col*1.9,
                1.3*col,
                0.82*row-75,
            ]
            var rotation=[0,Math.PI*0.5,0]
        }
        else if(i0<c[0]+c[1]+c[2]+c[3]){//小看台1
            i0-=(c[0]+c[1]+c[2])
            var row_count=60
            var row=i0%row_count
            var col=Math.floor(i0/row_count)
            if(col>12)col+=4
            var position=[
                1.*row-30,//1.5*(row*0.25-50)*2.01+73,
                1.28*col,
                -99-1.5*col*1.9,
            ]
            var rotation=[0,-Math.PI,0]
        }else{//小看台2
            i0-=(c[0]+c[1]+c[2]+c[3])
            var row_count=60
            var row=i0%row_count
            var col=Math.floor(i0/row_count)
            if(col>0)col+=3
            if(col>12)col+=4
            var position=[
                1.*row-30,//1.5*(row*0.25-50)*2.01+73,
                1.28*col,
                99+1.5*col*1.9
            ]
            var rotation=[0,0,0]
            // var position=[-1000,-1000,-1000]
        }
        return {pos:position,rot:rotation} 
    }
    initSky(cb){
        var scope=this
        // this.getCubeMapTexture('assets/environment/skybox.hdr').then(
        //     ({ envMap }) => {
        //         scope.scene.background = envMap
        //         console.log(envMap)
        //     }
        // )
        // this.getCubeMapTexture('assets/environment/footprint_court_2k.hdr').then(
        //     ({ envMap }) => {
        //         scope.scene.environment = envMap
        //     }
        // )
        // this.getCubeMapTexture('assets/environment/skybox.hdr').then(//royal_esplanade_1k
        this.getCubeMapTexture('assets/environment/royal_esplanade_1k.hdr').then(
            ({ envMap }) => {
                // envMap.mapping = THREE.EquirectangularReflectionMapping;
                // scope.scene.background = envMap
                scope.scene.environment = envMap
                if(cb)cb()
                console.log(envMap)
            }
        )
    }
    getCubeMapTexture(evnMapAsset) {
        function isMobile() {
          let check = false
            ; (function (a) {
              if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                  a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                  a.substr(0, 4)
                )
              )
                check = true
            })(navigator.userAgent || navigator.vendor || window.opera)
          if (check == false) {
            check =
              [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
              ].includes(navigator.platform) ||
              // iPad on iOS 13 detection
              (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
          }
          return check
        }
    
        var isIosPlatform = isMobile()
    
        var path = evnMapAsset
    
        var scope = this
        var HalfFloatType=THREE.HalfFloatType
        var FloatType=THREE.FloatType
        return new Promise((resolve, reject) => {
          if (!path) {
            resolve({ envMap: null })
          } else if (path.indexOf('.hdr') >= 0) {
            new RGBELoader()
              .setDataType(isIosPlatform ? HalfFloatType : FloatType)
              .load(
                path,
                texture => {
                  scope.pmremGenerator = new THREE.PMREMGenerator(scope.renderer)
                  scope.pmremGenerator.compileEquirectangularShader()
    
                  const envMap =
                    scope.pmremGenerator.fromEquirectangular(texture).texture
                  scope.pmremGenerator.dispose()
    
                  resolve({ envMap })
                },
                undefined,
                reject
              )
          } else if (path.indexOf('.png') >= 0) {
            new RGBMLoader(this.options.manager).setMaxRange(8).load(
              path,
              texture => {
                scope.pmremGenerator = new PMREMGenerator(scope.renderer)
                scope.pmremGenerator.compileEquirectangularShader()
    
                const envMap =
                  scope.pmremGenerator.fromEquirectangular(texture).texture
                scope.pmremGenerator.dispose()
    
                resolve({ envMap })
              },
              undefined,
              reject
            )
          }
        })
      }
    
}
document.addEventListener('DOMContentLoaded', () => {
    window.timeTest.measure("document.addEventListener")
    new Loader(document.body)
    //document.documentElement.clientHeight和document.documentElement.clientWidth
})

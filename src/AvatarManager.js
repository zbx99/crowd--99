import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
//RGBMLoader
import { Crowd } from '../lib/Crowd.js'//let Crowd=Pack// 
import { CrowdMesh } from '../lib/CrowdMesh.js'//用于预加载动画数据
import { UI } from './UI.js'
import {MaterialProcessor1,MaterialProcessor2 } from './MaterialProcessor.js'
export class AvatarManager{
    constructor(scene,camera){
        this.scene=scene
        this.camera=camera
        this.assets={}//为了防止资源重复加载，相同路径的资源只加载一次
        this.init()
    }
    async init(){
        var pathAnima="assets/animation_woman.bin"//"assets/animation_woman.json"
        window.timeTest.measure("Anima start await")
        this.assets[pathAnima]=await CrowdMesh.loadAnimJSON(pathAnima)
        window.timeTest.measure("Anima end await")
        this.load_model1()
        this.load_model2()
    }
    load_model1(){
        var self = this
        var pathModel="assets/woman01.gltf"//woman01_0.glb"
        var pathAnima="assets/animation_woman.bin"//"assets/animation_woman.json"
        var pathLodGeo="assets/woman01LOD/"
        window.timeTest.measure("gltf load start")
        new GLTFLoader().load(pathModel, async (glb) => {
            window.timeTest.measure("gltf load end")
            console.log(glb)
            const p=new MaterialProcessor1(glb)
            await p.init()
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
}
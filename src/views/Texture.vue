<template>
  
</template>
<script>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  setup(){
    let camera="" 
    let scene = ""
    let renderer='' //声明相机、场景、渲染器
    let mesh ="" //声明网格对象
    onMounted(() => {
      init()
      render()
    })
    const init = () => {
        //生成透视投影相机并加入场景
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,0.1,1000);
        camera.position.z = 400;
        scene = new THREE.Scene();

        //纹理加载 (注意load方法的参数为需要加载的素材路径)
        var texture = new THREE.TextureLoader().load('/public/kk-bg2.png')
        //创建立方缓冲几何体
        var geometry = new THREE.BoxBufferGeometry(150,150,150);
        //创建材质

            /*
        alphaMap	alpha地图是一种灰度纹理，它控制着表面的不透明度（黑色：完全透明;白:完全不透明)。默认为null。
        color	材料的颜色值，默认为白色
        combine	将材质表面颜色与环境贴图相结合，默认为THREE.Multiply，如果选择混合模式，则反射率是用来混合两种颜色的
        envMap	环境贴图，默认为null
        lightMap	灯光贴图，默认为null
        lightMapIntensity	灯光贴图的强度，默认为1
        lights	材料是否受到光线影响，默认为false
        map	贴图，默认为null
        reflectivity	反射率，表面对环境的影响程度，有效范围在0 - 1之间，默认为1
        wireframe	是否以线框模式呈现，默认为false
            * */
        var material = new THREE.MeshBasicMaterial({
            map:texture
        })

        //创建立方体对象
        mesh = new THREE.Mesh(geometry,material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer({
            alpha:true,
            antialias:true
        })
        //设置渲染器背景颜色
        renderer.setClearColor("skyblue");
        //设置渲染器像素分辨值
        renderer.setPixelRatio(window.devicePixelRatio);
        //设置渲染器区域
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }
    
    //渲染
    //调用渲染函数
    const render = ()=>{
      requestAnimationFrame(render);
        //做旋转
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        renderer.render(scene,camera)
    }

    // const controls = new OrbitControls(camera,renderer.domElement)
  }
}
</script>

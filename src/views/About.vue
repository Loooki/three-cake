<template>
  <!-- <div id="canvas-frame" ref="canvas"></div> -->
</template>
<script>
import { onMounted, ref, reactive} from 'vue'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  setup() {
    const obj = {
      renderer: null, //渲染器
      camera : null, //相机
      scene : null, //场景 
      cube : null //物体
    }
    //初始化three.js运行所需环境
    const initThree = () =>{
      obj.renderer = new THREE.WebGLRenderer({
        antialias : true
      })
      obj.renderer.setSize(window.innerWidth, window.innerHeight)
      //将画布挂载到页面
      document.body.appendChild(obj.renderer.domElement); 
      obj.renderer.setClearColor(0xb9d3ff, 1)
    }
    //初始化相机函数
    const initCamera = () => {
    /**
     * 创建一个透视相机的实例语法 
     * PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : NUmber)
     * fov - 视角
     * aspect - 物体长宽比
     * near - 相机近点截图
     * far - 相机远点截图
     */
      obj.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000)
      //设置相机三三维空间坐标中的位置
      obj.camera.position.x = 0
      obj.camera.position.y = 10
      obj.camera.position.z = 1
      obj.camera.up.x = 0;
      obj.camera.up.y = 0;
      obj.camera.up.z = 1;
      //设置相机观察点
      obj.camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    //initScene函数创建一个场景并赋值给scene变量
    const initScene = () => {
      obj.scene = new THREE.Scene()
    }

    //设置物体
    const initObject = () => {
      //创建几何实例
      let geometry = new THREE.BoxGeometry(1, 1, 1)
      //创建一种材质实例
      let material = new THREE.MeshBasicMaterial({
        color : 0x00ff00
      })

      //Mesh是一种三角形网格基本单元的构造函数，类似于webgl中的片元着色器，它用于连接几何体和材质
      obj.cube = new THREE.Mesh(geometry, material)

      //将创建好的几何体添加到场景中
      obj.scene.add(obj.cube)
    }

    //循环渲染
    const render = () => {
      obj.cube.rotation.x += 0.01
      obj.cube.rotation.y += 0.01
      obj.renderer.render(obj.scene, obj.camera)
      requestAnimationFrame(render) 
    }
    //
    const threeStart = () => {
      initThree()
      initCamera()
      //创建控件对象,轨道控制器
      const controls = new OrbitControls(obj.camera,obj.renderer.domElement)
      initScene()
      initObject()
      render()
    }
    onMounted(() => {
      threeStart()
    })
  }
}
</script>
<style lang="scss">
  #canvas-frame {
      border: none;
      cursor: pointer;
      width: 100%;
      height: 600px;
      background-color: #EEEEEE;
  }
</style>

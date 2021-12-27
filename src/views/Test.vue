<template>
  
</template>
<script>
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
export default {
  setup(){
    //定义场景并初始化
		var scene;
		const initScene=()=>{
			scene = new THREE.Scene();
		}
		
		//定义相机并初始化
		var camera;
		const initCamera=()=>{
			camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000);
			camera.position.set(0,100,500);
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
		
		//定义渲染器并初始化
		var renderer;
		const initRenderer=()=>{
			renderer= new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth,window.innerHeight);
			document.body.append(renderer.domElement);
			renderer.setClearColor(0x39609b,1);
		}
		
		//定义灯光并初始化
		var light;
		const initLight=()=>{
			light=new THREE.DirectionalLight(0xFF0000,1.0,0);
			light.position.set(100,100,200);
			scene.add(light);
		}

    const init3DText=(fontloader)=>{
			var fontloader;
			fontloader = new FontLoader();
			fontloader.load('/gentilis_bold.typeface.json',function(font){
				var text="FOX";
				var g=new TextGeometry(text,{
					font:font,
					size:100,
					height:30,
				});
				
				g.computeBoundingBox()
				//3D文字材质
				var m = new THREE.MeshBasicMaterial({color:0xffff00})
				var mesh = new THREE.Mesh(g,m)
				// 加入到场景中
				scene.add(mesh) 
			})
		}
    const threeStart=()=>{
			initScene()
			initCamera()
			initRenderer()
			initLight()
			init3DText()
			// 渲染
			animate()
		}
		
     const animate=()=>{
        requestAnimationFrame( animate )
        // 渲染
        renderer.render(scene,camera)
    }
    threeStart()

  }
}
</script>

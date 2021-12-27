<template>
  <div class="relative w-screen h-screen">
  <div class="sun w-full h-full bg-black"></div>
</div>
</template>
<script>
import * as THREE from 'three'
export default {
  setup(){
    //1.渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement)
    //场景
    const scene = new THREE.Scene()
    //相机
    const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,500)
    camera.position.set(0,0,100)
    camera.lookAt(0,0,0)

    //物体---线条
    //物体材质
    const material = new THREE.LineBasicMaterial({ color: 0x000ff})
    //带定点的几何体
    const points = []
    points.push( new THREE.Vector3(-10,0,0))
    points.push( new THREE.Vector3(0,10,0))
    points.push( new THREE.Vector3(10,0,0))
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)

    //渲染
    //物体添加到场景中
    scene.add(line)
    //调用渲染函数
    renderer.render(scene, camera)
  }
}
</script>

<template>

</template>
<script>
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
export default {
  setup(){
    const width = window.innerWidth;
    const height = window.innerHeight;
     //窗口宽高比
    const k = width / height;
    //一、渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width,height)
    //设置背景颜色
    renderer.setClearColor(0xb9d3ff, 1);
    document.body.appendChild(renderer.domElement)

    //二、场景
    const scene = new THREE.Scene()

    //三、相机--使用正交相机
    //三维场景显示范围的宽度
    const s = 200;
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

    //四、物体---cake
    const cake = new THREE.Group();

    const initCake = () => {
      camera.position.set(0, 100, 500)
      camera.lookAt(scene.position);
      //五、光源
      //使用环境光，均匀照射
      const light = new THREE.AmbientLight(0xCCCCCC)
      scene.add(light);

      const axesHelper = new THREE.AxesHelper(2500);
      scene.add(axesHelper);

      //1.使用使用纹理加载器 TextureLoader 去加载图片
      //蛋糕3层，一层底座，共4个圆柱体，底座一个图片，三个圆柱侧面图，一个截面图
      const cakeTexture1 = new THREE.TextureLoader().load(require('@/assets/fh.jpeg'))
      const cakeTexture2 = new THREE.TextureLoader().load(require('@/assets/fh.jpeg'))
      const cakeTexture3 = new THREE.TextureLoader().load(require('@/assets/fh.jpeg'))
      const cakeTexture4 = new THREE.TextureLoader().load('/kk-bg2.png')

      //2.构成纹理贴图的材质
      const cakeMaterail1 = new THREE.MeshBasicMaterial({map: cakeTexture1});
      const cakeMaterail2 = new THREE.MeshBasicMaterial({map: cakeTexture2});
      const cakeMaterail3 = new THREE.MeshBasicMaterial({map: cakeTexture3});
      const cakeMaterail4 = new THREE.MeshBasicMaterial({map: cakeTexture4});

      //3.除了纹理贴图的材质外，再准备个颜色构成的材质：
      const pinkMaterial = new THREE.MeshBasicMaterial({color: 'pink'});

      //4.创建 4 个圆柱体的物体（Mesh），使用不同的贴图材质和颜色材质
      const cakeGeometry1 = new THREE.CylinderBufferGeometry(100, 100, 70, 40);
      const cakePart1 = new THREE.Mesh(cakeGeometry1, [cakeMaterail1, pinkMaterial,   pinkMaterial]);
      cakePart1.translateY(45)

      const cakeGeometry2 = new THREE.CylinderBufferGeometry(120, 120, 70, 40);
      const cakePart2 = new THREE.Mesh(cakeGeometry2,[cakeMaterail2, pinkMaterial,      pinkMaterial]);
      cakePart2.translateY(-25)

      const cakeGeometry3 = new THREE.CylinderBufferGeometry(140, 140, 60, 40);
      const cakePart3 = new THREE.Mesh(cakeGeometry3, [cakeMaterail3, pinkMaterial,       pinkMaterial]);
      cakePart3.translateY(-90)

      const cakeGeometry4 = new THREE.CylinderBufferGeometry(160, 160, 10, 40);
      const cakePart4 = new THREE.Mesh(cakeGeometry4, [cakeMaterail4, cakeMaterail4,      cakeMaterail4]);
      cakePart4.translateY(-120)

      cake.add(cakePart1)
      cake.add(cakePart2)
      cake.add(cakePart3)
      cake.add(cakePart4)

      //文字的部分，这个要先通过字体文件 ttf 转成 typeface.json 的文件，然后用 fontLoader 来加载，之后创建相应的 Mesh
      const fontLoader = new FontLoader();
      fontLoader.load('/gentilis_bold.typeface.json', function (font) {
        var textGeometry = new TextGeometry('KinKi Kids', {
            font: font,
            size: 30,
            height: 5,
            bevelEnabled: true,
            bevelSize: 10,
        });
        const textMaterial = ['white', 'red'].map(color => new THREE.MeshBasicMaterial({color}));

        const text = new THREE.Mesh(textGeometry, textMaterial);
        text.translateY(90)
        text.translateX(-90)

        cake.add(text); 
      });

      scene.add(cake)
      renderer.render(scene, camera)
    }
    const initAimate = () =>{
      initCake()
    }
    //渲染
    //调用渲染函数
    const render = ()=>{
      renderer.render(scene, camera)
      cake.rotation.y += 0.005
      requestAnimationFrame(render)
    }

    initAimate()
    render()
    const controls = new OrbitControls(camera,renderer.domElement)
  }
}
</script>

import React, { useRef, useMemo, useLayoutEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Environment,
  OrbitControls,
  Plane,
  useGLTF,
  useAnimations,
  Html
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import {
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
  CSS3DObject,
  MeshBasicMaterial
} from "three";

import "./styles.css";

export default function App() {
  const controlsRef = useRef();

  return (
    <>
      {/* <video src="/bg15.mp4" autoPlay loop /> */}
      <video src="/bg5.mp4" autoPlay loop />
      <div className="sign" id="instructions">
        <div id="animation"></div>
        <div className="helptext">
          <span className="helptext">Drag to explore</span>
        </div>
      </div>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <ambientLight intensity={0.2} />
        {/* <Environment
          // files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@annotations/public/img/workshop_1k.hdr"
          // background
          preset={"forest"}
          intensity={0}
        /> */}
        {/* <ambientLight intensity={0.8} /> */}
        <OrbitControls
          ref={controlsRef}
          autoRotate
          enablePan={false}
          minPolarAngle={Math.PI / 2.9}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={6}
          maxDistance={9}
        />
        <Model controlerRef={controlsRef} />
      </Canvas>
    </>
  );
}

export function Model({ controlerRef, ...props }) {
  const texture = useLoader(TextureLoader, "/demo2.png");
  const [showProduct, setShowProduct] = useState({});

  // const [toggleShowDescription, setToggleShowDescription] = useState(false);
  // const [newObjId, setNewObjId] = useState(null);

  const { camera, scene } = useThree();

  const group = useRef();
  const { nodes, materials } = useGLTF("/ccl.glb");

  let showProductDescription = false;
  let newObjectId;

  // const handlePointerOver = (event) => {
  //   event.stopPropagation();

  //   if (!showProductDescription) {
  //     newObjectId = showDescription(event);

  //     setTimeout(() => {
  //       // console.log("hide the desctiption");
  //       if (showProductDescription) hideDescription(newObjectId);
  //     }, 14000);
  //   } else {
  //     hideDescription(newObjectId);
  //   }
  // };

  const allProductDetails = [
    {
      name: "Circle013",
      title: "Fingureprint",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    },

    {
      name: "Circle012",
      title: "Family",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    },
    {
      name: "Circle014",
      title: "Pages",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    },
    {
      name: "Circle009",
      title: "GDPR",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    },

    {
      name: "Circle001",
      title: "STAR",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    },

    {
      name: "Circle",
      title: "NFT",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    },
    {
      name: "Circle011",
      title: "Menu",
      description: "Decentralized Identity Management",
      link: "https://www.google.com/"
    }
  ];

  const handlePointerOver = (event) => {
    // console.log("event", event.object.name);
    event.stopPropagation();
    controlerRef.current.autoRotate = false;
    let filteredProduct = allProductDetails.filter(
      (product) => product.name === event.object.name
    );
    filteredProduct = filteredProduct[0];
    console.log("file", filteredProduct);
    setShowProduct(filteredProduct);
    setTimeout(() => {
      controlerRef.current.autoRotate = true;
      setShowProduct({});
    }, 3000);
  };

  const hideDescription = (newObjId) => {
    //turnOn autoRotate of orbitcontrols
    controlerRef.current.autoRotate = true;
    let newObj = scene.getObjectById(newObjId, true);
    newObj.parent.remove(newObj);
    showProductDescription = false;
  };

  const showDescription = (event) => {
    //turnoff autoRotate of orbitcontrols
    // map: texture

    // const canvas = document.createElement("canvas");
    // canvas.width = 256;
    // canvas.height = 128;
    // const ctx = canvas.getContext("2d");
    // // ctx.fillStyle = "#ff0000";
    // // ctx.fillRect(0, 0, 256, 128);
    // ctx.font = "20px Arial";
    // ctx.fillStyle = "#ffffff";
    // ctx.globalAlpha = 0.5;
    // ctx.fillText("Hello, world!", 10, 50);

    // var img = new Image();
    // img.onload = function () {
    //   ctx.drawImage(img, 0, 0);
    // };
    // img.src = "/demo2.png";

    var canvas = document.createElement("canvas");

    var ctx = canvas.getContext("2d");

    // Draw the product container
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 600, 272);

    // Draw the title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 24px Montserrat";
    ctx.fillText("GDPR", 20, 40);

    // Draw the horizontal line
    var gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, "#fa5003");
    gradient.addColorStop(0.6042, "#f99010");
    ctx.fillStyle = gradient;
    ctx.fillRect(20, 55, 260, 4);

    // Draw the description
    ctx.fillStyle = "#000000";
    ctx.font = "500 16px Montserrat";
    ctx.fillText("Decentralized Identity Management", 20, 90);

    // Draw the vertical dotted line
    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(150, 136);
    ctx.lineTo(150, 400);
    ctx.stroke();

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.needsUpdate = true;

    controlerRef.current.autoRotate = false;
    const newMesh = new Mesh(
      new PlaneGeometry(),
      new MeshBasicMaterial({
        map: canvasTexture,
        // map: texture,
        // map: canvasHTMLTexture,
        transparent: true
      })
    );
    let { x, y, z } = event.object.parent.position;
    let {
      x: rotationX,
      y: rotationY,
      z: rotationZ
    } = event.object.parent.rotation;

    // newMesh.position.set(x, y + 1.5, z);
    newMesh.scale.set(2.5, 2.5, 2.5);
    newMesh.position.set(x, y + 2, z);
    newMesh.rotation.set(rotationX, rotationY, rotationZ);

    // Add the new mesh to the scene
    // camera.position.set(x, y + 2, z);
    // camera.lookAt(newMesh.position);
    group.current.add(newMesh);

    showProductDescription = true;
    return newMesh.id;
  };

  const getProductCard = () => {
    return (
      <Html
        // transform
        // wrapperClass="htmlScreen"
        distanceFactor={4}
        position={[-1.3, 2, 0]}
        //   rotation-y={1.565}
      >
        <div
          className="description-box"
          // onClick={window.open(showProduct.link, "_blank")}
          onClick={() => {
            console.log("showDescription.link", showDescription.link);
            window.open(showProduct.link, "_blank");
          }}
        >
          <div className="product-container">
            <span className="title">{showProduct.title}</span>
            {/* <button>More Info</button> */}
            <hr />
            <p>{showProduct.description}</p>
          </div>
          <div className="vertical-dotted-line"></div>
        </div>
      </Html>
    );
  };
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="orbit_4"
          castShadow
          receiveShadow
          geometry={nodes.orbit_4.geometry}
          material={materials["white.003"]}
          rotation={[Math.PI, -0.58, Math.PI]}
          scale={[490.04, 0.05, 490.04]}
        />
        <mesh
          name="orbit_2"
          castShadow
          receiveShadow
          geometry={nodes.orbit_2.geometry}
          material={materials["white.001"]}
          rotation={[Math.PI, -0.35, Math.PI]}
          scale={[318.16, 0.05, 318.16]}
        />
        <mesh
          name="orbit_1"
          castShadow
          receiveShadow
          geometry={nodes.orbit_1.geometry}
          material={materials.white}
          rotation={[-Math.PI, 1.21, -Math.PI]}
          scale={[230.84, 0.05, 230.84]}
        />
        <mesh
          name="orbit_3"
          castShadow
          receiveShadow
          geometry={nodes.orbit_3.geometry}
          material={materials["white.002"]}
          rotation={[Math.PI, -0.93, Math.PI]}
          scale={[401.27, 0.05, 401.27]}
        />
        <mesh
          name="orbit_5"
          castShadow
          receiveShadow
          geometry={nodes.orbit_5.geometry}
          material={materials["white.004"]}
          rotation={[0, 0.21, 0]}
          scale={[576.38, 0.05, 576.38]}
        />
        <mesh
          name="orbit_6"
          castShadow
          receiveShadow
          geometry={nodes.orbit_6.geometry}
          material={materials["white.005"]}
          rotation={[-Math.PI, 0.18, -Math.PI]}
          scale={[665, 0.05, 665]}
        />

        <Billboard position={[0.34, 0, -2.19]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle"
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Material.011"]}
            // position={[0.34, 0, -2.19]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
          {showProduct.name === "Circle" && getProductCard()}
        </Billboard>

        <Billboard position={[-2.6, 0, 1.06]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle001"
            castShadow
            receiveShadow
            geometry={nodes.Circle001.geometry}
            material={materials["Material.004"]}
            // position={[-2.6, 0, 1.06]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />
          {showProduct.name === "Circle001" && getProductCard()}
        </Billboard>

        <Billboard position={[-2.49, 0, -2.33]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle009"
            castShadow
            receiveShadow
            geometry={nodes.Circle009.geometry}
            material={materials["Material.009"]}
            // position={[-2.49, 0, -2.33]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />

          {showProduct.name === "Circle009" && getProductCard()}
        </Billboard>

        <Billboard position={[1.6, 0, 0.21]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle011"
            castShadow
            receiveShadow
            geometry={nodes.Circle011.geometry}
            material={materials["Material.002"]}
            // position={[1.6, 0, 0.21]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />

          {showProduct.name === "Circle011" && getProductCard()}
        </Billboard>

        <Billboard position={[0.86, 0, -4.56]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle012"
            castShadow
            receiveShadow
            geometry={nodes.Circle012.geometry}
            material={materials["Material.010"]}
            // position={[0.86, 0, -4.56]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />

          {showProduct.name === "Circle012" && getProductCard()}
        </Billboard>

        <Billboard position={[5.08, 0, -1.6]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle013"
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials["Material.008"]}
            // position={[5.08, 0, -1.6]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />

          {showProduct.name === "Circle013" && getProductCard()}
        </Billboard>

        <Billboard position={[0.41, 0, 4.01]} args={[1000, 1100]}>
          <mesh
            onPointerOver={handlePointerOver}
            // onPointerOut={handlePointerOut}
            name="Circle014"
            castShadow
            receiveShadow
            geometry={nodes.Circle014.geometry}
            material={materials["Material.003"]}
            // position={[0.41, 0, 4.01]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.57}
          />

          {showProduct.name === "Circle014" && getProductCard()}
        </Billboard>

        <mesh
          name="orbit_7"
          castShadow
          receiveShadow
          geometry={nodes.orbit_7.geometry}
          material={materials["white.006"]}
          rotation={[-Math.PI, 0.26, -Math.PI]}
          scale={[763.17, 0.05, 763.17]}
        />

        <Billboard position={[0, 0, 0]} args={[1000, 1100]}>
          <mesh
            name="Frame_1"
            castShadow
            receiveShadow
            geometry={nodes.Frame_1.geometry}
            material={materials["Frame 1"]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={4.78}
          />
        </Billboard>
      </group>
    </group>
  );
}

useGLTF.preload("/ccl.glb");

{
  /* <Billboard position={[0, 0, 0]} args={[1000, 1100]}>
<mesh
  name="cc_logo"
  castShadow
  receiveShadow
  geometry={nodes.cc_logo.geometry}
  material={materials.cc_gradient_01}
  rotation={[Math.PI / 2, 0, 0]}
  scale={2.69}
/>
</Billboard> */
}

import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Preload,
  Image as ImageImpl,
  ScrollControls,
  Scroll,
  useScroll,
  Html,
  useProgress,
} from "@react-three/drei";
import "./styles.css";

function Image(props) {
  const ref = useRef();
  const group = useRef();
  const data = useScroll();
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      Math.max(0, data.delta * 50),
      4,
      delta,
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta,
    );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props}>
      <Image
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[0]}
      />
      <Image
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[1]}
      />
      <Image
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[2]}
      />
    </group>
  );
}

function Pages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Page
        position={[-width * 1, 0, 0]}
        urls={["avatar/4.png", "/avatar/5.png", "/avatar/6.png"]}
      />
      <Page
        position={[width * 0, 0, 0]}
        urls={["/avatar/7.png", "/avatar/8.png", "/avatar/9.png"]}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={["/avatar/10.png", "/avatar/11.png", "/avatar/12.png"]}
      />
      <Page
        position={[width * 2, 0, 0]}
        urls={["/avatar/1.png", "/avatar/2.png", "/avatar/3.png"]}
      />
      <Page
        position={[width * 3, 0, 0]}
        urls={["/avatar/1.png", "/avatar/4.png", "/avatar/5.png"]}
      />

      <Page
        position={[width * 4, 0, 0]}
        urls={["avatar/27.png", "/avatar/25.png", "/avatar/26.png"]}
      />
      <Page
        position={[width * 5, 0, 0]}
        urls={["/avatar/22.png", "/avatar/23.png", "/avatar/24.png"]}
      />
      <Page
        position={[width * 6, 0, 0]}
        urls={["/avatar/21.png", "/avatar/20.png", "/avatar/19.png"]}
      />
      <Page
        position={[width * 7, 0, 0]}
        urls={["/avatar/16.png", "/avatar/17.png", "/avatar/18.png"]}
      />
      <Page
        position={[width * 8, 0, 0]}
        urls={["/avatar/13.png", "/avatar/14.png", "/avatar/15.png"]}
      />
    </>
  );
}

function Loader() {
  const progress = useProgress((state) => state.progress);
  if (progress !== 100) {
    return (
      <Html center wrapperClass="loader-div">
        {progress.toFixed()}% loaded
      </Html>
    );
  }

  return null;
}

export default function AvatarGallery() {
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Loader />
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal
            damping={4}
            pages={6}
            distance={1}
          >
            <Scroll>
              <Pages />
            </Scroll>
            <Scroll html>
              {/* <h1 style={{ position: "absolute", top: "20vh", left: "-75vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "25vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "125vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "225vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "325vw" }}></h1>

              <h1 style={{ position: "absolute", top: "20vh", left: "425vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "525vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "625vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "725vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "825vw" }}></h1> */}
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  );
}

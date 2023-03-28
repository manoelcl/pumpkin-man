import React, { useRef, useEffect, useState, useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  AdditiveBlending,
  AnimationMixer,
  Color,
  LoopRepeat,
  ShaderMaterial,
} from "three";
import { useFrame } from "@react-three/fiber";
import { castShadows } from "../../helpers";
import enemyColors from "../../resources/enemyColors.json";

export default function Ghost(props) {
  const group = useRef();
  const [model, set] = useState(null);

  const meshRef = useRef();

  // Provisional Shader at least working
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new Color(enemyColors[props.number] || "white") },
        },
        vertexShader: `
          uniform float time;
          
          varying vec3 vNormal;

          void main() {
            vec3 pos = position;
            vNormal = normal;
            pos += vNormal * sin(time * 10.0 + position.x * 10.0) * 0.05 * clamp(1.0 - position.y * 1.1, 0.0, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying vec3 vNormal;

          void main() {
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    []
  );

  const mixer = useRef();
  useEffect(() => {
    console.log("enter");

    if (!model) return new GLTFLoader().load("/models/ghost.glb", set);

    castShadows(model);
    console.log(enemyColors[props.number]);
    model.scene.traverse((node) => {
      if (node.isMesh && node.material.name === "baseMat") {
        node.material = material;
        //node.material.color = new Color(enemyColors[props.number] || "white");
        node.material.blending = AdditiveBlending;
        node.material.side = 0;
        console.log(node.material);
      }
    });

    console.log(model);

    if (mixer.current) return;
    mixer.current = new AnimationMixer(model.scene);

    if (model.animations.length) {
      console.log(model.animations);
      model.animations.forEach((animationClip) => {
        const animation = mixer.current.clipAction(animationClip);
        console.log("animation time", animation.time);
        animation.setLoop(LoopRepeat);

        animation.timeScale = 1;
        animation.play();
      });
    }
  }, [model]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
    material.uniforms.time.value = state.clock.elapsedTime;
  });

  if (model) {
    return <primitive object={model.scene} {...props} />;
  }
}

import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AdditiveBlending, AnimationMixer, Color, LoopRepeat } from "three";
import { useFrame } from "@react-three/fiber";
import { castShadows } from "../../helpers";
import enemyColors from "../../resources/enemyColors.json";

export default function Ghost(props) {
  const group = useRef();
  const [model, set] = useState(null);

  const mixer = useRef();
  useEffect(() => {
    console.log("enter");

    if (!model) return new GLTFLoader().load("/models/ghost.glb", set);

    castShadows(model);
    console.log(enemyColors[props.number]);
    model.scene.traverse((node) => {
      if (node.isMesh && node.material.name === "baseMat") {
        node.material.color = new Color(enemyColors[props.number] || "white");
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
  });

  if (model) {
    return <primitive object={model.scene} {...props} />;
  }
}

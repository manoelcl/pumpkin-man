import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, LoopRepeat } from "three";
import { useFrame } from "@react-three/fiber";

export default function Pumpkin(props) {
  const group = useRef();
  /* const { nodes, materials, animations } = useGLTF("/models/pumpkin_anim2.glb");
  const { actions } = useAnimations(animations, group); */
  const [model, set] = useState(null);

  const mixer = useRef();

  useEffect(() => {
    console.log("enter");
    if (!model) return new GLTFLoader().load("/models/pumpkin_anim2.glb", set);
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
    /* if (model.animations.length) {
      model.animations.forEach((animationClip) => {
        const animation = mixer.clipAction(animationClip);
        console.log(animation.time);
        animation.time = animation.getClip().duration - animation.time;
        animation.setLoop(LoopOnce);
        animation.clampWhenFinished = true;
        animation.timeScale = -1;
        animation.play();
      });
    } */
  }, [model]);

  /* const skeleton = nodes.pumpkin.skeleton; */

  /* useEffect(() => {
    console.log(model);
    if (model) {
        actions.Idle.play(); 
    }
  }, [model]); */

  useFrame(({ clock }, delta) => {
    mixer.current?.update(delta);
  });

  if (model) {
    return <primitive object={model.scene} {...props} />;
    {
      /* <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group castShadow receiveShadow name="PumpkinArmature">
            <primitive object={model.nodes.tongue} />
            <primitive object={model.nodes.body} />
            <skinnedMesh
              castShadow
              receiveShadow
              name="pumpkin"
              geometry={model.nodes.pumpkin.geometry}
              material={model.materials["Material.001"]}
              skeleton={model.nodes.pumpkin.skeleton}
            />
          </group>
        </group>
      </group> */
    }
  }
}

/* useGLTF.preload("/models/pumpkin_anim2.glb"); */

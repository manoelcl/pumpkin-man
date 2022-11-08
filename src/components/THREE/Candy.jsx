import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

const Candy = ({ position, controller }) => {
  const candy = useRef();

  useFrame((state, delta) => {
    candy.current.rotation.y += 0.01;
  });

  return (
    <mesh position={position} ref={candy} scale={0.15} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial
        metalness={1}
        roughness={0.5}
        color={new Color(`hsla(${Math.random() * 100},75%,75%)`)}
      />
    </mesh>
  );
};

export default Candy;

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import useKeys from "../hooks/useKeys";
import playerController from "../services/playerController";

const Player = ({ position, playerNumber = 0, level }) => {
  const player = useRef();
  const currentDirection = useRef(4);
  const selectedDirection = useKeys(playerNumber);
  let speed = 4;

  useFrame((state, delta) => {
    console.log(selectedDirection);
    playerController(
      player,
      selectedDirection,
      currentDirection,
      speed,

      level
    );
  });

  return (
    <mesh
      position={position}
      ref={player}
      scale={0.25}
      castShadow
      receiveShadow
    >
      <sphereGeometry />
      <meshStandardMaterial color={[0.51, 0.51, 0]} />
    </mesh>
  );
};

export default Player;

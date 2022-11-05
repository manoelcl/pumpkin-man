import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Material } from "three";
import useKeys from "../hooks/useKeys";
import manageEvents from "../services/manageEvents";
import playerController from "../services/playerController";
import Pumpkin from "./Pumpkin";

const Player = ({ position, playerNumber = 0, level }) => {
  const player = useRef();

  const currentDirection = useRef(4);
  const selectedDirection = useKeys(playerNumber);
  let speed = 4;
  useFrame((state, delta) => {
    playerController(player, selectedDirection, currentDirection, speed, level);
    manageEvents();
  });

  return (
    <group position={position} ref={player}>
      <Pumpkin />
    </group>
  );
};

export default Player;

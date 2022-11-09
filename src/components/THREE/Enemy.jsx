import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import useKeys from "../../hooks/useKeys";
import useRandomWalk from "../../hooks/useRandomWalk";
import manageEvents from "../../services/manageEvents";
import playerController from "../../services/playerController";
import Pumpkin from "./Pumpkin";

const Enemy = ({ position, enemyID = 0, level }) => {
  const player = useRef();
  const currentDirection = useRef(4);
  const selectedDirection = useRandomWalk();
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

export default Enemy;

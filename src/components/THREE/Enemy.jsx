import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import useKeys from "../../hooks/useKeys";
import useRandomWalk from "../../hooks/useRandomWalk";
import manageEvents from "../../services/manageEvents";
import playerController from "../../services/playerController";
import Ghost from "./Ghost";
import Pumpkin from "./Pumpkin";

const Enemy = ({ position, enemyID = 0, level, number }) => {
  const player = useRef();
  const currentDirection = useRef(4);
  const selectedDirection = useRef(1);
  useRandomWalk(selectedDirection);
  let speed = 4;

  useFrame((state, delta) => {
    playerController(
      player,
      selectedDirection,
      currentDirection,
      speed,
      level,
      false
    );
    manageEvents();
  });

  return (
    <group position={position} ref={player}>
      <Ghost number={number} />
    </group>
  );
};

export default Enemy;

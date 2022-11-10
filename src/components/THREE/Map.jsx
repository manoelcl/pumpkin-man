import { GameContext } from "../../context/GameContext";
import { useContext, useState } from "react";
import { findCoordinates } from "../../helpers";
import Candy from "./Candy";
import Player from "./Player";
import Enemy from "./Enemy";
const CELL_SIZE = 1;

const Map = ({ level = 1 }) => {
  const { levels, levelsInfo } = useContext(GameContext);
  const players = 0;
  const P1_Start = levelsInfo[level].players[0].coords;
  const P2_Start = levelsInfo[level].players[1].coords;
  const walls = levelsInfo[level].walls;
  const candies = levelsInfo[level].candies;

  const [interactableCells, setInteractableCells] = useState(levels[level]);

  return (
    <>
      {walls.map((cell) => (
        <mesh key={cell.id} position={cell.coords} castShadow receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color={[0.05, 0.1, 0.03]} />
        </mesh>
      ))}

      {candies.map((cell) => (
        <Candy key={cell.id} position={cell.coords} />
      ))}
      <Player position={P1_Start} level={levels[level]} />
      {players > 0 ? (
        <Player position={P2_Start} playerNumber={"1"} level={levels[level]} />
      ) : null}
      <Enemy position={P2_Start} level={levels[level]}></Enemy>
      <Enemy position={P2_Start} level={levels[level]}></Enemy>
      <Enemy position={P2_Start} level={levels[level]}></Enemy>
      <Enemy position={P2_Start} level={levels[level]}></Enemy>
    </>
  );
};

export default Map;

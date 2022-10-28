import { useState } from "react";
import { findCoordinates } from "../helpers/main";
import levels from "../resources/levels.json";
import Candy from "./Candy";
import Player from "./Player";

const CELL_SIZE = 1;

const Map = ({ level = 1 }) => {
  const P1_Start = findCoordinates(levels[level], 2);
  const P2_Start = findCoordinates(levels[level], 3);

  const [interactableCells, setInteractableCells] = useState(levels[level]);

  return (
    <>
      {interactableCells.map((cellRow, row) =>
        cellRow.map((cell, column) =>
          cell === 1 ? (
            <mesh
              key={`${column}${row}`}
              position={[
                CELL_SIZE * (-column + (cellRow.length - 1) * 0.5),
                -0.25,
                CELL_SIZE * (-row + (cellRow.length - 1) * 0.5),
              ]}
              castShadow
              receiveShadow
            >
              <boxGeometry />
              <meshStandardMaterial color={[0.1, 0.51, 0.1]} />
            </mesh>
          ) : null
        )
      )}
      {interactableCells.map((cellRow, row) =>
        cellRow.map((cell, column) =>
          cell === 0 ? (
            <Candy
              key={`${column}${row}`}
              position={[
                CELL_SIZE * (-column + (cellRow.length - 1) / 2),
                0.1,
                CELL_SIZE * (-row + (cellRow.length - 1) / 2),
              ]}
            ></Candy>
          ) : null
        )
      )}
      {
        <Player
          position={[
            CELL_SIZE * (-P1_Start[0] + (levels[level][0].length - 1) * 0.5),
            0.25,
            CELL_SIZE * (-P1_Start[1] + (levels[level].length - 1) * 0.5),
          ]}
          level={levels[level]}
        />
      }
    </>
  );
};

export default Map;

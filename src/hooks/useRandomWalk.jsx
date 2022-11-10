import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useState } from "react";
import { MathUtils } from "three";

export const useRandomWalk = (selectedDirection) => {
  const [direction, setDirection] = useState(0);
  const timeToNextUpdate = useRef(0);

  useFrame((state, delta) => {
    if (state.clock.getElapsedTime() > timeToNextUpdate.current) {
      timeToNextUpdate.current =
        state.clock.getElapsedTime() + MathUtils.randInt(1, 3);
      selectedDirection.current = MathUtils.randInt(0, 3);
      console.log(selectedDirection.current);
    }
  });
};

export default useRandomWalk;

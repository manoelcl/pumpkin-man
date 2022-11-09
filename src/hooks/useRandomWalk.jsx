import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useState } from "react";
import { MathUtils } from "three";

export const useRandomWalk = () => {
  const [direction, setDirection] = useState(0);
  const timeToNextUpdate = useRef(0);

  useFrame((state, delta) => {
    if (state.clock.getElapsedTime() > timeToNextUpdate.current) {
      timeToNextUpdate.current = state.clock.getElapsedTime() + 0.2;
      setDirection(MathUtils.randInt(0, 3));
    }
  });

  return direction;
};

export default useRandomWalk;

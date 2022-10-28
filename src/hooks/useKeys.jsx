import { useState, useEffect } from "react";
import controlsMap from "../resources/controlsMap.json";

function actionByKey(key, playerNumber = "0") {
  const keys = controlsMap[playerNumber];
  return keys[key];
}

export const useKeys = (playerNumber) => {
  const [direction, setDirection] = useState();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isNaN(actionByKey(e.code, playerNumber))) return;
      setDirection(actionByKey(e.code, playerNumber));
    };
    const handleKeyUp = (e) => {
      if (isNaN(actionByKey(e.code, playerNumber))) return;
      setDirection(undefined);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return direction;
};

export default useKeys;

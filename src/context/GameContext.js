import { setLevelsInfo } from "../helpers";
import levels from "../resources/levels.json";
const { createContext, useState } = require("react");

export const GameContext = createContext();

const GameStatusProvider = ({ children }) => {
  const levelsInfo = setLevelsInfo(levels);
  console.log(levelsInfo);
  const [level, setLevel] = useState(1);

  return (
    <GameContext.Provider value={{ level, setLevel, levelsInfo, levels }}>
      {children}
    </GameContext.Provider>
  );
};
export default GameStatusProvider;

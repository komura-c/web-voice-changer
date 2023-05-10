import { useState } from "react";
import "./@types/window.d";
import "./App.css";
import { Overlay } from "./components/Overlay";
import { scratchStartListen } from "./scripts/scratchStartListen";

function App() {
  const [isCalledStartListen, setIsCalledStartListen] = useState(false);

  const startListen = async () => {};

  const screenClick = () => {
    if (showOverlay) {
      setShowOverlay(false);
    }
    if (!isCalledStartListen) {
      setIsCalledStartListen(true);
      startListen();
    }
  };

  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <div onClick={screenClick}>
      <h1>Web Voice Changer</h1>
      {showOverlay && <Overlay />}
    </div>
  );
}

export default App;

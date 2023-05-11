import { useState } from "react";
import "./@types/window.d";
import "./App.css";
import { Overlay } from "./components/Overlay";
import * as Tone from "tone";

function App() {
  const [isCalledStartListen, setIsCalledStartListen] = useState(false);
  const [meterValue, setMeterValue] = useState(0);
  // const [pitchValue, setPitchValue] = useState(1);
  const pitchValue = 5;

  const startListen = () => {
    const meter = new Tone.Meter();
    const pitchShift = new Tone.PitchShift(pitchValue).toDestination();
    const mic = new Tone.UserMedia().connect(meter).connect(pitchShift);
    mic
      .open()
      .then(() => {
        // promise resolves when input is available
        console.log("mic open");
        // print the incoming mic levels in decibels
        setInterval(() => {
          if (meter.getValue() !== Infinity) {
            setMeterValue(
              500 - Math.floor(Math.abs(meter.getValue() as number) * 10)
            );
          }
        }, 100);
      })
      .catch((e) => {
        // promise is rejected when the user doesn't have or allow mic access
        console.log("mic not open: ", e);
      });
  };

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
      {showOverlay ? (
        <Overlay />
      ) : (
        <div>
          {/* <label htmlFor="inputSetPitch">ピッチ調整</label>
          <input
            id="inputSetPitch"
            type="number"
            value={pitchValue}
            onChange={(e) => setPitchValue(Number(e.target.value))}
          /> */}
          <div
            style={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Array(10)
              .fill(1)
              .map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: 10,
                    height: meterValue,
                    content: "",
                    backgroundColor: "white",
                    marginRight: 30,
                  }}
                ></div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import {
  ToneStateObj,
  toneInit,
  toneMeterGetValue,
  toneStartListen,
  toneStopListen,
  toneUpdatePitch,
} from "../lib/toneVoiceChanger";

export const ToneVoiceChangerComponent = () => {
  const [isInit, setIsInit] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [meterValue, setMeterValue] = useState(5);
  const [pitchValue, setPitchValue] = useState(1);

  const [toneState, setToneState] = useState<ToneStateObj>();

  const startListen = async () => {
    setIsListening(true);

    if (!isInit) {
      setIsInit(true);

      const toneStateObj = toneInit();
      if (toneStateObj) {
        setToneState(toneStateObj);
        await toneStartListen(toneStateObj.userMedia);
      }
    } else if (toneState) {
      await toneStartListen(toneState.userMedia);
    }
  };

  const updatePitch = () => {
    if (toneState) {
      toneUpdatePitch(toneState.pitchShift, pitchValue);
    }
  };

  const stopListen = () => {
    if (toneState) {
      toneStopListen(toneState.userMedia);

      setIsListening(false);
    }
  };

  setInterval(() => {
    if (toneState) {
      setMeterValue(
        500 - Math.floor(Math.abs(toneMeterGetValue(toneState.meter)) * 10)
      );
    }
  }, 100);

  return (
    <div>
      {!isListening ? (
        <button onClick={startListen}>スタート</button>
      ) : (
        <>
          <button onClick={stopListen}>ストップ</button>
          <div>
            <label htmlFor="inputSetPitch">ピッチ調整</label>
            <input
              id="inputSetPitch"
              type="number"
              value={pitchValue}
              onChange={(e) => {
                setPitchValue(Number(e.target.value));
                updatePitch();
              }}
            />
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
        </>
      )}
    </div>
  );
};

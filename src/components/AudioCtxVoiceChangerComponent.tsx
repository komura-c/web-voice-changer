import { useState } from "react";
import {
  AudioCtxStateObj,
  audioCtxStartListen,
} from "../lib/audioCtxVoiceChanger";

export const AudioCtxVoiceChangerComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioCtxState, setAudioCtxState] = useState<AudioCtxStateObj>();

  const startListen = async () => {
    const audioCtxObj = await audioCtxStartListen();
    if (audioCtxObj) {
      setAudioCtxState(audioCtxObj);
      setIsListening(true);
    } else {
      console.error("startListen error: audioCtxObj is not null or undefined");
    }
  };

  const stopListen = () => {
    if (audioCtxState) {
      setIsListening(false);
    } else {
      console.error("stopListen error: audioCtxState is not null or undefined");
    }
  };

  return (
    <div>
      {!isListening ? (
        <button onClick={startListen}>スタート</button>
      ) : (
        <button onClick={stopListen}>ストップ</button>
      )}
    </div>
  );
};

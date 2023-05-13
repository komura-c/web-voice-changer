import simplePitchShiftProcessor from "./simplePitchShiftProcessor?url";
import { createWorkletNode } from "./createWorkletNode";

export type AudioCtxStateObj = {
  audioCtx: AudioContext;
  simplePitchShiftNode: AudioWorkletNode;
  biquadFilterNode: BiquadFilterNode;
  stream: MediaStream;
};

export const audioCtxStartListen = async () => {
  const audioCtx = new (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext)();

  const simplePitchShiftNode = await createWorkletNode(
    audioCtx,
    "simple-pitch-shift-processor",
    simplePitchShiftProcessor
  );

  const biquadFilterNode = audioCtx.createBiquadFilter();
  biquadFilterNode.type = "lowpass";

  if (!navigator.mediaDevices) {
    throw new Error("getUserMedia is not implemented in this browser");
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const streamAudioSourceNode = audioCtx.createMediaStreamSource(stream);
    streamAudioSourceNode.connect(simplePitchShiftNode);
    simplePitchShiftNode.connect(biquadFilterNode);
    biquadFilterNode.connect(audioCtx.destination);

    return {
      audioCtx,
      simplePitchShiftNode,
      biquadFilterNode,
      stream,
    };
  } catch (error) {
    console.error("The following getUserMedia error occured: " + error);
    return null;
  }
};

export const audioCtxStopListen = (stream: MediaStream) => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  } else {
    console.error("audioCtxStopListen error: stream is not null or undefined");
  }
};

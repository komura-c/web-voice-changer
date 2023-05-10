import simplePitchShiftProcessor from "../processors/simplePitchShiftProcessor?url";
import { createWorkletNode } from "../processors/createWorkletNode";

// TODO: simplePitchShiftProcessorのアルゴリズムが不完全
export const scratchStartListen = async () => {
  // AudioContext
  const audioCtx = new (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext)();
  // AnalyserNode
  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 2048;

  const biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = "lowpass";

  const simplePitchShiftNode = await createWorkletNode(
    audioCtx,
    "simple-pitch-shift-processor",
    simplePitchShiftProcessor
  );

  if (!navigator.mediaDevices) {
    throw new Error("getUserMedia is not implemented in this browser");
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // MediaStreamAudioSourceNode
      const streamAudioSourceNode = audioCtx.createMediaStreamSource(stream);
      streamAudioSourceNode.connect(simplePitchShiftNode);
      simplePitchShiftNode.connect(biquadFilter);
      biquadFilter.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);
    })
    .catch((err) => {
      console.log("The following getUserMedia error occured: " + err);
    });
};

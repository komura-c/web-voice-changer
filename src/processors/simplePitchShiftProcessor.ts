// ref: kgullion/vite-typescript-audio-worklet-example/blob/main/src/audio-processor.ts
// ref: developer.mozilla.org/ja/docs/Web/API/AudioWorkletNode

class SimplePitchShiftProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0];
    const bufferSize = input.length;
    const pitch = 1.2;
    for (let channel = 0; channel < input.length; channel++) {
      for (let i = 0; i < output[channel].length; i++) {
        const offset = Math.round(i / pitch);
        if (offset < bufferSize) {
          output[channel][i] = input[channel][offset];
        } else {
          output[channel][i] = 0;
        }
      }
    }
    return true;
  }
}

registerProcessor("simple-pitch-shift-processor", SimplePitchShiftProcessor);

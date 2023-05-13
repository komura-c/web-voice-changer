// ref: kgullion/vite-typescript-audio-worklet-example/blob/main/src/audio-processor.ts
// ref: developer.mozilla.org/ja/docs/Web/API/AudioWorkletNode
// ref: Korilakkuma/XSound/blob/main/src/SoundModule/Effectors/AudioWorkletProcessors/PitchShifterProcessor.ts

// TODO: アルゴリズムが不完全のため機械音が出力されているため、FFT、IFFTで実装する
class SimplePitchShiftProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0];
    const bufferSize = input.length;
    const pitch = 5;
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

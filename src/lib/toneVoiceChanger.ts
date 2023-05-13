import * as Tone from "tone";

export type ToneStateObj = {
  meter: Tone.Meter;
  pitchShift: Tone.PitchShift;
  userMedia: Tone.UserMedia;
};

export const toneInit = () => {
  const meter = new Tone.Meter();
  const pitchShift = new Tone.PitchShift().toDestination();
  const userMedia = new Tone.UserMedia().connect(meter).connect(pitchShift);
  return {
    meter,
    pitchShift,
    userMedia,
  } as const;
};

export const toneStartListen = async (userMedia: ToneStateObj["userMedia"]) => {
  try {
    await userMedia.open();
    // promise resolves when input is available
    console.log("mic open");
  } catch (error) {
    // promise is rejected when the user doesn't have or allow mic access
    console.error("mic not open: ", error);
  }
};

export const toneUpdatePitch = (
  pitchShift: Tone.PitchShift,
  pitchValue: number
) => {
  if (pitchShift) {
    pitchShift.pitch = pitchValue;
  } else {
    console.error("toneUpdatePitch error: pitchShift is not null or undefined");
  }
};

export const toneStopListen = (userMedia: ToneStateObj["userMedia"]) => {
  if (userMedia) {
    userMedia.close();
    console.log("mic close");
  } else {
    console.error("toneStopListen error: userMedia is not null or undefined");
  }
};

export const toneMeterGetValue = (meter: ToneStateObj["meter"]) => {
  const meterValue = meter.getValue();
  if (meter && meterValue !== -Infinity) {
    if (typeof meterValue === "number") {
      return meterValue;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export async function createWorkletNode(
  context: BaseAudioContext,
  name: string,
  url: string
) {
  try {
    return new AudioWorkletNode(context, name);
  } catch (err) {
    await context.audioWorklet.addModule(url);
    return new AudioWorkletNode(context, name);
  }
}

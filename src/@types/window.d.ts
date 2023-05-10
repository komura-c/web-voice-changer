export {};
declare global {
  interface Window {
    webkitAudioContext: typeof window.AudioContext;
    mozAudioContext: typeof window.AudioContext;
  }
}

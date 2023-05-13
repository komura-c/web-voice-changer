import "./App.css";
import { ToneVoiceChangerComponent } from "./components/ToneVoiceChangerComponent";
// import { AudioCtxVoiceChangerComponent } from "./components/audioCtxVoiceChangerComponent";

function App() {
  return (
    <div>
      <h1>Web Voice Changer</h1>
      <ToneVoiceChangerComponent />
      {/* <AudioCtxVoiceChangerComponent /> */}
    </div>
  );
}

export default App;

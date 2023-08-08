import { useRef, useState } from "react";
import playIcon from "./assets/play.svg";
import pauseIcon from "./assets/pause.svg";
import skipPreviousIcon from "./assets/player-skip-back-filled.svg";
import skipForwardIcon from "./assets/player-skip-forward-filled.svg";
import nextIcon from "./assets/player-track-next-filled.svg";
import prevIcon from "./assets/player-track-prev-filled.svg";
import audioFile from "./assets/audio.mp3";
import quranFile from "./assets/quran.mp3";
import "./App.css";

function App() {
  const audioRef = useRef();

  const [playStatus, setPlayStatus] = useState("paused");
  const [nextStatus, setNextStatus] = useState(0);
  const [prevStatus, setPrevStatus] = useState(0); // Change prevStatus to track index

  const audioFiles = [audioFile, quranFile]; // List of audio files

  const handlePlayStatus = () => {
    if (playStatus === "paused") {
      audioRef.current.play();
      setPlayStatus("playing");
    } else {
      audioRef.current.pause();
      setPlayStatus("paused");
    }
  }

  const handleSkipBackwardStatus = () => {
    const currentTime = audioRef.current.currentTime;
    const newTime = currentTime - 10; // Skip backward by 10 seconds 
    audioRef.current.currentTime = newTime;
  }

  const handleSkipForwardStatus = () => {
    const currentTime = audioRef.current.currentTime;
    const newTime = currentTime + 10; // Skip forward by 10 seconds 
    audioRef.current.currentTime = newTime;
  }

  const handleNextStatus = () => {
    const nextAudio = (nextStatus + 1) % audioFiles.length;
    setNextStatus(nextAudio);
    setPrevStatus(nextStatus); // Update prevStatus
    audioRef.current.src = audioFiles[nextAudio];
    audioRef.current.play();
    setPlayStatus("playing");
  }

  const handlePrevStatus = () => {
    const prevAudio = (prevStatus - 1 + audioFiles.length) % audioFiles.length;
    setNextStatus(prevStatus); // Update nextStatus
    setPrevStatus(prevAudio);
    audioRef.current.src = audioFiles[prevAudio];
    audioRef.current.play();
    setPlayStatus("playing");
  }

  return (
    <div className="card">
      <h1>Audio Player App</h1>
      <div>
        <div className="audio-player">
          <button onClick={handlePrevStatus}>
            <img src={prevIcon} alt={"prevIcon"} />
          </button>
          <button onClick={handleSkipBackwardStatus}>
            <img src={skipPreviousIcon} alt={"previous"} />
          </button>
          <button onClick={handlePlayStatus}>
            <img
              src={playStatus === "playing" ? pauseIcon : playIcon}
              alt={"Play"}
            />
          </button>
          <button onClick={handleSkipForwardStatus}>
            <img src={skipForwardIcon} alt={"skipForwardIcon"} />
          </button>
          <audio id="audio" ref={audioRef}>
            <source src={audioFiles[nextStatus]} />
          </audio>
          <button onClick={handleNextStatus}>
            <img src={nextIcon} alt={"nextIcon"} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;

import { useRef, useState, useEffect } from "react";
import playIcon from "./assets/play.svg";
import pauseIcon from "./assets/pause.svg";
import skipPreviousIcon from "./assets/player-skip-back-filled.svg";
import skipForwardIcon from "./assets/player-skip-forward-filled.svg";
import nextIcon from "./assets/player-track-next-filled.svg";
import prevIcon from "./assets/player-track-prev-filled.svg";
import volumeIcon from "./assets/volume.svg";
import audioFile from "./assets/audio.mp3";
import quranFile from "./assets/quran.mp3";
import "./App.css";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function App() {
  const audioRef = useRef();

  const currentYear = new Date().getFullYear();
  const [playStatus, setPlayStatus] = useState("paused");
  const [nextStatus, setNextStatus] = useState(0);
  const [prevStatus, setPrevStatus] = useState(0);
  const [timeProgress, setTimeProgress] = useState("0:00"); // Initialize with a default time
  const [duration, setDuration] = useState("0:00"); // Initialize with a default time
  const [volume, setVolume] = useState(60);

  const audioFiles = [audioFile, quranFile];
  const progressBarRef = useRef();

  function handlePlayStatus() {
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
    setPrevStatus(nextStatus);
    audioRef.current.src = audioFiles[nextAudio];
    audioRef.current.play();
    setPlayStatus("playing");
  }

  const handlePrevStatus = () => {
    const prevAudio = (prevStatus - 1 + audioFiles.length) % audioFiles.length;
    setNextStatus(prevStatus);
    setPrevStatus(prevAudio);
    audioRef.current.src = audioFiles[prevAudio];
    audioRef.current.play();
    setPlayStatus("playing");
  }

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const totalDuration = audioRef.current.duration;
  
    const progress = (currentTime / totalDuration) * 100; // Calculate progress percentage
    progressBarRef.current.style.setProperty('--range-progress', `${progress}%`); // Set the --range-progress variable
    setTimeProgress(formatTime(currentTime));
    setDuration(formatTime(totalDuration));
  };
  

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(e.target.value);
  };

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

          <div className="volume-wrapper">
            <div className="progress">
              <span className="time current">{timeProgress}</span>
              <input 
                type="range" 
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleTimeUpdate}
              />
              <span className="time">{duration}</span>
            </div>

            <div className="controls-wrapper">
              <div className="controls">{/* ... */}</div>
              <div className="volume">
                <button>
                  <img src={volumeIcon} alt={"volume Icon"} />
                </button>
                <input 
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div> 
      </div>
      <footer>
        <p> &copy; Develop By Musa Joof {currentYear}, All Right Reserved. </p>
      </footer>
    </div>
  )
}

export default App;

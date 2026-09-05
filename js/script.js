// DOM SELECTORS

const video = document.querySelector(".video-player");
const videoInput = document.querySelector(".video-input");

const playBtn = document.querySelector(".play-btn");
const previousBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");

const skipBackwardBtn = document.querySelector(".skip-backward-btn");

const skipForwardBtn = document.querySelector(".skip-forward-btn");

const muteBtn = document.querySelector(".mute-btn");

const volumeControl = document.querySelector(".volume-control");

const speedControl = document.querySelector(".speed-control");

const loopBtn = document.querySelector(".loop-btn");

const pipBtn = document.querySelector(".pip-btn");

const fullscreenBtn = document.querySelector(".fullscreen-btn");

const progressBar = document.querySelector(".progress-bar");

const currentTimeElement = document.querySelector(".current-time");

const durationElement = document.querySelector(".duration");

const videoTitle = document.querySelector(".video-title");

const playlist = document.querySelector(".playlist");

const emptyPlaylist = document.querySelector(".empty-playlist");

const playlistCount = document.querySelector(".playlist-count");

// Editor controls

const brightnessControl = document.querySelector(".brightness-control");

const contrastControl = document.querySelector(".contrast-control");

const saturationControl = document.querySelector(".saturation-control");

const trimStart = document.querySelector(".trim-start");

const trimEnd = document.querySelector(".trim-end");

const applyTrimBtn = document.querySelector(".apply-trim-btn");

// Application State

let videos = [];
let currentVideoIndex = -1;
let trimRange = {
  start: 0,
  end: 0,
};

// Utility Functions

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

const updatePlayButton = () => {
  playBtn.textContent = video.paused ? "▶" : "⏸";
};

const updateProgress = () => {
  if (!video.duration) {
    return;
  }

  const percentage = (video.currentTime / video.duration) * 100;

  progressBar.value = percentage;

  currentTimeElement.textContent = formatTime(video.currentTime);
};

const updateDuration = () => {
  durationElement.textContent = formatTime(video.duration);

  trimEnd.value = Math.floor(video.duration);

  trimRange.end = video.duration;
};

// Video Playback Controls

const togglePlay = () => {
  if (!video.src) {
    return;
  }

  video.paused ? video.play() : video.pause();
};

const skip = (seconds) => {
  if (!video.src) {
    return;
  }

  video.currentTime += seconds;
};

const playPrevious = () => {
  if (videos.length === 0) {
    return;
  }

  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;

  loadVideo(currentVideoIndex);
};

const playNext = () => {
  if (videos.length === 0) {
    return;
  }

  currentVideoIndex = (currentVideoIndex + 1) % videos.length;

  loadVideo(currentVideoIndex);
};

// Load Video

const loadVideo = (index) => {
  const selectedVideo = videos[index];

  if (!selectedVideo) {
    return;
  }

  currentVideoIndex = index;

  video.src = selectedVideo.url;

  videoTitle.textContent = selectedVideo.name;

  video.load();

  renderPlaylist();
};

// Playlist

const createVideoObject = (file) => ({
  name: file.name,

  url: URL.createObjectURL(file),

  file,
});

const addVideos = (files) => {
  const newVideos = [...files]
    .filter((file) => file.type.startsWith("video/"))
    .map(createVideoObject);

  videos.push(...newVideos);

  if (currentVideoIndex === -1 && videos.length) {
    loadVideo(0);
  }

  renderPlaylist();
};

const renderPlaylist = () => {
  playlist.innerHTML = "";

  emptyPlaylist.hidden = videos.length > 0;

  playlistCount.textContent = `${videos.length} video${videos.length !== 1 ? "s" : ""}`;

  videos.forEach((item, index) => {
    const listItem = document.createElement("li");

    listItem.className = "playlist-item";

    if (index === currentVideoIndex) {
      listItem.classList.add("active");
    }

    listItem.textContent = item.name;

    listItem.addEventListener("click", () => loadVideo(index));

    playlist.appendChild(listItem);
  });
};

// Volume and Mute functionality

const updateVolume = () => {
  video.volume = Number(volumeControl.value);

  video.muted = video.volume === 0;

  updateMuteIcon();
};

const toggleMute = () => {
  video.muted = !video.muted;

  updateMuteIcon();
};

const updateMuteIcon = () => {
  if (video.muted || video.volume === 0) {
    muteBtn.textContent = "🔇";
  } else if (video.volume < 0.5) {
    muteBtn.textContent = "🔉";
  } else {
    muteBtn.textContent = "🔊";
  }
};

// Playback Speed functionality

const updatePlaybackSpeed = () => {
  video.playbackRate = Number(speedControl.value);
};

// Loop functionality

const toggleLoop = () => {
  video.loop = !video.loop;

  loopBtn.textContent = video.loop ? "🔂" : "🔁";
};

// Progress Bar / Seeking functionality

const seekVideo = (event) => {
  if (!video.duration) {
    return;
  }

  const percentage = Number(event.target.value);

  video.currentTime = (percentage / 100) * video.duration;
};

// Picture-in-Picture functionality

const togglePictureInPicture = async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();

      return;
    }

    if (document.pictureInPictureEnabled && video.readyState >= 2) {
      await video.requestPictureInPicture();
    }
  } catch (error) {
    console.error("Picture-in-Picture error:", error);
  }
};

// Fullscreen functionality

const toggleFullscreen = async () => {
  const playerContainer = document.querySelector(".video-wrapper");

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await playerContainer.requestFullscreen();
    }
  } catch (error) {
    console.error("Fullscreen error:", error);
  }
};

// Video Filters / Editor

const updateVideoFilters = () => {
  const brightness = brightnessControl.value;

  const contrast = contrastControl.value;

  const saturation = saturationControl.value;

  video.style.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
    `;

  saveEditorSettings();
};

// Trimming functionality

const updateTrimRange = () => {
  let start = Number(trimStart.value);

  let end = Number(trimEnd.value);

  if (start < 0) {
    start = 0;
  }

  if (end > video.duration) {
    end = video.duration;
  }

  if (start >= end) {
    start = 0;
  }

  trimRange = {
    start,
    end,
  };
};

const applyTrim = () => {
  updateTrimRange();

  video.currentTime = trimRange.start;

  video.play();

  video.addEventListener("timeupdate", handleTrimPlayback);
};

const handleTrimPlayback = () => {
  if (trimRange.end && video.currentTime >= trimRange.end) {
    video.pause();

    video.removeEventListener("timeupdate", handleTrimPlayback);
  }
};

// Local Storage for Editor Settings

const saveEditorSettings = () => {
  const settings = {
    brightness: brightnessControl.value,

    contrast: contrastControl.value,

    saturation: saturationControl.value,

    volume: volumeControl.value,

    speed: speedControl.value,
  };

  localStorage.setItem("videoPlayerSettings", JSON.stringify(settings));
};

const loadEditorSettings = () => {
  const savedSettings = localStorage.getItem("videoPlayerSettings");

  if (!savedSettings) {
    return;
  }

  const settings = JSON.parse(savedSettings);

  brightnessControl.value = settings.brightness ?? 100;

  contrastControl.value = settings.contrast ?? 100;

  saturationControl.value = settings.saturation ?? 100;

  volumeControl.value = settings.volume ?? 1;

  speedControl.value = settings.speed ?? 1;

  video.volume = Number(volumeControl.value);

  video.playbackRate = Number(speedControl.value);

  updateVideoFilters();
};

// Keyboard Shortcuts

const handleKeyboard = (event) => {
  // Don't trigger shortcuts while typing
  if (event.target.matches("input, textarea, select")) {
    return;
  }

  switch (event.key.toLowerCase()) {
    case " ":
      event.preventDefault();
      togglePlay();
      break;

    case "arrowleft":
      skip(-5);
      break;

    case "arrowright":
      skip(5);
      break;

    case "m":
      toggleMute();
      break;

    case "f":
      toggleFullscreen();
      break;

    case "p":
      togglePictureInPicture();
      break;
  }
};

// Event Listeners

playBtn.addEventListener("click", togglePlay);

previousBtn.addEventListener("click", playPrevious);

nextBtn.addEventListener("click", playNext);

skipBackwardBtn.addEventListener("click", () => skip(-10));

skipForwardBtn.addEventListener("click", () => skip(10));

muteBtn.addEventListener("click", toggleMute);

volumeControl.addEventListener("input", updateVolume);

speedControl.addEventListener("change", updatePlaybackSpeed);

loopBtn.addEventListener("click", toggleLoop);

pipBtn.addEventListener("click", togglePictureInPicture);

fullscreenBtn.addEventListener("click", toggleFullscreen);

progressBar.addEventListener("input", seekVideo);

videoInput.addEventListener("change", (event) => addVideos(event.target.files));

// Video events

video.addEventListener("play", updatePlayButton);

video.addEventListener("pause", updatePlayButton);

video.addEventListener("timeupdate", updateProgress);

video.addEventListener("loadedmetadata", updateDuration);

video.addEventListener("ended", () => {
  if (!video.loop) {
    playNext();
  }
});

// Editor events

[brightnessControl, contrastControl, saturationControl].forEach((control) => {
  control.addEventListener("input", updateVideoFilters);
});

applyTrimBtn.addEventListener("click", applyTrim);

window.addEventListener("keydown", handleKeyboard);

// Initialization

loadEditorSettings();

updateMuteIcon();

updatePlayButton();

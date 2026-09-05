# 🎬 JavaScript Video Media Player & Editor

A modern, responsive **Video Media Player & Editor** built with HTML5, CSS3, and vanilla JavaScript ES6+.

The project uses native browser APIs to provide media playback controls, playlist management, local video loading, basic playback-based editing, and persistent user settings without requiring a backend.

## 📸 Screenshot

![Video Media Player Preview](https://github.com/user-attachments/assets/5658cb54-bf34-4e0a-b60d-28d7546e2c5d)

## 🚀 Live Demo

https://github.com/user-attachments/assets/164d916e-aac1-4d8c-8cb5-1a5a164c3944

## ✨ Features

### 🎥 Media Player

- Play / Pause
- Previous / Next video
- Skip forward 10 seconds
- Skip backward 10 seconds
- Interactive progress bar
- Current time and duration
- Volume control
- Mute / Unmute
- Playback speed control
- Video looping
- Fullscreen mode
- Picture-in-Picture mode

### 📂 Local Video Support

Users can select one or multiple video files directly from their device.

The project uses:

```javascript
URL.createObjectURL(file);
```

to generate temporary URLs for local playback.

No video upload server is required.

### 🎞️ Playlist

- Multiple video support
- Dynamic playlist generation
- Active video indication
- Previous / Next navigation
- Video count
- Dynamic playlist updates

### ✂️ Video Editing

The editor provides playback-based controls for:

- Start time
- End time
- Brightness
- Contrast
- Saturation

> Note: The trimming feature controls playback between selected timestamps. It does not permanently export a modified video file.

### 💾 Persistent Settings

User preferences are stored using `localStorage`.

Saved settings include:

- Volume
- Playback speed
- Brightness
- Contrast
- Saturation

### ⌨️ Keyboard Shortcuts

| Key     | Action             |
| ------- | ------------------ |
| `Space` | Play / Pause       |
| `←`     | Skip backward      |
| `→`     | Skip forward       |
| `M`     | Mute / Unmute      |
| `F`     | Fullscreen         |
| `P`     | Picture-in-Picture |

## 🛠️ Technologies

### HTML5

- Semantic HTML
- HTML5 Video
- File input
- Range inputs
- Select controls

### CSS3

- CSS Variables
- Flexbox
- CSS Grid
- Responsive Design
- Media Queries
- CSS Filters
- Transitions

### JavaScript ES6+

- `const` / `let`
- Arrow functions
- Template literals
- Spread syntax
- Object literals
- Array methods
- DOM manipulation
- Event listeners
- Async/Await
- Try/Catch
- LocalStorage
- File API
- HTMLMediaElement API
- Fullscreen API
- Picture-in-Picture API

## 📁 Project Structure

```text
video-media-player/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   └── screenshots/
│
└── README.md
```

## ⚙️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/tariqulislam10/video-media-player.git
```

### 2. Open the project

```bash
cd video-media-player
```

### 3. Run with a local development server

You can use VS Code Live Server or another local development server.

For example:

```text
Right Click → Open with Live Server
```

### 4. Select a video

Click:

```text
📂 Open Video
```

and choose one or more video files from your device.

## 🧩 Challenges & Solutions

### Synchronizing Controls

The custom UI needed to remain synchronized with the video.

**Solution:** Used media events such as:

```javascript
timeupdate;
play;
pause;
loadedmetadata;
ended;
```

### Local Video Loading

The application needed to play videos directly from the user's device.

**Solution:** Used the File API and:

```javascript
URL.createObjectURL(file);
```

### Playlist Management

Multiple videos required state management and dynamic DOM rendering.

**Solution:** Maintained a `videos` array and `currentVideoIndex`, then dynamically generated playlist items.

### Persistent Settings

Settings were lost after refreshing the page.

**Solution:** Stored editor and playback settings using `localStorage`.

### Video Trimming

Browser-based playback control is different from permanently editing an MP4 file.

**Solution:** Implemented playback-based trimming and planned actual video exporting as a future enhancement.

## 🔮 Future Improvements

- [ ] Real video export
- [ ] FFmpeg/WebAssembly integration
- [ ] Video thumbnails
- [ ] Drag & drop video upload
- [ ] Drag & drop playlist ordering
- [ ] Subtitle support
- [ ] Audio track selection
- [ ] Multiple video formats
- [ ] Keyboard shortcut customization
- [ ] Video metadata display
- [ ] Download edited video
- [ ] IndexedDB for larger media libraries
- [ ] Dark/Light theme
- [ ] Waveform-based timeline
- [ ] Undo/Redo editing system

## 📌 Important Note

This project is primarily designed for **learning and demonstrating JavaScript, DOM manipulation, HTML5 Media APIs, and browser capabilities**.

The current trimming feature does not modify or export the original video file. Actual video processing/export can be implemented using technologies such as **FFmpeg/WebAssembly** in a future version.

## 👨‍💻 Author

**Tariqul Islam**

GitHub: `tariqulislam10`

LinkedIn: `tariqulislam10`

## ⭐ Support

If you found this project useful or educational, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ using HTML5, CSS3 & JavaScript ES6+**

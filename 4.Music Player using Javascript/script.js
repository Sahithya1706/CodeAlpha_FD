const audio = new Audio();
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitleEl = document.querySelector('.song-title');
const artistEl = document.querySelector('.artist');
const albumArtEl = document.querySelector('.album-art');
const volumeEl = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

// Playlist with the requested songs (placeholders for audio and album art)
const playlist = [
    {
        title: "Sun Mere Humsafar",
        artist: "Anu Malik, Alka Yagnik",
        src: "./audio/sun_mere_humsafar.mp3", // Replace with your own legally obtained audio file
        albumArt: "https://tse3.mm.bing.net/th/id/OIP.9nDO8k1IRE_ql6AMpyYmpwHaJQ?pid=ImgDet&w=197&h=246&c=7&dpr=1.3&o=7&rm=3" // Replace with your own legally obtained album art
    },
    {
        title: "All Is Well",
        artist: "Sonu Nigam, Shaan, Swanand Kirkire",
        src: "./audio/all_is_well.mp3", // Replace with your own legally obtained audio file
        albumArt: "https://th.bing.com/th/id/OIP.0gX2nbKm9zl921Tl9bBi7wHaEK?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" // Replace with your own legally obtained album art
    },
    {
        title: "Give Me Some Sunshine",
        artist: "Suraj Jagan, Sharman Joshi",
        src: "./audio/give_me_some_sunshine.mp3", // Replace with your own legally obtained audio file
        albumArt: "https://th.bing.com/th/id/OIP.d_jrz-saDYVGwV1LIARingHaEK?w=283&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" // Replace with your own legally obtained album art
    }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songTitleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    albumArtEl.src = song.albumArt;
    updatePlaylistUI();
}

function updatePlaylistUI() {
    playlistEl.innerHTML = '';
    playlist.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
        item.textContent = `${song.title} - ${song.artist}`;
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlistEl.appendChild(item);
    });
}

function playSong() {
    isPlaying = true;
    playPauseBtn.textContent = '❚❚';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playPauseBtn.textContent = '▶';
    audio.pause();
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong); // Autoplay next song

volumeEl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Load first song
loadSong(currentSongIndex);
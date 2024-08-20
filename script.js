document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('playPause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeControl = document.getElementById('volume');
    const progressControl = document.getElementById('progress');
    const playlist = document.getElementById('playlist');
    const albumArt = document.getElementById('albumArt');
    
    const songs = [
        { title: 'Song 1', src: 'song1.mp3', art: 'album1.jpg' },
        { title: 'Song 2', src: 'song2.mp3', art: 'album2.jpg' },
        { title: 'Song 3', src: 'song3.mp3', art: 'album3.jpg' },
        { title: 'Song 4', src: 'song4.mp3', art: 'album4.jpg' },
        { title: 'Song 5', src: 'song5.mp3', art: 'album5.jpg' }
    ];
    
    let currentIndex = 0;

    function loadSong(index) {
        audio.src = songs[index].src;
        albumArt.src = `album/${songs[index].art}`;
        audio.play();
        playPauseButton.textContent = 'Pause';
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    }

    function prevSong() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : songs.length - 1;
        loadSong(currentIndex);
    }

    function nextSong() {
        currentIndex = (currentIndex < songs.length - 1) ? currentIndex + 1 : 0;
        loadSong(currentIndex);
    }

    function updateProgress() {
        progressControl.value = (audio.currentTime / audio.duration) * 100;
    }

    function setProgress() {
        audio.currentTime = (progressControl.value / 100) * audio.duration;
    }

    function setVolume() {
        audio.volume = volumeControl.value;
    }

    function loadPlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.addEventListener('click', () => {
                currentIndex = index;
                loadSong(currentIndex);
            });
            playlist.appendChild(li);
        });
    }

    playPauseButton.addEventListener('click', playPause);
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    volumeControl.addEventListener('input', setVolume);
    progressControl.addEventListener('input', setProgress);
    audio.addEventListener('timeupdate', updateProgress);

    loadSong(currentIndex);
    loadPlaylist();
});

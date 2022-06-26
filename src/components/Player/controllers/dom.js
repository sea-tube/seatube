const updateVideoDOM = () => {

   const player = document.getElementById("seaPlayer");;
   const video = document.getElementById("video");
   const rangeVideo = document.getElementById('range-video');
   const loadingProgress = document.getElementById("loadingProgress");
   const buttonFullScreen = document.querySelector('button#full-screen');
   const buttonPause = document.getElementById("pause-button");
   const buttonPlay = document.getElementById("play-button");
   const buttonSound = document.getElementById("button-sound");
   const buttonMute = document.getElementById("button-mute");
   const thumbnail = document.getElementById("thumbnail");
   const videoTimeStatus = document.getElementById("video-time-status");
   const bufferingProgress = document.getElementById("bufferingProgress");
   const loadedTitle = document.getElementById("loaded-title");
   const videoLoading = document.getElementById("video-loading");
   const timeCurrent = document.getElementById("time-current");
   const videoPlay = document.getElementById("video-play");
   const gradient = document.getElementById("video-gradient");

   let rVideoPressing = false;

   buttonFullScreen.addEventListener('click', function () {
      player.classList.toggle("fullScreen")
   })

   function setupControl() {
      // select the video element from page
      if (video.canPlayType) {
         // remove the default buttons
         video.removeAttribute("controls");
         // add event-handlers to control the video element
         video.addEventListener("click", playback, false);
         video.addEventListener("timeupdate", reportProgress, false);
         video.addEventListener("progress", reportBuffer, false);
         video.addEventListener("waiting", reportWaiting, false);
         video.addEventListener("playing", reportPlaying, false);
         video.addEventListener("pause", reportPause, false);
         video.addEventListener("canplay", reportCanPlay, false);
         video.addEventListener("ended", endPlayback, false);
         // enable and disable the controls buttons to reflect the player state
         video.addEventListener("play", function () {
            buttonPlay.classList = "pause";
         }, false);
         video.addEventListener("pause", function () {
            buttonPlay.classList = "play";
         }, false);
         // add event-handlers for the control buttons
         video.addEventListener("click", playback, false);
         video.addEventListener('durationchange', reportDurationChange, false);
         gradient.addEventListener("click", playback, false);
         videoPlay.addEventListener("click", playback, false);
         buttonPlay.addEventListener("click", playVideo, false);
         buttonPause.addEventListener("click", pauseVideo, false);
         buttonSound.addEventListener("click", toggleMute, false);
         buttonMute.addEventListener("click", toggleMute, false);
      }
   }

   setupControl();

   //define the event-handlers
   function playback() {
      if (video.paused) {
         playVideo()
      } else {
         pauseVideo()
      }
   }
   function playVideo() {
      video.play()
      videoPlay.classList.add("started")
      buttonPlay.style.display = "none"
      buttonPause.style.display = "block"

      player.classList.add("playing")

   }
   function pauseVideo() {
      video.pause()
      buttonPause.style.display = "none"
      buttonPlay.style.display = "block"

      player.classList.remove("playing")
   }
   //if stop button is pushed, the media play stops and the current play time is reset to 0
   function stopPlayback() {
      video.pause();
      video.currentTime = 0;
      endPlayback();
   }
   function changeVolume(volume) {
      if (video.muted && volume > 0) toggleMute()
      if (!video.muted && volume == 0) toggleMute()
      video.volume = volume / 100;
   }

   function toggleMute() {
      if (video.muted) {
         video.muted = false;
         buttonMute.style.display = "none"
         buttonSound.style.display = "block"
      } else {
         video.muted = true;
         buttonSound.style.display = "none"
         buttonMute.style.display = "block"
      }
   }
   // when the media play is finished or stopped
   function endPlayback() {
      player.classList.remove("playing")
   }

   function reportDurationChange() {
      videoTimeStatus.innerHTML = `<span class="current">${timeFormat(this.currentTime)}</span> / <span class="end">${timeFormat(this.duration)}</span>`
   }

   // update the progress bar
   function reportProgress() {

      var position = 100 / (this.duration / this.currentTime);
      if (isNaN(position)) return;

      if (Math.round(this.buffered.end(0)) == Math.round(this.seekable.end(0))) {
         bufferingProgress.style.width = "100%";
      }

      loadingProgress.style.width = position + '%';
      videoTimeStatus.innerHTML = `<span class="current">${timeFormat(this.currentTime)}</span> / <span class="end">${timeFormat(this.duration)}</span>`

      if (rVideoPressing === false) rangeVideo.value = position

   }

   function reportBuffer(e) {
      if (isNaN(video.duration)) return;
      if (video.buffered.length == 0) return;
      var videoBuffered = 100 / (video.duration / video.buffered.end(0))
      bufferingProgress.style.width = videoBuffered + '%'
      loadedTitle.innerText = videoBuffered.toFixed(1) + '%'
   }

   function reportWaiting(e) {
      videoLoading.style.display = "block"
   }
   function reportPlaying(e) {
      console.log("Playing")
   }
   function reportPause(e) {
      console.log("Pausing")
   }
   function reportCanPlay(e) {
      videoLoading.style.display = "none"
   }
   function timeFormat(seconds) {
      var h = seconds / (60 * 60)
      var m = (h - parseInt(h)) * 60
      var s = ((m - parseInt(m)) * 60).toFixed(0)
      if (m <= 9) m = '0' + parseInt(m)
      if (s <= 9) s = '0' + s
      if (parseInt(h)) return (parseInt(h) + ':' + m + ':' + s)
      return (parseInt(m) + ':' + s)
   }

   /* Thumbnail bar */
   rangeVideo.addEventListener('mousemove', e => {
      const rangeWidth = rangeVideo.getBoundingClientRect().width
      const thumbWidth = thumbnail.getBoundingClientRect().width

      // Set position
      let positionLeft = e.clientX - rangeVideo.getBoundingClientRect().left - (thumbnail.getBoundingClientRect().width / 2)
      const positionRight = positionLeft + thumbWidth
      if (positionLeft < 0) positionLeft = 0
      if (positionRight > rangeWidth) positionLeft = rangeWidth - thumbWidth
      thumbnail.style.left = positionLeft + "px"

      // Determine time and set thumb
      const percentage = 100 / (rangeWidth / (e.clientX - rangeVideo.getBoundingClientRect().left))
      const time = parseInt(video.duration * (percentage / 100))
      timeCurrent.innerText = timeFormat(time)
      thumb(time)

   })
}

// Set thumb
function thumb(time) {
   const thumb_interval = 5
   const row_size = 10
   const width = 188, height = 80
   time = parseInt(time / thumb_interval)
   const frameY = parseInt(time / row_size)
   const frameX = time - row_size * frameY
   const frameTop = frameY * height
   const frameLeft = frameX * width
   const position = -(frameLeft) + 'px ' + -(frameTop) + 'px'
   thumbnail.style.backgroundPosition = position
}

export default function PlayerDOM () {
   if (document.readyState !== 'loading') {
      updateVideoDOM()
   } else {
      document.addEventListener("DOMContentLoaded", updateVideoDOM, false);
   }
}
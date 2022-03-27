let rVideoPressing = false
let thumbnail = document.getElementById("thumbnail")

document.querySelector('.rangeVideo').addEventListener('change', function () {
   const val = this.value
   const current = myVideo.duration * (val / 100)
   if (!isNaN(myVideo.duration)) {
      myVideo.currentTime = current
      document.querySelector(".video-time-status .current").innerText = timeFormat(current)
      document.getElementById("loadingProgress").style.width = val + '%'
   }
})

document.querySelector('.rangeVideo').addEventListener('mousedown', function () {
   rVideoPressing = true
})
document.querySelector('.rangeVideo').addEventListener('mouseup', function () {
   rVideoPressing = false
})
document.getElementById('rangeVideo').addEventListener('mousemove', function () {
   const val = this.value
   if (rVideoPressing === true) {
      document.getElementById("loadingProgress").style.width = val + '%'
      if (!isNaN(myVideo.duration)) myVideo.currentTime = myVideo.duration * (val / 100)
   }
})

let rVolPressing = false

document.querySelector('.rangeVolume').addEventListener('change', function () {
   var vol = this.value;
   this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + vol + '%, rgba(255,255,255,.2) ' + vol + '%, rgba(255,255,255,.2) ' + (100 - vol) + '%)'
   changeVolume(vol)
});
document.querySelector('.rangeVolume').addEventListener('mousedown', function () {
   rVolPressing = true
})
document.querySelector('.rangeVolume').addEventListener('mouseup', function () {
   rVolPressing = false
})
document.querySelector('.rangeVolume').addEventListener('mousemove', function () {
   if (rVolPressing === true) {
      const vol = this.value
      this.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + vol + '%, rgba(255,255,255,.2) ' + vol + '%, rgba(255,255,255,.2) ' + (100 - vol) + '%)'
      changeVolume(vol)
   }
})

document.querySelector('button.fullScreen').addEventListener('click', function () {
   document.getElementById("seaPlayer").classList.toggle("fullScreen")
})

document.addEventListener("DOMContentLoaded", setupControl, false);
function setupControl() {
   // select the video element from page
   var myVideo = document.getElementById("myVideo");
   if (myVideo.canPlayType) {
      // remove the default buttons
      myVideo.removeAttribute("controls");
      // add event-handlers to control the video element
      myVideo.addEventListener("click", playback, false);
      myVideo.addEventListener("timeupdate", reportProgress, false);
      myVideo.addEventListener("progress", reportBuffer, false);
      myVideo.addEventListener("waiting", reportWaiting, false);
      myVideo.addEventListener("playing", reportPlaying, false);
      myVideo.addEventListener("pause", reportPause, false);
      myVideo.addEventListener("canplay", reportCanPlay, false);
      myVideo.addEventListener("ended", endPlayback, false);
      // enable and disable the controls buttons to reflect the player state
      myVideo.addEventListener("play", function () {
         document.getElementById("play-button").classList = "pause";
      }, false);
      myVideo.addEventListener("pause", function () {
         document.getElementById("play-button").classList = "play";
      }, false);
      // add event-handlers for the control buttons
      myVideo.addEventListener("click", playback, false);
      myVideo.addEventListener('durationchange', reportDurationChange, false);
      document.getElementById("video-gradient").addEventListener("click", playback, false);
      document.getElementById("video-play").addEventListener("click", playback, false);
      document.getElementById("play-button").addEventListener("click", playVideo, false);
      document.getElementById("pause-button").addEventListener("click", pauseVideo, false);
      document.getElementById("button-sound").addEventListener("click", toggleMute, false);
      document.getElementById("button-mute").addEventListener("click", toggleMute, false);
   }
}

//define the event-handlers
function playback() {
   if (myVideo.paused) {
      playVideo()
   } else {
      pauseVideo()
   }
}
function playVideo() {
   myVideo.play()
   document.querySelector("#seaPlayer .video-play").classList.add("started")
   document.getElementById("play-button").style.display = "none"
   document.getElementById("pause-button").style.display = "block"

   document.getElementById("seaPlayer").classList.add("playing")

}
function pauseVideo() {
   myVideo.pause()
   document.getElementById("pause-button").style.display = "none"
   document.getElementById("play-button").style.display = "block"

   document.getElementById("seaPlayer").classList.remove("playing")
}
//if stop button is pushed, the media play stops and the current play time is reset to 0
function stopPlayback() {
   var myVideo = document.getElementById("myVideo");
   myVideo.pause();
   myVideo.currentTime = 0;
   endPlayback();
}
function changeVolume(volume) {
   var myVideo = document.getElementById("myVideo");
   if (myVideo.muted && volume > 0) toggleMute()
   if (!myVideo.muted && volume == 0) toggleMute()
   myVideo.volume = volume / 100;
}

function toggleMute() {
   var myVideo = document.getElementById("myVideo");
   if (myVideo.muted) {
      myVideo.muted = false;
      document.getElementById("button-mute").style.display = "none"
      document.getElementById("button-sound").style.display = "block"
   } else {
      myVideo.muted = true;
      document.getElementById("button-sound").style.display = "none"
      document.getElementById("button-mute").style.display = "block"
   }
}
// when the media play is finished or stopped
function endPlayback() {
   document.querySelector("#seaPlayer").classList.remove("playing")
}

function reportDurationChange(){
   document.querySelector(".video-time-status").innerHTML = `<span class="current">${timeFormat(this.currentTime)}</span> / <span class="end">${timeFormat(this.duration)}</span>`
}

// update the progress bar
function reportProgress() {

   var position = 100 / (this.duration / this.currentTime);
   if (isNaN(position)) return;

   if (Math.round(this.buffered.end(0)) == Math.round(this.seekable.end(0))) {
      document.getElementById("bufferingProgress").style.width = "100%";
   }

   document.getElementById("loadingProgress").style.width = position + '%';
   document.querySelector(".video-time-status").innerHTML = `<span class="current">${timeFormat(this.currentTime)}</span> / <span class="end">${timeFormat(this.duration)}</span>`

   if (rVideoPressing === false) document.querySelector('.rangeVideo').value = position

}

function reportBuffer(e) {
   if (isNaN(myVideo.duration)) return;
   if (myVideo.buffered.length == 0) return;
   var videoBuffered = 100 / (myVideo.duration / myVideo.buffered.end(0))
   document.getElementById("bufferingProgress").style.width = videoBuffered + '%'
   document.querySelector(".video-loading .loaded-text").innerText = videoBuffered.toFixed(1) + '%'
}

function reportWaiting(e) {
   console.log("wating..")
   document.querySelector("#seaPlayer .video-loading").style.display = "block"
}
function reportPlaying(e) {
   console.log("Playing")
}
function reportPause(e) {
   console.log("Pausing")
}
function reportCanPlay(e) {
   document.querySelector("#seaPlayer .video-loading").style.display = "none"
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
document.getElementById('rangeVideo').addEventListener('mousemove', e => {
   const rangeWidth = document.getElementById('rangeVideo').getBoundingClientRect().width
   const thumbWidth = thumbnail.getBoundingClientRect().width

   // Set position
   let positionLeft = e.clientX - document.getElementById('rangeVideo').getBoundingClientRect().left - (thumbnail.getBoundingClientRect().width / 2)
   const positionRight = positionLeft + thumbWidth
   if (positionLeft < 0) positionLeft = 0
   if (positionRight > rangeWidth) positionLeft = rangeWidth - thumbWidth
   thumbnail.style.left = positionLeft + "px"

   // Determine time and set thumb
   const percentage = 100 / (rangeWidth / (e.clientX - document.getElementById('rangeVideo').getBoundingClientRect().left)  )
   const time = parseInt(myVideo.duration * (percentage / 100))
   document.querySelector(".time-current").innerText = timeFormat(time)
   thumb(time)

})

// Set thumb
function thumb(time){
   const thumb_interval = 5
   const row_size = 10
   const width = 188, height = 80
   time = parseInt(time / thumb_interval)
   const frameY = parseInt(time / row_size)
   const frameX = time - row_size * frameY
   const frameTop = frameY * height
   const frameLeft = frameX * width
   const position = -(frameLeft) + 'px ' + -(frameTop) + 'px'
   document.querySelector(".thumbnail").style.backgroundPosition = position
}
<template>
  <!-- Player Controller -->
  <div class="d-flex vw-100 bg-dark justify-content-between fixed-bottom p-3 shadow-sm">
    <div class="d-flex w-50 gap-1">
      <!-- Album Cover -->
      <img :src="albumImage" class="rounded album-cover mt-auto mb-auto" alt="album cover">
      <!-- Track Info -->
      <div class="d-grid w-100 ms-1 mb-0 track-info p-2">
        <!-- Title -->
        <p class="track-info-text mb-0 fw-bold text-break">{{ trackTitle }}</p>
        <!-- Artist -->
        <p class="track-info-text mb-0 fs-6 fw-light">{{ trackArtist }}</p>
      </div>
    </div>
    <!-- Player Control -->
    <div class="d-flex w-75 justify-content-center gap-2 flex-column mt-3">
      <div class="d-flex justify-content-center">
        <!-- Left Controls -->
        <div class="d-flex g-5 mt-1 justify-content-end control-left">
          <!-- Shuffle -->
          <button v-if="!isShuffle" @click="toggleShuffle()" class="control-button"><i
              class="text-white fs-5 fa-solid fa-shuffle"></i></button>
          <button v-else @click="toggleShuffle()" class="control-button"><i
              class="text-success fs-5 fa-solid fa-shuffle"></i></button>
          <!-- Backward -->
          <button @click="previousTrack()" class="control-button"><i
              class="text-white fs-5 fa-solid fa-backward-step"></i></button>
        </div>
        <!-- Play/paused Button -->
        <button v-if="isPaused" @click="togglePlayback()" class="control-button"><i
            class="fa-solid text-white fs-2 fa-circle-play"></i></button>
        <button v-else @click="togglePlayback()" class="control-button"><i
            class="fa-solid text-white fs-2 fa-circle-pause"></i></button>
        <!-- Right Controls -->
        <div class="d-flex justify-content-end ms-2 mt-1 align-content-center g-4 control-left">
          <!-- forward -->
          <button @click="nextTrack()" class="control-button"><i class="text-white fs-5 fa-solid fa-forward-step"></i>
          </button>
          <!-- Repeat -->
          <button v-if="isRepeat === 0" @click="toggleRepeat()" class="control-button"><i
              class="text-white fs-5 fa-solid fa-repeat"></i></button>
          <button v-if="isRepeat === 1" @click="toggleRepeat()" class="control-button"><i
              class="text-success fs-5 fa-solid fa-repeat"></i></button>
          <button v-if="isRepeat === 2" @click="toggleRepeat()" class="control-button"><i
              class="text-info fs-5 fa-solid fa-repeat"></i></button>
        </div>
      </div>
      <!-- Time Remaining -->
      <div class="d-flex justify-content-center track-remaining">
        <div class="d-flex justify-content-end mt-1">
          <!-- remaining time -->
          <p class="text-white track-counter me-2">{{ trackRemaining }}</p>
        </div>
        <!-- Remaining slider -->
        <input type="range" class="form-range" min="0" :max="trackLength" :value="trackRemain">
        <div class="d-flex justify-content-end mt-1">
          <!-- track length -->
          <p class="text-white track-counter ms-2">{{ trackDuration }}</p>
        </div>
      </div>
    </div>
    <!-- Extra Control -->
    <div class="d-flex g-5 w-50 justify-content-end">
      <div class="d-flex mt-auto mb-auto justify-content-end align-items-center">
        <button class="control-button me-1"><i class="text-white fs-6 fa-solid fa-volume-high"></i></button>
        <!-- Volume Slider -->
        <input type="range" class="w-50 form-range" min="0.0" max="1.0" step="0.05" :value="playerVolume" ref="volume">
      </div>
    </div>
  </div>
</template>

<script>
import testCover from '@/assets/test_cover.jpg'

export default {
  name: "Player",
  data() {
    return {
      trackLength: 0,
      trackRemain: 0,
    }
  },
  mounted() {
    this.startPlayer()
    const events = ['change', 'mouseup', 'mousedown']
    events.forEach(type => {
      this.$refs.volume.addEventListener(type, () => {
        this.changeVolume(this.$refs.volume.value)
      });
      setInterval(() => {
        this.progress += 1
      }, 1000)
    });
  },
  computed: {
    trackTitle() {
      if (!this.$store.getters['player/getTrackTitle']) {
        return "Nothing currently playing"
      } else {
        return this.$store.getters['player/getTrackTitle']
      }
    },
    albumImage() {
      if (!this.$store.getters['player/getAlbumImage']) {
        return testCover
      } else {
        return this.$store.getters['player/getAlbumImage']
      }
    },
    trackArtist() {
      if (!this.$store.getters['player/getArtist']) {
        return ""
      } else {
        return this.$store.getters['player/getArtist']
      }
    },
    isPaused() {
      return this.$store.getters['player/getPauseStatus']
    },
    isRepeat() {
      return this.$store.getters['player/getRepeatStatus']
    },
    isShuffle() {
      return this.$store.getters['player/getShuffleStatus']
    },
    playerVolume() {
      return this.$store.getters['player/getVolume']
    },
    trackDuration() {
      this.trackLength = (this.$store.getters['player/getTrackLength'] / 1000).toFixed()
      return this.$store.getters['player/getTrackLength'] ? this.converter(this.$store.getters['player/getTrackLength']) : "00:00"
    },
    trackRemaining() {
      this.trackRemain = (this.$store.getters['player/getTrackRemaining'] / 1000).toFixed()
      return this.$store.getters['player/getTrackRemaining'] ? this.converter(this.$store.getters['player/getTrackRemaining']) : "00:00"
    }
  },
  methods: {
    async startPlayer() {
      this.$store.dispatch('player/initPlayer');
    },
    togglePlayback() {
      this.$store.dispatch('player/togglePlayback');
    },
    nextTrack() {
      this.$store.dispatch('player/nextTrack');
    },
    previousTrack() {
      this.$store.dispatch('player/previousTrack');
    },
    toggleRepeat() {
      this.$store.dispatch('player/toggleRepeat');
    },
    toggleShuffle() {
      this.$store.dispatch('player/toggleShuffle');
    },
    changeVolume(sliderValue) {
      this.$store.dispatch('player/setPlayerVolume', sliderValue % 100)
    },
    converter(millis) {
      const min = Math.floor(millis / 60000);
      const sec = ((millis % 60000) / 1000).toFixed(0);
      return min + ":" + (sec < 10 ? '0' : '') + sec;
    }
  },
  watch: {
    isPaused() {
      this.$store.dispatch('player/updateTrackRemaining')
    }
  }
}
</script>

<style>
.album-cover {
  height: 65px;
  width: 65px;
}

.track-info {
  column-gap: 8px;
  height: 6px;
}

.control-button {
  border: none;
  background: none;
  width: 32px;
  height: 32px
}

.control-left {
  height: 0;
}

.text-success {
  color: #24bd2e;
}

.text-info {
  color: #1dbda3;
}

.track-remaining {
  height: 1.50rem;
}

.track-counter {
  font-size: 13px;
}

.track-info-text {
  color: white;
}
</style>

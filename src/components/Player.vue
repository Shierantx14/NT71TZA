<template>
  <!-- Player Controller -->
<div class="d-flex vw-100 bg-dark justify-content-between fixed-bottom p-3">
  <div class="d-flex w-50">
    <!-- Album Cover -->
    <img :src="albumImage" class="rounded album-cover mt-auto mb-auto" alt="album cover">
    <!-- Track Info -->
    <div class="d-grid w-100 ms-1 track-info p-2">
      <!-- Title -->
      <p class="text-white fw-bold mb-0 text-break">{{ trackTitle }}</p>
      <!-- Artist -->
      <p class="text-white fw-light mb-0">{{ trackArtist }}</p>
    </div>
  </div>
  <!-- Player Control -->
  <div class="d-flex w-100 justify-content-center g-4 mt-3">
    <!-- Left Controls -->
    <div class="d-flex g-5 mt-1 justify-content-end control-left">
      <!-- Shuffle -->
      <button class="control-button"><i class="text-white fs-5 fa-solid fa-shuffle"></i></button>
      <!-- Backward -->
      <button class="control-button"><i class="text-white fs-5 fa-solid fa-backward-step"></i></button>
    </div>
    <!-- Play/paused Button -->
    <button v-if="isPaused" @click="togglePlayback()" class="control-button"><i class="fa-solid text-white fs-2 fa-circle-play"></i></button>
    <button v-else @click="togglePlayback()" class="control-button"><i class="fa-solid text-white fs-2 fa-circle-pause"></i></button>
    <!-- Right Controls -->
    <div class="d-flex justify-content-end ms-2 mt-1 align-content-center g-4 control-left">
      <!-- forward -->
      <button class="control-button"><i class="text-white fs-5 fa-solid fa-forward-step"></i></button>
      <!-- Repeat -->
      <button class="control-button"><i class="text-white fs-5 fa-solid fa-repeat"></i></button>
    </div>
  </div>
  <!-- Extra Control -->
  <div class="d-flex g-5 w-50 justify-content-end">
    <div class="d-flex justify-content-end align-items-center">
      <button class="control-button me-1"><i class="text-white fs-6 fa-solid fa-volume-high"></i></button>
      <input type="range" class="w-50 form-range" min="0" max="100" step="0.1">
    </div>
  </div>
</div>
</template>

<script>
import testCover from '@/assets/test_cover.jpg'
export default {
  name: "Player",
  mounted() {
    this.startPlayer()
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
    }
  },
  methods: {
    async startPlayer() {
      this.$store.dispatch('player/initPlayer')
    },
    togglePlayback() {
      this.$store.dispatch('player/togglePlayback')
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
</style>

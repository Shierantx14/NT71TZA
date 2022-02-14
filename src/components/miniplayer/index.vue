<template>
  <div class="d-flex justify-content-start">
    <div class="d-flex p-2">
      <img :src="tracks.image" class="rounded track-cover-dashboard" alt="album cover">
    </div>
    <!-- Track Information -->
    <div class="d-grid ms-1 track-info-dashboard">
      <p class="mb-0 text-white fw-bold">{{ tracks.title }}</p>
      <p class="mb-0 text-white-50 track-artist">{{ tracks.artists }}</p>
    </div>
  </div>
  <!-- Play Button -->
  <div class="d-flex justify-content-end">
    <div class="d-flex p-2">
      <button v-if="currentTrackId === tracks.id && !itsPause" class="btn-play p-2"><i class="shadow-sm btn-play-logo fa-solid fa-circle-pause"></i></button>
      <button v-else class="btn-play p-2"><i class="shadow-sm btn-play-logo fa-solid fa-circle-play"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    tracks: Object,
  },
  computed: {
    currentTrackId() {
      return this.$store.getters['player/getTrackId']
    },
    itsPause() {
      return this.$store.getters['player/getPauseStatus']
    }
  }
}
</script>

<style scoped>
.track-cover-dashboard {
  width: 64px;
  height: 64px;
}
.btn-play {
  background:none;
  border: none;
}
.btn-play-logo {
  color: #07bd10;
  font-size: 34px;
}
</style>

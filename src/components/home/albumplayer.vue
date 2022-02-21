<template>
  <div class="flex-container rounded-3">
    <div class="d-flex justify-content-start">
      <div class="d-flex me-1">
        <img :src="data.image" class="shadow album-cover-home" alt="album cover">
      </div>
      <!-- Album Information -->
      <div class="d-grid ms-1 mb-auto mt-auto">
        <p class="mb-0 text-white fw-bold album-info">{{ data.name }}</p>
      </div>
    </div>
    <!-- Control -->
    <div class="d-flex p-2">
      <button v-if="getCurrentAlbum === data.name && !itsPause" @click="paused()" class="p-2 btn-control"><i class="shadow-sm btn-control-logo fa-solid fa-circle-pause"></i></button>
      <button v-else @click="playTheAlbum()" class="btn-control p-2"><i class="shadow-sm btn-control-logo fa-solid fa-circle-play"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "albumplayer",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    getCurrentAlbum() {
      return this.$store.getters['player/getAlbumName']
    },
    itsPause() {
      return this.$store.getters['player/getPauseStatus']
    }
  },
  methods: {
    playTheAlbum() {
      if (this.getCurrentAlbum === this.data.name) {
        return this.$store.dispatch('player/togglePlayback')
      } else {
        return this.$store.dispatch('player/playAlbum', this.data.uri)
      }
    },
    paused() {
      return this.$store.dispatch('player/togglePlayback')
    }
  }
}
</script>

<style scoped>

.album-cover-home {
  width: 84px;
  height: 84px;
  border-bottom-left-radius: 0.30rem;
  border-top-left-radius: 0.30rem;
}

.btn-control {
  background: none;
  border: none;
}

.btn-control-logo {
  color: #4f9a87;
  font-size: 34px;
}

.flex-container {
  background-color: #0c1c19;
  width: 25%;
  display: flex;
  justify-content: space-between;
}
.album-info {
  font-size: 15px;
}
</style>

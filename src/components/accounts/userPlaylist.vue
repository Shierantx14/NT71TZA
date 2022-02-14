<template>
  <!-- Container Playlist -->
  <div class="min-vh-100 bg-black" style="margin-bottom: 6rem">
    <div class="container-fluid">
      <!-- Top Artist -->
      <div class="d-flex p-4 flex-column">
        <div class="d-flex w-25 flex-column justify-content-start align-content-center">
          <p class="fw-bold mb-0 text-white fs-5">Top Artist this month</p>
          <p class="mb-0 text-white-50 fs-6">Only you can see this</p>
        </div>
      </div>
      <!-- Top Artist row -->
      <div class="d-flex p-3 gap-4 justify-content-center flex-wrap flex-row">
        <div class="card" v-for="artist in artistList">
          <div class="card-body">
            <img :src="artist.image" alt="artist cover" class="p-2 shadow-lg artist-profile">
            <div class="d-grid p-2 mt-2">
              <p class="mb-0 text-white fw-bold">{{ artist.name }}</p>
              <p class="mb-0 text-white-50 fs-6">{{ artist.type }}</p>
            </div>
            <div class="d-flex mt-2 justify-content-center">
              <button class="btn rounded-2 visit-artist-btn fw-bold text-black">Visit Artist</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Top Track -->
      <div class="d-flex p-4 flex-column">
        <div class="d-flex w-25 flex-column justify-content-start align-content-center">
          <p class="fw-bold mb-0 text-white fs-5">Top Tracks this month</p>
          <p class="mb-0 text-white-50 fs-6">Only you can see this</p>
        </div>
      </div>
      <!-- Top Track row -->
      <div class="d-flex flex-wrap justify-content-center gap-3 p-3 flex-row">
        <!-- Track Box -->
        <div v-for="tracks in tracksList" class="d-flex justify-content-between track-box-dashboard rounded-2 shadow-sm">
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
              <button class="btn-play p-2"><i class="shadow-sm btn-play-logo fa-solid fa-circle-play"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userPlaylist",
  data() {
    return {
      loopTest: 6
    }
  },
  created() {
    this.getTopData()
  },
  computed: {
    artistList() {
      return this.$store.getters['user/getTopArtists']
    },
    tracksList() {
      return this.$store.getters['user/getTopTracks']
    }
  },
  methods: {
    getTopData() {
      this.$store.dispatch('user/getTopArtists')
      this.$store.dispatch('user/getTopTracks')
    }
  }
}
</script>

<style scoped>
.artist-profile {
  width: 184px;
  height: 184px;
  border-radius: 50%
}
.visit-artist-btn {
  background-color: #07bd10;
}
.track-artist {
  line-height: 1rem;
  font-size: 14px;
}
.track-info-dashboard {
  grid-template-rows: 23px;
  align-content: center;
}
.track-cover-dashboard {
  width: 64px;
  height: 64px;
}
.track-box-dashboard {
  background-color: #1e1e1e;
  width: 25%;
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

<template>
  <div class="min-vh-100 bg-black" style="margin-bottom: 6rem">
    <div class="container">
      <div class="d-flex gap-2 flex-column" style="margin-top: 3rem">
        <!-- first row -->
        <div class="d-flex mt-5 justify-content-start">
          <p class="mb-0 text-white fw-bold fs-5">Good Morning, Natsu</p>
        </div>
        <div class="d-flex mt-3 gap-3">
          <albumplayer v-for="recent in recently" :data="recent"/>
        </div>
        <!-- Second Row -->
        <div class="d-flex mt-5 justify-content-start">
          <p class="mb-0 text-white fw-bold fs-5">Editor Picks</p>
        </div>
        <div class="d-flex mt-3 gap-4 justify-content-between flex-wrap">
          <div v-for="playlist in featurePlaylist" class="card" style="width: 13.2rem">
            <div class="card-body">
              <div class="d-flex">
                <img :src="playlist.image" class="image-cover rounded-3 shadow" alt="playlists cover">
              </div>
              <div class="d-flex mt-2">
                <div class="d-grid gap-1">
                  <p class="text-white mb-0 fw-bold">{{ playlist.name }}</p>
                  <p class="text-white-50 mb-0 playlist-description text-break">{{ playlist.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import albumplayer from "@/components/home/albumplayer";

export default {
  name: "homelibrary",
  components: {
    albumplayer
  },
  computed: {
    recently() {
      return this.$store.getters['home/getRecently']
    },
    featurePlaylist() {
      return this.$store.getters['home/getFeature']
    }
  }
}
</script>

<style scoped>
.image-cover {
  height: 177px;
  width: 177px
}
.playlist-description {
  font-size: 12px;
}
</style>

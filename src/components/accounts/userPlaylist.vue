<template>
  <!-- Container Playlist -->
  <div class="min-vh-100 bg-black">
    <div class="container-fluid">
      <!-- Top Artist -->
      <div class="d-flex p-4 flex-column">
        <div class="d-flex w-25 flex-column justify-content-start align-content-center">
          <p class="fw-bold mb-0 text-white fs-5">Top Artist this month</p>
          <p class="mb-0 text-white-50 fs-6">Only you can see this</p>
        </div>
      </div>
      <!-- Top Artist row -->
      <div class="d-flex p-3 gap-4 flex-wrap flex-row">
        <!-- Cart 1 -->
        <div class="card">
          <div class="card-body">
            <img src="../../assets/test_cover.jpg" alt="artist cover" class="p-2 shadow-lg artist-profile">
            <div class="d-grid p-2 mt-2">
              <p class="mb-0 text-white fw-bold">Artist Name</p>
              <p class="mb-0 text-white-50 fs-6">Artist</p>
            </div>
            <div class="d-flex mt-2 justify-content-center">
              <button class="btn rounded-2 visit-artist-btn fw-bold text-black">Visit Artist</button>
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
      howMuchLoop: 6
    }
  }
}
</script>

<style>
.artist-profile {
  width: 184px;
  height: 184px;
  border-radius: 50%
}
.visit-artist-btn {
  background-color: #07bd10;
}
</style>

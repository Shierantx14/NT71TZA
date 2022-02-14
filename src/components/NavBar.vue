<template>
  <!-- Navbar -->
  <div class="navbar fixed-top bg-dark">
    <!-- Brand or whatever -->
    <div class="container-fluid">
      <div class="navbar-brand p-2">
        <router-link to="/" class="text-decoration-none text-white fs-6">Spotify [NTX]</router-link>
      </div>
      <!-- Menu -->
      <div class="nav">
        <!-- Libraries -->
        <div class="nav-item mx-3">
          <router-link to="/libraries" class="text-decoration-none fw-bold text-white"><i class="fa-solid fa-compact-disc"></i> Library</router-link>
        </div>
        <!-- Search -->
        <div class="nav-item mx-3">
          <router-link to="/search" class="text-decoration-none fw-bold text-white"><i class="fa-solid fa-magnifying-glass"></i> Search</router-link>
        </div>
      </div>
      <!-- Account -->
      <div class="nav">
        <div class="nav-item mx-2">
          <router-link to="/account" class="d-flex text-decoration-none">
            <div class="d-flex w-100 bg-black box-account p-1">
              <img :src="profileImage" class="profile-img me-2" alt="profile">
              <p class="text-account me-3 mb-auto fw-bold mt-auto">{{ username }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    profileImage() {
      return this.$store.getters['user/getUserData'].image
    },
    username() {
      return this.$store.getters['user/getUserData'].username ? this.$store.getters['user/getUserData'].username : "Dummy"
    }
  }
}
</script>

<style>
.profile-img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.box-account {
  border-radius: 23px;
}
.text-account {
  color: white;
  font-size: 14px;
}
</style>

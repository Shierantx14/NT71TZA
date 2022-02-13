<template>
  <div class="d-flex w-100 user-container shadow-lg bg-dark">
    <!-- User Information -->
    <div class="d-flex gap-4 w-50 justify-content-start">
      <!-- Profile Image -->
      <div class="d-flex">
        <img :src="profileImage" class="profile-img-dashboard shadow-lg" alt="profile image">
      </div>
      <!-- profile Info -->
      <div class="d-flex mt-auto mb-auto flex-column">
        <!-- Page Title -->
        <div class="d-flex profile-info ms-1 w-100">
          <p class="mb-0 fw-bold">Profile:</p>
        </div>
        <!-- Username -->
        <div class="d-flex profile-info w-100">
          <p class="profile-username mb-0">{{ username }}</p>
        </div>
        <!-- Followers -->
        <div class="d-flex profile-info w-100">
          <p class="profile-extra mb-0">{{ followers }} Followers | Region {{ region }}</p>
        </div>
      </div>
    </div>
    <!-- Account Type -->
    <div class="d-flex ms-auto shadow-sm mb-auto mt-auto p-3 flex-column align-content-center gap-1" :class="{'bg-premium': itsPremium, 'bg-free': !itsPremium}">
      <div class="d-flex justify-content-end">
        <p class="text-white fw-bold mb-0 fs-6 text-uppercase">Account Type</p>
      </div>
      <div class="d-flex justify-content-end">
        <p class="userType">Spotify {{ userType }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userHero",
  props: {
    username: String,
    profileImage: String,
    followers: String,
    region: String,
    userType: String
  },
  computed: {
    itsPremium() {
      return this.userType === "premium";
    }
  }
}
</script>

<style>
.profile-img-dashboard {
  width: 192px;
  height: 192px;
  border-radius: 50%;
}

.user-container {
  padding: 4rem;
}

.profile-info > p {
  color: white;
}

.profile-username {
  font-weight: bold;
  font-size: 3.5rem;
  line-height: 4.5rem;
}
.profile-extra {
  font-weight: bold;
  font-size: 0.80rem;
}
.userType {
  color: white;
  font-size: 3rem;
  margin-bottom: 0;
  font-weight: bold;
  text-transform: uppercase;
}
.bg-premium {
  background-color: #d51e37;
  border-radius: 13px;
  width: 30rem;
}
.bg-free {
  background-color: #0c6abd;
  border-radius: 13px;
  width: 30rem;
}
</style>

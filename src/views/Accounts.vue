<template>
  <navBar/>
  <!-- Account dashboard -->
  <userHero :username="username" :profileImage="profileImage" :followers="followers" :region="region" :userType="userType"/>
  <userPlaylist/>
</template>

<script>
import userHero from "@/components/accounts/userHero";
import navBar from "@/components/NavBar";
import userPlaylist from "@/components/accounts/userPlaylist";

export default {
  name: "Accounts",
  components: {userHero, navBar, userPlaylist},
  data() {
    return {
      username: "",
      profileImage: "",
      followers: "",
      region: "",
      userType: "",
      error: false
    }
  },
  mounted() {
    const userdata = this.$store.getters['user/getUserData']
    this.username = userdata.username
    this.profileImage = userdata.image
    this.followers = userdata.followers
    this.region = userdata.region
    this.userType = userdata.userType
  }
}
</script>

<style>

</style>

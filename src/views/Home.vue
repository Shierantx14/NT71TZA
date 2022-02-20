<template>
  <navBar/>
  <homelibrary/>
</template>

<script>
// @ is an alias to /src
import navBar from "@/components/NavBar";
import homelibrary from "@/components/home/homelibrary";
export default {
  name: 'Home',
  components: {
    navBar,
    homelibrary
  },
  created() {
    this.$store.dispatch('user/getUserData').then(res => {
      if (res === 0) {
        this.error = true
      } else {
        this.$store.dispatch('home/getRecentPlayed')
        this.$store.dispatch('home/getFeaturePlaylist')
      }
    })
  }
}
</script>

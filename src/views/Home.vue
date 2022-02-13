<template>
  <navBar/>
<!-- Library [Coming Soon] -->
  <div class="d-flex justify-content-center vh-100 vw-100 bg-black">
    <div class="d-flex justify-content-center">
      <h1 class="text-white align-self-center fw-bold">Libraries Coming Soon</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navBar from "@/components/NavBar";
export default {
  name: 'Home',
  components: {
    navBar
  },
  created() {
    this.$store.dispatch('user/getUserData').then(res => {
      if (res === 0) {
        this.error = true
      }
    })
  }
}
</script>

<template>
<p></p>
</template>

<script>
export default {
  name: "Callback",
  created() {
    if (this.$route.query.code) {
      this.$store.dispatch('authentication/exchangeCode', this.$route.query.code).then(status => {
        console.log(status)
        switch (status) {
          case 1:
            this.$router.push({path:"/"});
            break
          case 0:
            this.$router.push({path:"/login"});
            break
        }
      });
    } else {
      this.$router.push({path:"/login"});
    }
    if(this.$route.query.error) {
      return this.$router.push({path:"/login"})
    }
  }
}
</script>

<style>

</style>

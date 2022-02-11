<template>
  <router-view/>
  <Player v-if="itsAuth"/>
</template>

<script>
import Player from "@/components/Player";
export default {
  components: {
    Player
  },
  computed: {
    itsAuth() {
      return this.$store.getters['authentication/itsLogin']
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-center min-vh-100 align-content-center bg-dark">
    <div class="d-flex">
      <button class="btn btn-success text-white fw-bold" @click="redirectToSpotify()">Login to Spotify</button>
    </div>
  </div>
</template>

<script>
import querystring from 'query-string'

export default {
  name: "Login",
  methods: {
    redirectToSpotify() {
      window.location = "https://accounts.spotify.com/authorize?" + querystring.stringify({
        response_type: 'code',
        client_id: process.env.VUE_APP_CLIENT_ID,
        scope: process.env.VUE_APP_CLIENT_SCOPE,
        redirect_uri: process.env.VUE_APP_REDIRECT_URL
      });
    }
  }
}
</script>

<style>

</style>

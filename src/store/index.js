import { createStore } from 'vuex'
import authentication from "@/store/modules/authentication";
import player from "@/store/modules/player";

export default createStore({
  modules: {
    authentication,
    player
  }
})

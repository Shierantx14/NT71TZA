import { createStore } from 'vuex'
/* Natsu Module */
import authentication from "@/store/modules/authentication";
import player from "@/store/modules/player";
import user from "@/store/modules/user";

export default createStore({
  modules: {
    authentication,
    player,
    user
  }
})

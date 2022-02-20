import api from "@/service/spotify/api";

export default {
    namespaced: true,
    state: {
        recentlyPlayed: [],
        featurePlaylist:[]
    },
    mutations: {
        SET_RECENTLY_PLAYED(state, data) {
            state.recentlyPlayed = data
        },
        SET_FEATURE_PLAYLIST(state, data) {
            state.featurePlaylist = data
        }
    },
    actions: {
        async getRecentPlayed({commit,rootGetters}) {
            let alist = []
            const res = await api.player.recentlyPlayed(rootGetters['authentication/returnAuthToken'], 4);
            res.data.items.forEach(list => {
                alist.push({id:list.track.album.id, name:list.track.album.name, image:list.track.album.images[1].url, uri:list.track.album.uri})
            })
            commit('SET_RECENTLY_PLAYED', alist)
        },
        async getFeaturePlaylist({commit,rootGetters}) {
            let alist = []
            const res = await api.playlist.featuresPlaylist(rootGetters['authentication/returnAuthToken'], 10, rootGetters['user/getRegion'])
            res.data.playlists.items.forEach(list => {
                alist.push({
                    id: list.id,
                    name: list.name,
                    image: list.images[0].url,
                    description: list.description
                })
            })
            commit('SET_FEATURE_PLAYLIST', alist)
        }
    },
    getters: {
        getRecently(state) {
            return state.recentlyPlayed
        },
        getFeature(state) {
            return state.featurePlaylist
        },
    }
}

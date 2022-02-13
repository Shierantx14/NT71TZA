import spotifyAPI from "@/service/spotify/api";
export default {
    namespaced: true,
    state: {
        userImage:"",
        userName: "",
        userUrl: "",
        userRegion: "",
        userFollower: 0,
        accountType: ""
    },
    mutations: {
        SET_USER_DATA: (state, data) => {
            state.userImage = data.images[0].url
            state.userName = data.display_name
            state.userUrl = data.external_urls.spotify
            state.userRegion = data.country
            state.userFollower = data.followers.total
            state.accountType = data.product
        }
    },
    actions: {
        async getUserData({state, commit, rootGetters}) {
            const userData = await spotifyAPI.users.getUserProfile(rootGetters['authentication/returnAuthToken'])
            switch (userData.code) {
                case 1:
                    commit('SET_USER_DATA', userData.data)
                    return 1
                case 0:
                    return 0
            }
        }
    },
    getters: {
        getUserData(state) {
            return {
                username: `${state.userName}`,
                image: `${state.userImage}`,
                url: `${state.userUrl}`,
                region: `${state.userRegion}`,
                followers: `${state.userFollower}`,
                userType: `${state.accountType}`
            }
        }
    }
}

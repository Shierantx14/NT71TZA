import spotifyAPI from "@/service/spotify/api";

function getArtist(array) {
    let artistList = [];
    array.forEach(artist => {
        artistList.push(artist.name)
    })
    return artistList.toString()
}

export default {
    namespaced: true,
    state: {
        userImage:"",
        userName: "",
        userUrl: "",
        userRegion: "",
        userFollower: 0,
        accountType: "",
        /* User Top's */
        topArtists: [],
        topTracks: []
    },
    mutations: {
        SET_USER_DATA: (state, data) => {
            state.userImage = data.images[0].url
            state.userName = data.display_name
            state.userUrl = data.external_urls.spotify
            state.userRegion = data.country
            state.userFollower = data.followers.total
            state.accountType = data.product
        },
        SAVE_TOP_ARTIST: (state, data) => {
            state.topArtists = data
        },
        SAVE_TOP_TRACKS: (state, data) => {
            state.topTracks = data
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
        },
        async getTopArtists({commit, rootGetters}) {
            const data = await spotifyAPI.users.getUserTop(rootGetters['authentication/returnAuthToken'], "artists", 6);
            switch (data.code) {
                case 1:
                    let listArray = []
                    data.data.items.forEach(list => {
                        listArray.push({id: list.id, image:list.images[1].url, name: list.name, type: list.type})
                    })
                    commit('SAVE_TOP_ARTIST', listArray)
                    return 1
                case 0:
                    return 0
            }
        },
        async getTopTracks({commit, rootGetters}) {
            const data = await spotifyAPI.users.getUserTop(rootGetters['authentication/returnAuthToken'], "tracks", 6);
            switch (data.code) {
                case 1:
                    let listArray = []
                    data.data.items.forEach(tracks => {
                        listArray.push({
                            id: tracks.id,
                            image: tracks.album.images[1].url,
                            title: tracks.name,
                            artists: getArtist(tracks.artists),
                        })
                    })
                    commit('SAVE_TOP_TRACKS', listArray)
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
        },
        getTopArtists(state) {
            return state.topArtists
        },
        getTopTracks(state) {
            return state.topTracks
        }
    }
}

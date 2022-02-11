import api from "@/service/spotify/api";
export default {
    namespaced: true,
    state: {
        deviceID: "",
        albumImage: "",
        artist: "",
        trackTitle: "",
        paused: true,
    },
    mutations: {
        SET_DEVICE_ID(state, data) {
            state.deviceID = data;
        },
        SET_ALBUM_IMAGE(state, data) {
            state.albumImage = data
        },
        SET_ARTIST(state, data) {
            state.artist = data
        },
        SET_TRACK_TITLE(state,data) {
            state.trackTitle = data
        },
        ITS_PAUSE(state, data) {
            state.paused = data
        }
    },
    actions: {
        initPlayer({state, commit, rootGetters}) {
            function spotifySDK() {
                return new Promise(resolve => {
                    if (window.Spotify) {
                        resolve(window.Spotify)
                    } else {
                        window.onSpotifyWebPlaybackSDKReady = () => {
                            resolve(window.Spotify)
                        }
                    }
                })
            }
            function getArtist(array) {
                let artistList = [];
                array.forEach(artist => {
                    artistList.push(artist.name)
                })
                return artistList.toString()
            }
            async function startPlayer() {
                const {Player} = await spotifySDK();
                const engine = new Player({
                    name: "NTX Spotify Player",
                    getOAuthToken: cb => { cb(rootGetters["authentication/returnAuthToken"]); },
                })
                // Ready
                engine.addListener('ready', ({ device_id }) => {
                    commit('SET_DEVICE_ID', device_id)
                    console.log('Ready with Device ID', state.deviceID);
                });

                // Not Ready
                engine.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', state.deviceID);
                });
                // Status
                engine.addListener("player_state_changed", (states) => {
                    if (state) {
                        commit('SET_TRACK_TITLE', states.track_window.current_track.name);
                        commit('SET_ALBUM_IMAGE', states.track_window.current_track.album.images[2].url);
                        commit('SET_ARTIST', getArtist(states.track_window.current_track.artists))
                        commit('ITS_PAUSE', states.paused)
                    }
                });
                engine.connect()
            }
            startPlayer()
        },
        async togglePlayback({state, commit, rootGetters}) {
            switch (state.paused) {
                case true:
                    await api.player.setPlay(state.deviceID, rootGetters['authentication/returnAuthToken']);
                    break
                case false:
                    await api.player.setPause(state.deviceID, rootGetters['authentication/returnAuthToken']);
                    break;
            }
        }
    },
    getters: {
        getTrackTitle(state) {
            return state.trackTitle
        },
        getAlbumImage(state) {
            return state.albumImage
        },
        getArtist(state) {
            return state.artist
        },
        getPauseStatus(state) {
            return state.paused
        }
    }
}

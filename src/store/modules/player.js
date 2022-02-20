import api from "@/service/spotify/api";
export default {
    namespaced: true,
    state: {
        deviceID: "",
        trackID: "",
        albumName: "",
        albumImage: "",
        artist: "",
        progressInterval: null,
        trackTitle: "",
        shuffle: false,
        trackDuration: 0,
        trackRemaining: 0,
        repeat: 0, // 0 --> OFF (default), 1 --> repeat All, 2 --> repeat Once
        paused: true,
        volume: 0.50
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
        },
        SET_REPEAT_MODE(state, data) {
            state.repeat = data
        },
        SET_SHUFFLE_MODE(state, data) {
            state.shuffle = data
        },
        SET_VOLUME(state, data) {
            state.volume = data
        },
        SET_TRACK_DURATION(state, data) {
          state.trackDuration = data
        },
        SET_TRACK_REMAINING(state, data) {
            state.trackRemaining = data
        },
        SET_TRACK_ID(state, data) {
            state.trackID = data
        },
        SET_ALBUM_NAME(state, data) {
            state.albumName = data
        }
    },
    actions: {
        initPlayer({state, commit, dispatch, rootGetters}) {
            /* (Dev Only) check if spotify script is already added to head */
            if(!document.getElementById("spotifySDK")) {
                /* Add spotify web Playback to html head */
                const spotifyScript = document.createElement('script');
                spotifyScript.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
                spotifyScript.setAttribute("id", "spotifySDK")
                document.head.appendChild(spotifyScript);
            }
            /* Initialize Spotify SDK */
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
                    volume: state.volume
                })
                // Ready
                engine.addListener('ready', ({ device_id }) => {
                    commit('SET_DEVICE_ID', device_id)
                    api.player.transferPlayback(state.deviceID, rootGetters['authentication/returnAuthToken'])
                });

                // Not Ready
                engine.addListener('not_ready', () => {
                    console.log('Device ID has gone offline', state.deviceID);
                });
                // Status
                engine.addListener("player_state_changed", (states) => {
                    if (states) {
                        commit('SET_TRACK_TITLE', states.track_window.current_track.name);
                        commit('SET_ALBUM_IMAGE', states.track_window.current_track.album.images[2].url);
                        commit('SET_ARTIST', getArtist(states.track_window.current_track.artists))
                        commit('ITS_PAUSE', states.paused)
                        commit('SET_REPEAT_MODE', states.repeat_mode)
                        commit('SET_SHUFFLE_MODE', states.shuffle)
                        commit('SET_TRACK_DURATION', states.duration)
                        commit('SET_TRACK_REMAINING', states.position)
                        commit('SET_TRACK_ID', states.track_window.current_track.id)
                        commit('SET_ALBUM_NAME', states.track_window.current_track.album.name)
                    }
                });
                engine.connect()
            }
            startPlayer()
        },
        async togglePlayback({state, rootGetters}) {
            switch (state.paused) {
                case true:
                    await api.player.setPlay(state.deviceID, rootGetters['authentication/returnAuthToken']);
                    break
                case false:
                    await api.player.setPause(state.deviceID, rootGetters['authentication/returnAuthToken']);
                    break;
            }
        },
        async playSelected({state,rootGetters}, track) {
          await api.player.setPlay(state.deviceID, rootGetters['authentication/returnAuthToken'],[`${track}`], null)
        },
        async playAlbum({state,rootGetters}, album) {
            await api.player.setPlay(state.deviceID, rootGetters['authentication/returnAuthToken'],null, album)
        },
        async nextTrack({state, rootGetters}) {
            await api.player.nextTrack(state.deviceID, rootGetters['authentication/returnAuthToken']);
        },
        async previousTrack({state, rootGetters}) {
            await api.player.previousTrack(state.deviceID, rootGetters['authentication/returnAuthToken']);
        },
        async toggleRepeat({state, rootGetters}) {
            switch (state.repeat) {
                case 0:
                    await api.player.setRepeatMode(state.deviceID, rootGetters['authentication/returnAuthToken'], "context");
                    break
                case 1:
                    await api.player.setRepeatMode(state.deviceID, rootGetters['authentication/returnAuthToken'], "track");
                    break
                case 2:
                    await api.player.setRepeatMode(state.deviceID, rootGetters['authentication/returnAuthToken'], "off");
                    break
            }
        },
        async toggleShuffle({state, rootGetters}) {
            switch (state.shuffle) {
                case true:
                    await api.player.setShuffle(state.deviceID, rootGetters['authentication/returnAuthToken'], false);
                    break
                case false:
                    await api.player.setShuffle(state.deviceID, rootGetters['authentication/returnAuthToken'], true);
                    break
            }
        },
        async setPlayerVolume({state,commit,rootGetters}, volume) {
            commit('SET_VOLUME', volume);
            await api.player.setVolume(state.deviceID, rootGetters['authentication/returnAuthToken'],(state.volume * 100).toFixed(0));
        },
        updateTrackRemaining({state, commit}) {
            if (!state.paused) {
                state.progressInterval = setInterval(() => {
                    if (state.trackRemaining < state.trackDuration) {
                        commit('SET_TRACK_REMAINING', state.trackRemaining + 1000)
                    }
                }, 1000)
            } else {
                clearInterval(state.progressInterval);
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
        },
        getRepeatStatus(state) {
            return state.repeat
        },
        getShuffleStatus(state) {
            return state.shuffle
        },
        getVolume(state) {
            return state.volume
        },
        getTrackLength(state) {
            return state.trackDuration
        },
        getTrackRemaining(state) {
          return state.trackRemaining
        },
        getTrackId(state) {
            return state.trackID
        },
        getAlbumName(state) {
            return state.albumName
        }
    }
}

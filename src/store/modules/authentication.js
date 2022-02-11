import axios from "axios";
import * as querystring from "querystring";
export default {
    namespaced: true,
    state: {
        authToken: "",
        refreshToken: "",
        expires: 0
    },
    mutations: {
        saveLoginCredentials(state, data) {
            state.authToken = data.access_token
            state.refreshToken = data.refresh_token
            state.expires = data.expires_in
        },
        updateAccessToken(state, data) {
            state.authToken = data.access_token
            state.expires = data.expires_in
        }
    },
    actions: {
        async exchangeCode({state, commit, dispatch}, code) {
            try {
                const res = await axios.post("https://accounts.spotify.com/api/token", querystring.stringify({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: process.env.VUE_APP_REDIRECT_URL
                }), {
                    headers: {
                        'Authorization': `Basic ${(new Buffer(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`).toString('base64'))}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                commit('saveLoginCredentials', res.data)
                dispatch('refreshAccessCode')
                return 1
            } catch (e) {
                return 0
            }
        },
        refreshAccessCode({state, commit}) {
            try {
                setInterval(async () => {
                    const res = await axios.post("https://accounts.spotify.com/api/token", querystring.stringify({
                        grant_type: "refresh_token",
                        refresh_token: state.refreshToken
                    }), {
                        headers: {
                            'Authorization': `Basic ${(new Buffer(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`).toString('base64'))}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    commit('updateAccessToken', res.data)
                }, (state.expires * 1000) - 5000)
            } catch (e) {
                state.authToken = "";
                state.refreshToken = "";
                state.expires = 0;
                this.$router.push({path:'/login'})
            }
        }
    },
    getters: {
        returnAuthToken(state) {
            return state.authToken
        }
    }
}

import base from "@/service/spotify/api/base";

export default {
    setPause(device_id, authToken) {
        return base.put('/me/player/pause', {
            device_id
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
    },
    setPlay(device_id, authToken) {
        return base.put('/me/player/play', {
            device_id
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
    }
}

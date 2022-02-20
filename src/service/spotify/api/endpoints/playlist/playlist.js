import base from '@/service/spotify/api/base'
export default {
    featuresPlaylist(authToken, limit, region) {
        return base.get('/browse/featured-playlists', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                limit,
                country: region,
            }
        });
    }
}

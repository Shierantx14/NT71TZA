import base from '@/service/spotify/api/base'

export default {
    async getUserProfile(authToken) {
        try {
            const res = await base.get('/me', {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            });
            return {data: res.data, code: 1}
        } catch (error) {
            return {error, code: 0}
        }
    }
}

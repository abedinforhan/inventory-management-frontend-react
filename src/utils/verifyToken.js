import axiosInstance from 'src/api/axios'

export const verifyToken = async (accessToken) => {
  const response = await axiosInstance.post('/auth/verify-token', { accessToken })
  return response
}

import { useAuth } from './useAuth'
import axiosInstance from 'src/api/axios'

const useRefreshToken = () => {
  const { setUser } = useAuth()

  const getRefreshToken = async () => {
    const response = await axiosInstance.get('/refresh-token')

    setUser((prev) => {
      console.log(prev)
      console.log(response.data)

      //   return {...prev}
    })

    return response
  }

  return getRefreshToken
}

export default useRefreshToken

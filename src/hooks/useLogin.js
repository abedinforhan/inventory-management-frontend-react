import { useMutation } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

// Add new product
const login = async (loginData) => {
  const response = await axiosInstance.post('/auth/login', loginData)
  return response
}

export const useLogin = (onError, onSuccess) => {
  return useMutation({
    mutationFn: login,
    onError: onError,
    onSuccess: onSuccess,
  })
}

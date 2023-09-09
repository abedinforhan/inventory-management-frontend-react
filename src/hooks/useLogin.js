import { useMutation } from '@tanstack/react-query'

// Add new product
const login = async (loginData) => {
  //   const response = await axiosInstance.post('/products/create-product', loginData)
  //   return response
  console.log({ loginData })
}

export const useLogin = (onError, onSuccess) => {
  return useMutation({
    mutationFn: login,
    onError: onError,
    onSuccess: onSuccess,
  })
}

import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

const fetchLastUserID = async (role) => {
  const response = await axiosInstance.get(`/users/last-user-id?role=${role}`)
  return response
}

export const useLastUserID = (role) => {
  return useQuery({
    queryKey: ['last-user-id'],
    queryFn: () => fetchLastUserID(role),
  })
}

const fetchSingleUser = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`)
  return response
}

export const useSingleUserData = (userId) => {
  return useQuery({
    queryKey: ['single-user', userId],
    queryFn: () => fetchSingleUser(userId),
  })
}

// update existing user
const updateUser = async ({ userId, ...userData }) => {
  const response = await axiosInstance.patch(`/users/${userId}`, userData)

  console.log(response)
  return response
}

export const useUpdateUser = (onError, onSuccess) => {
  return useMutation({
    mutationFn: updateUser,
    onError: onError,
    onSuccess: onSuccess,
  })
}

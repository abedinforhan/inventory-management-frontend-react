import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

const fetchCustomersData = async (currentPage, pageSize, searchTerm) =>
  await axiosInstance.get(`/customers`, {
    params: {
      searchTerm,
      page: currentPage,
      limit: pageSize,
    },
  })

export const useCustomersData = (currentPage, pageSize, searchTerm) => {
  return useQuery({
    queryKey: ['customer-list', currentPage, pageSize, searchTerm],
    queryFn: () => fetchCustomersData(currentPage, pageSize, searchTerm),
    select: (response) => response?.data?.data,
    keepPreviousData: true,
  })
}

const addNewCustomer = async (customerData) => {
  const response = await axiosInstance.post('/customers/create-customer', customerData)
  return response
}

export const useAddNewCustomer = (onError, onSuccess) => {
  return useMutation({
    mutationFn: addNewCustomer,
    onError: onError,
    onSuccess: onSuccess,
  })
}

const deleteCustomer = async (customerId) => {
  const response = await axiosInstance.delete(`/customers/${customerId}`)

  return response
}

export const useDeleteCustomer = (onError, onSuccess) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCustomer,
    onError: onError,
    onSuccess: () => {
      queryClient.invalidateQueries('customer-list')
      onSuccess()
    },
  })
}

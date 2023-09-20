import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

const getSingleSupplier = async (supplierData) => {
  const response = await axiosInstance.get(`/customers/${supplierData}`)

  return response?.data?.data
}

export const useSingleSupplierData = (supplierData) => {
  return useQuery({
    queryKey: ['single-supplier', supplierData],
    queryFn: () => getSingleSupplier(supplierData),
  })
}

// const addNewCustomer = async (customerData) => {
//   const response = await axiosInstance.post('/customers/create-customer', customerData)
//   return response
// }

// export const useAddNewCustomer = (onError, onSuccess) => {
//   return useMutation({
//     mutationFn: addNewCustomer,
//     onError: onError,
//     onSuccess: onSuccess,
//   })
// }

// const updateCustomer = async (customerId, updatedData) => {
//   const response = await axiosInstance.patch(`/customers/${customerId}`, updatedData)
//   return response
// }

// export const useUpdateCustomer = (customerId, onError, onSuccess) => {
//   return useMutation((updatedData) => updateCustomer(customerId, updatedData), {
//     onError: onError,
//     onSuccess: onSuccess,
//   })
// }

// const deleteCustomer = async (customerId) => {
//   const response = await axiosInstance.delete(`/customers/${customerId}`)

//   return response
// }

// export const useDeleteCustomer = (onError, onSuccess) => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: deleteCustomer,
//     onError: onError,
//     onSuccess: () => {
//       queryClient.invalidateQueries('customer-list')
//       onSuccess()
//     },
//   })
// }

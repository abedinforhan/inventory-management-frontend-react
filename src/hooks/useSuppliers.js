import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

//fetching suppliers
const fetchSupplierssData = async (currentPage, pageSize, searchTerm) =>
  await axiosInstance.get(`/suppliers`, {
    params: {
      searchTerm,
      page: currentPage,
      limit: pageSize,
    },
  })

export const useSuppliersData = (currentPage, pageSize, searchTerm) => {
  return useQuery({
    queryKey: ['supplier-list', currentPage, pageSize, searchTerm],
    queryFn: () => fetchSupplierssData(currentPage, pageSize, searchTerm),
    select: (response) => response?.data?.data,
    keepPreviousData: true,
  })
}

// Add new supplier
const addNewSupplier = async (supplierData) => {
  const response = await axiosInstance.post('/suppliers/create-supplier', supplierData)
  return response
}

export const useAddNewSupplier = (onError, onSuccess) => {
  return useMutation({
    mutationFn: addNewSupplier,
    onError: onError,
    onSuccess: onSuccess,
  })
}

// update existing supplieer
const updateSupplier = async ({ supplierId, ...supplierData }) => {
  const response = await axiosInstance.patch(`/suppliers/${supplierId}`, supplierData)
  return response
}

export const useUpdateSupplier = (onError, onSuccess) => {
  return useMutation({
    mutationFn: updateSupplier,
    onError: onError,
    onSuccess: onSuccess,
  })
}

// delete existing supplier
const deleteSupplier = async (supplierId) => {
  const response = await axiosInstance.delete(`/suppliers/${supplierId}`)

  return response
}

export const useDeleteSupplier = (onError, onSuccess) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteSupplier,
    onError: onError,
    onSuccess: () => {
      queryClient.invalidateQueries('supplier-list')
      onSuccess()
    },
  })
}

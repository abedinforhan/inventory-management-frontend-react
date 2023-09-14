import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

//fetching sales
const fetchSales = async (currentPage, pageSize, searchTerm) =>
  await axiosInstance.get(`/sales`, {
    params: {
      searchTerm,
      page: currentPage,
      limit: pageSize,
    },
  })

export const useSalesData = (currentPage, pageSize, searchTerm) => {
  return useQuery({
    queryKey: ['sale-list', currentPage, pageSize, searchTerm],
    queryFn: () => fetchSales(currentPage, pageSize, searchTerm),
    select: (response) => response?.data?.data,
    keepPreviousData: true,
  })
}

//fetching single purcahse
const fetchSingleSell = async (sellId) => {
  const response = await axiosInstance.get(`/sales/${sellId}`)

  return response?.data?.data
}

export const useSingleSellData = (sellId) => {
  return useQuery({
    queryKey: ['single-sell', sellId],
    queryFn: () => fetchSingleSell(sellId),
  })
}

// Add new sell
const addNewSell = async (sellData) => {
  const response = await axiosInstance.post('/sales/create-sell', sellData)
  return response
}

export const useAddNewSell = (onError, onSuccess) => {
  return useMutation({
    mutationFn: addNewSell,
    onError: onError,
    onSuccess: onSuccess,
  })
}

// // delete existing supplier
// const deleteSupplier = async (supplierId) => {
//   const response = await axiosInstance.delete(`/suppliers/${supplierId}`)

//   return response
// }

// export const useDeleteSupplier = (onError, onSuccess) => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: deleteSupplier,
//     onError: onError,
//     onSuccess: () => {
//       queryClient.invalidateQueries('supplier-list')
//       onSuccess()
//     },
//   })
// }

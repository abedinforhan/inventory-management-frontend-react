import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

//fetching purchase summaries
const fetchPurchases = async (currentPage, pageSize, searchTerm) =>
  await axiosInstance.get(`/purchases`, {
    params: {
      searchTerm,
      page: currentPage,
      limit: pageSize,
    },
  })

export const usePurchasesData = (currentPage, pageSize, searchTerm) => {
  return useQuery({
    queryKey: ['purchase-list', currentPage, pageSize, searchTerm],
    queryFn: () => fetchPurchases(currentPage, pageSize, searchTerm),
    select: (response) => response?.data?.data,
    keepPreviousData: true,
  })
}

//fetching single purcahse
const fetchSinglePurchase = async (purchaseId) => {
  const response = await axiosInstance.get(`/purchases/${purchaseId}`)

  return response?.data?.data
}

export const useSinglePurchaseData = (purchaseId) => {
  return useQuery({
    queryKey: ['single-purchase', purchaseId],
    queryFn: () => fetchSinglePurchase(purchaseId),
  })
}

// Add new purchase
const addNewPurchase = async (productData) => {
  const response = await axiosInstance.post('/purchases/create-purchase', productData)
  return response
}

export const useAddNewPurchase = (onError, onSuccess) => {
  return useMutation({
    mutationFn: addNewPurchase,
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

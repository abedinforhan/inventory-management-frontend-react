import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

//fetching products
const fetchProductsData = async (currentPage, pageSize, searchTerm) =>
  await axiosInstance.get(`/products`, {
    params: {
      searchTerm,
      page: currentPage,
      limit: pageSize,
    },
  })

export const useProductsData = (currentPage, pageSize, searchTerm) => {
  return useQuery({
    queryKey: ['product-list', currentPage, pageSize, searchTerm],
    queryFn: () => fetchProductsData(currentPage, pageSize, searchTerm),
    select: (response) => response?.data?.data,
    keepPreviousData: true,
  })
}

//fetching single product
const fetchSingleProduct = async (productId) => {
  const response = await axiosInstance.get(`/products/${productId}`)

  return response?.data?.data
}

export const useSingleProductData = (productId) => {
  return useQuery({
    queryKey: ['single-product', productId],
    queryFn: () => fetchSingleProduct(productId),
  })
}

// Add new product
const addNewProduct = async (productData) => {
  const response = await axiosInstance.post('/products/create-product', productData)
  return response
}

export const useAddNewProduct = (onError, onSuccess) => {
  return useMutation({
    mutationFn: addNewProduct,
    onError: onError,
    onSuccess: onSuccess,
  })
}

// edit existing product
const editProduct = async ({ productId, ...productData }) => {
  const response = await axiosInstance.patch(`/products/${productId}`, productData)
  return response
}

export const useEditProduct = (onError, onSuccess) => {
  return useMutation({
    mutationFn: editProduct,
    onError: onError,
    onSuccess: onSuccess,
  })
}

// delete existing product
const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/products/${productId}`)
  return response
}

export const useDeleteProduct = (onError, onSuccess) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onError: onError,
    onSuccess: () => {
      queryClient.invalidateQueries('product-list')
      onSuccess()
    },
  })
}

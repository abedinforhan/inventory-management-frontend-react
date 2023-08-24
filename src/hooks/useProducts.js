import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

const fetchCategoriesData = async () => {
  const response = await axiosInstance.get('/categories')
  return response
}

export const useCategoryData = () => {
  return useQuery({
    queryKey: ['category-options'],
    queryFn: () => fetchCategoriesData(),
    select: (response) => {
      const categoriesOptions = response?.data?.data?.data.map((category) => ({
        value: category.id,
        label: category.name,
      }))
      return categoriesOptions
    },
  })
}

const addNewProduct = async (productData) => {
  const response = await axiosInstance.post('/products/create-product', productData)
  console.log({ response })
  return response
}

export const useAddNewProduct = (onError, onSuccess) => {
  return useMutation({
    mutationFn: addNewProduct,
    onError: onError,
    onSuccess: onSuccess,
  })
}

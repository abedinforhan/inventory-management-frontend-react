import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

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

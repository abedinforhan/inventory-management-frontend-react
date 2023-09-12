import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

const getBrands = async () => {
  const response = await axiosInstance.get('/brands')
  return response
}

export const useBrandOptions = () => {
  return useQuery({
    queryKey: ['brand-options'],
    queryFn: () => getBrands(),
    select: (response) => {
      const categoriesOptions = response?.data?.data?.data.map((brand) => ({
        value: brand.id,
        label: brand.name,
      }))
      return categoriesOptions
    },
  })
}

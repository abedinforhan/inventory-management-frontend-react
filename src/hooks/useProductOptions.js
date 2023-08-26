import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

const fetchProductOptions = async () => await axiosInstance.get('/products')

export const useProductOptions = () => {
  return useQuery({
    queryKey: ['product-options'],
    queryFn: () => fetchProductOptions(),
    select: (response) => {
      const productOptions = response?.data?.data?.data.map((product) => ({
        value: product.id,
        label: product.name,
        other: product,
      }))
      return productOptions
    },
  })
}

import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

const fetchBrandsData = async () => {
  const response = await axiosInstance.get('/brands')
  return response
}

export const useGetBrandsData = () => {
  return useQuery({
    queryKey: ['brands-options'],
    queryFn: () => fetchBrandsData(),
    select: (response) => {
      const brandsOptions = response?.data?.data?.data.map((brand) => ({
        value: brand.id,
        label: brand.name,
      }))
      return brandsOptions
    },
  })
}

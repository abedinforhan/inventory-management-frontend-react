import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

const fetchSuppliersOptions = async () => await axiosInstance.get('/suppliers')

export const useSuppliersOptions = () => {
  return useQuery({
    queryKey: ['supplier-options'],
    queryFn: () => fetchSuppliersOptions(),
    select: (response) => {
      const supplierOptions = response?.data?.data?.data.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      }))
      return supplierOptions
    },
  })
}

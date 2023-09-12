import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

const fetchCustomersOptions = async () => await axiosInstance.get('/customers')

export const useCustomerOptions = () => {
  return useQuery({
    queryKey: ['customer-options'],
    queryFn: () => fetchCustomersOptions(),
    select: (response) => {
      const customersOptions = response?.data?.data?.data.map((customer) => ({
        value: customer.id,
        label: customer.name,
      }))
      return customersOptions
    },
  })
}

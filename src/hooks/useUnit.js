import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/API/axiosInstance'

const fetchUnitsData = async () => {
  const response = await axiosInstance.get('/units')
  return response
}

export const useUnitData = () => {
  return useQuery({
    queryKey: ['unit-options'],
    queryFn: () => fetchUnitsData(),
    select: (response) => {
      const unitsOptions = response?.data?.data?.data.map((unit) => ({
        value: unit.id,
        label: unit.name,
      }))
      return unitsOptions
    },
  })
}

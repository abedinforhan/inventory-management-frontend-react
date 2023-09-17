import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/api/axios'

const fetchSummaries = async () => {
  const response = await axiosInstance.get('/summaries')

  return response
}

export const useSummaries = () => {
  return useQuery({
    queryKey: ['summaries'],
    queryFn: fetchSummaries,
  })
}

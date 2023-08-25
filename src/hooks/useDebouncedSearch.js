import { useEffect, useState } from 'react'

export const useDebouncedSearch = (searchTerm, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm)

  useEffect(() => {
    const delayhandler = setTimeout(() => {
      setDebouncedValue(searchTerm)
    }, delay)

    return () => {
      clearTimeout(delayhandler)
    }
  }, [searchTerm, delay])
  return debouncedValue
}

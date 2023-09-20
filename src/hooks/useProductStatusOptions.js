export const useProductStatusOptions = () => {
  const statusOptions = [
    {
      label: 'Stock Out',
      value: 'out-stock',
    },
    {
      label: 'In Stock',
      value: 'in-stock',
    },
  ]
  return statusOptions
}

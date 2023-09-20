import { format } from 'date-fns'

const formateDate = (date) => {
  const givenDate = new Date(date)
  const formattedDate = format(givenDate, 'dd/MM/yyyy')
  return formattedDate
}

export default formateDate

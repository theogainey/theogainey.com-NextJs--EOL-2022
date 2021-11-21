import { parseISO, format } from 'date-fns'

type Props = {
  date: string
}

const FormatedDate = ({ date }: Props) => {
  const dateParsed = parseISO(date)
  return <time dateTime={date}>{format(dateParsed, 'LLLL d, yyyy')}</time>
}

export default FormatedDate

import { parseISO, format } from 'date-fns'


const FormatedDate = ({ date }: Props) => {
  const dateParsed = parseISO(date)
  return (
    <div className="text-gray-400	 text-left">
      <time  dateTime={date}>{format(dateParsed, 'LLLL d, yyyy')}</time>
    </div>
  )
}

export default FormatedDate

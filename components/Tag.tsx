import Link from 'next/link'

const Tag = ({name, color}) => {
  return (
    <div className="px-2" style={{backgroundColor: color}}>
      <p>{name}</p>
    </div>
  )
}

export default Tag

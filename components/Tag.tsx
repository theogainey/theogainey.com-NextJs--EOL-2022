import Link from 'next/link'
type TagProps = {
  name: string;
}

const Tag = ({name}:TagProps) => {
  return (
    <div className="pr-2 text-gray-400">
      <p >{name}</p>
    </div>
  )
}

export default Tag

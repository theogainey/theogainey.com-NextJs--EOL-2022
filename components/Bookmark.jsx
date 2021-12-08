import Image from 'next/image'

const Bookmark =  ({bookmark, og}) => {

  return (
    <div className="m-4 w-full border-l-4">
      <a  href={bookmark.url}>
        <div className="px-4 flex flex-row items-start justify-start w-full group">
          <div className='flex flex-col items-start justify-start w-full md:w-2/3 '>
            <span className="font-bold text	text-black group-hover:text-blue-500">{og.title} </span>
            {og.description&&(<span className="text-sm text-black line-clamp-2 group-hover:text-blue-500">{og.description}</span>)}
          </div>
        </div>
      </a>
    </div>
  )
}


export default Bookmark

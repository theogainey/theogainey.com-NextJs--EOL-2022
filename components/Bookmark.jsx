import Image from 'next/image'
//loader function allows to load images from src not defind in next.config
const Bookmark =  ({bookmark, og}) => {

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className="p-1 pb-0 text-left border bg-white rounded-lg my-4">
    {og? (
      <a  href={bookmark.url}>
      {og.image? (
        <div className="flex flex-row items-center justify-end w-full">
          <div className='flex flex-col items-start justify-start w-full md:w-2/3 p-1'>
            <span className="font-bold text	text-black">{og.title} </span>
            {og.description&&(<span className="text-sm text-black">{og.description.substring(0,150)}</span>)}
          </div>
          {og.image &&(
          <div className="hidden md:block	 w-1/3">
            <Image
              lazy={'true'}
              loader={myLoader}
              src={og.image}
              height={320 }
              width={640 }
              className={'p-2 border rounded'}
              alt={og.title}
            />
          </div>
          )}
        </div>
        ):(
        <div className='flex flex-col items-start justify-start w-full p-1'>
          <span className="font-bold text-lg	text-black">{og.title} </span>
          {og.description&&(<span className="text text-black">{og.description}</span>)}
        </div>
      )}
      </a>
    ):(
      <a href={bookmark.url}>{bookmark.url}</a>
    )}
    </div>
  );
}


export default Bookmark

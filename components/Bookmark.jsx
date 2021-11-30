import Image from 'next/image'
//loader function allows to load images from src not defind in next.config
const Bookmark =  ({bookmark, og}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className="p-1 pb-0 text-left border rounded-lg my-4 shadow">
    {og? (
      <a  href={bookmark.url}>
      <div className="flex flex-row items-start justify-end w-full">
        <div className='w-full md:w-2/3 p-1'>
          <h4 className="font-bold text-sm	text-black">{og.title} </h4>
          {og.description&&(<h5 className="text-sm text-black">{og.description}</h5>)}
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
      </a>
    ):(
      <p>loading</p>
    )}
    </div>
  );
}


export default Bookmark

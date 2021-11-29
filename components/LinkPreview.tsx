import useSWR from "swr";
import Image from 'next/image'

const LinkPreview =  ({link_preview, og}) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className=" p-1 pb-0 bg-gray-300	rounded-lg shadow">
    {og? (
      <>
    {og.image &&(
      <a href={link_preview.url}>
      <Image
        lazy={'true'}
        loader={myLoader}
        src={og.image}
        height={320 }
        width={640 }
        className={'p-2 border rounded'}
        alt={og.title}
      />
      </a>
    )}
      </>
    ):(
      <p>loading</p>
    )}
    </div>
  );
}

export default LinkPreview

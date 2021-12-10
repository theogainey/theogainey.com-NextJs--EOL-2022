import Link from 'next/link'
import Image from 'next/image'

const ProjectCard = ({description, slug,  Name, image}) => {
  return (
    <div className="w-full my-4 group 	" >
      <Link href={`/projects/${slug.rich_text[0].plain_text}`}>
        <a>
          <Image
            src={`/${image.rich_text[0].plain_text}`}
            height={960 }
            width={1920 }
            className={' border rounded-lg'}
            alt={`${Name.title[0].plain_text}`}
          />
          <h3 className=" text-xl text-left font-bold group-hover:text-blue-500">{Name.title[0].plain_text}</h3>
          <p className=" text-left group-hover:text-blue-500">{description.rich_text[0].plain_text}</p>
        </a>
      </Link>
    </div>
  )
}

export default ProjectCard

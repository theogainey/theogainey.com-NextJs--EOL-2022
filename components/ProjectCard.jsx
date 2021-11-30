import Link from 'next/link'
import Tag from './Tag'
import FormatedDate from './FormatedDate'

const ProjectCard = ({description, slug, created, tags, Name}) => {
  return (
    <div className="w-full my-4" >
      <Link href={`/projects/${slug.rich_text[0].plain_text}`}>
        <a>
          <h3 className="text-xl text-left font-bold">{Name.title[0].plain_text}</h3>
        </a>
      </Link>
      <div className="flex flex-row items-center justify-start w-full">
        {tags.multi_select.map((tag) =>
          <Tag key={tag.id} {...tag}/>
        )}
      </div>
      <p className=" text-left 	">{description.rich_text[0].plain_text}</p>
      <FormatedDate date={created.date.start}/>

    </div>
  )
}

export default ProjectCard

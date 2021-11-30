import Link from 'next/link'
import Tag from './Tag'
import FormatedDate from './FormatedDate'

const ProjectCard = ({Description, Slug, GitHub, Created, Tags, Name}) => {
  return (
    <div className="w-full my-4" >
      <Link href={`/projects/${Slug.rich_text[0].plain_text}`}>
        <a>
          <h3 className="text-xl text-left font-bold">{Name.title[0].plain_text}</h3>
        </a>
      </Link>
      <div className="flex flex-row items-center justify-start w-full">
        {Tags.multi_select.map((tag) =>
          <Tag key={tag.id} {...tag}/>
        )}
      </div>
      <p className=" text-left 	">{Description.rich_text[0].plain_text}</p>
      <FormatedDate date={Created.date.start}/>

    </div>
  )
}

export default ProjectCard

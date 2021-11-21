import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import {getSortedPostsData}  from '../lib/markdownToHtml'
import {getDatabase} from '../lib/notion'
type Props = {
  allPostsData: PostMetaData[]
}


const Home = ({projects}: Props) => {
  return (
    <Layout>
      <Head>
        <title>Theo Gainey </title>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <section id={'about'} className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold my-2">Theo Gainey</h1>
          <Image
            priority
            src="/profile.png"
            height={200}
            width={200}
            className={"rounded-full border border-gray-100 shadow-sm"}
            alt={'Theo Gaieny'}
            />
          <h2 className="text-xl font-bold">Full Stack Developer Apprentice - Sparkbox</h2>
          <p className="text-xl">Jan 2022 - present </p>
        </section>
        <section id={'projects'} className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">Projects</h2>
          <div className="w-3/5  flex flex-wrap items-center justify-around">
          {projects.map((project) =>
            <ProjectCard key={project.id} {...project.properties}/>
          )}
          </div>
        </section>
      </main>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const projectData = await getDatabase();
  return {
    props: {
      projects: projectData,
    }
  }
}


export default Home

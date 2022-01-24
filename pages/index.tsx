import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import {getDatabase} from '../lib/notion'

const Home = ({projects}: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://theogainey.com" key="canonical"/>
        <meta name="description" content="Theo Gainey - Full Stack Developer"/>
        <meta property="og:title" content="Theo Gainey" />
        <meta property="og:site_name" content="Theo Gainey"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theogainey.com" />
        <meta property="og:description" content="Theo Gainey - Full Stack Developer"/>
        <meta property="og:image" content="https://theogainey.com/Theo-Gainey.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content="@GaineyTheo" />
        <meta name="twitter:image" content="https://theogainey.com/Theo-Gainey.png"/>
        <meta name="twitter:image:alt" content="Theo Gainey "/>
        <meta name="twitter:title" content="Theo Gainey"  />
        <meta name="twitter:description" content="Theo Gainey - Full Stack Developer"/>
        <title>Theo Gainey </title>
      </Head>
        <section id={'about'} className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2 text-green-300">Theo Gainey</h1>
          <Image
            priority
            src="/profile.jpg"
            height={300}
            width={362}
            alt={'Theo Gainey'}
          />
          <h2 className="mt-2 text-xl font-bold text-green-300">Full Stack Developer Apprentice</h2>
          <span className="text-xl text-green-300">Sparkbox </span>
          <span className="text-xl text-green-300">Jan 2022 - present </span>
        </section>
        <section id={'projects'}>
          <h2 className="text-4xl font-bold my-2 pt-16">Projects</h2>
          <p className="text-lg ">See what I have built</p>
          <div className="sm:grid sm:grid-cols-2 sm:gap-10">
          {projects.map((project) =>
            <ProjectCard key={project.id} {...project.properties}/>
          )}
          </div>
        </section>
    </Layout>
  )
}
export const getStaticProps:GetStaticProps = async () => {
  const projectData = await getDatabase();
  return {
    props: {
      projects: projectData,
    },
    revalidate: 10,
  };
}


export default Home

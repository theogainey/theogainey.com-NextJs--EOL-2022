import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type LayoutProps = {
    children?: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return(
    <div className="bg-gray-900 text-yellow-300">
      <header className="top-0 z-20 bg-gray-900">
        <nav className=" py-2 px-4 text-xl font-bold mx-auto lg:max-w-4xl ">
          <Link href={'/'}>
            <a className="hover:underline">Home</a>
          </Link>
          <Link href={'/#projects'}>
            <a className="hover:underline px-4">Projects</a>
          </Link>
          <Link href={'/HelpfulLinks'}>
            <a className="hover:underline">Helpful Links</a>
          </Link>
        </nav>
      </header>
      <main className="px-4 flex flex-col items-center justify-center max-w-4xl mx-auto mt-16 antialiased ">
        {children}
      </main>
      <footer className="px-4 pt-2 pb-12 mt-10 	max-w-4xl mx-auto text-left text-xl">
        <nav className="flex flex-row items-start justify-start pt-2">
          <a
            className="hover:underline"
            href={'https://github.com/theogainey'}
            target={'_blank'}
          >
            GitHub
          </a>
          <a
            className="px-4 hover:underline"
            href={'https://twitter.com/GaineyTheo'}
            target={'_blank'}
          >
            Twitter
          </a>
          <Link href={'https://www.imdb.com/list/ls004172644/'}>
            <a target={'_blank'} rel={'noopener noreferrer'} className="mx-2">
              <Image
                src={'/banner/top-100.gif'}
                width={88}
                height={31}
                alt={'Top 100 telenovelas'}
              />
            </a>
          </Link>
          <Link href={'https://web.archive.org/web/20100104070711/http://www.sun.com:80/'}>
            <a target={'_blank'} rel={'noopener noreferrer'} className="mx-2">
              <Image
                src={'/banner/sun.gif'}
                width={88}
                height={31}
                alt={'Sun Microsystems'}
              />
            </a>
          </Link>
          <Link href={'https://isp.netscape.com/'}>
            <a target={'_blank'} rel={'noopener noreferrer'} className="mx-2">
              <Image
                src={'/banner/netscape.gif'}
                width={88}
                height={31}
                alt={'Netscape'}
              />
            </a>
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default Layout

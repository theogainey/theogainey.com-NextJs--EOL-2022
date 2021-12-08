import { ReactNode } from 'react'
import Link from 'next/link'

type LayoutProps = {
    children?: ReactNode
}


const Layout = ({children}: LayoutProps) => {
  return(
    <div>
      <header className="sticky top-0 z-20 bg-white">
        <nav className=" py-2 px-4 text-xl font-bold mx-auto lg:max-w-4xl">
          <Link href={'/'}>
            <a>Home</a>
          </Link>
          <Link href={'/#projects'}>
            <a className=" px-4">Projects</a>
          </Link>
          <Link href={'/HelpfulLinks'}>
            <a>Helpful Links</a>
          </Link>
        </nav>
      </header>
      <main className="px-4 flex flex-col items-center justify-center max-w-4xl mx-auto mt-16 antialiased ">
        {children}
      </main>
      <footer className="px-4 pt-2 pb-12 mt-10 	max-w-4xl mx-auto text-left text-xl">
        <nav className="border-t-2 flex flex-row items-start justify-start pt-2">
          <a href={'https://github.com/theogainey/theogainey.com'}>GitHub</a>
          <a className="px-4" href={'https://twitter.com/GaineyTheo'}>Twitter</a>
        </nav>
      </footer>
    </div>
  )
}

export default Layout

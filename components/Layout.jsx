import Link from 'next/link'

const Layout = ({children}) => {
  return(
    <div className="flex flex-col items-center justify-center  px-10 min-h-screen bg-gray-50	overflow-hidden	">
      <header>
        <nav className="h-8  bg-gray-50	 absolute text-xl flex flex-row items-center justify-start mt-10 inset-0 px-10 lg:left-1/4 lg:px-2	">
          <Link href={'/'}>
            <a className="font-bold ">Home</a>
          </Link>
          <Link href={'/#projects'}>
            <a className="font-bold px-4">Projects</a>
          </Link>
          <Link href={'/HelpfulLinks'}>
            <a className="font-bold "> Helpful Links</a>
          </Link>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center w-full lg:w-1/2 flex-1 text-center ">
        {children}
      </main>
      <footer className="pt-2 pb-12 border-t	w-full lg:w-1/2 h-full text-left text-xl">
        <nav className="flex flex-row items-start justify-start mt-2">
          <a className="" href={'https://github.com/theogainey/theogainey.com'}>GitHub</a>
          <a className="px-4" href={'https://twitter.com/GaineyTheo'}>Twitter</a>
          <a className="" href={'mailto:theogainey@gmail.com'}>Email</a>
        </nav>
      </footer>
    </div>
  )
}

export default Layout

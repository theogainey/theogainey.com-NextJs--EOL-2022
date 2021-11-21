export type PostMetaData = {
  id:string,
  title: string,
  date: string,
  description: string,
  gitHub: string
}

export type PostData = {
  id:string,
  title: string,
  date: string,
  description: string,
  source: {
    compiledSource:string,
    scope: {
      [key: string]:string
    }
  }
}
export type PostId = {
  params:{
    id:string
  }
}

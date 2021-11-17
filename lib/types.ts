export type PostData = {
  id:string,
  title: string,
  date: string,
  description: string
}

export type PostId = {
  params:{
    id:string
  }
}

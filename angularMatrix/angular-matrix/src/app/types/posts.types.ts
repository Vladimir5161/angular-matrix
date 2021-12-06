export interface Post  {
  id: string,
  createdDate: string,
  updatedDate: string,
  title: string,
  content: string,
  imageUrl: string | null,
  likesCount: number,
  author: Author,
  isLikedByCurrentUser: boolean
}
export interface Author {
  id: string,
  email: string,
  avatarUrl: string | null,
  displayName?: string,
}

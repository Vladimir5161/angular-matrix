export interface Post  {
  "id": string,
  "createdDate": string,
  "updatedDate": string,
  "title": string,
  "content": string,
  "imageUrl": string,
  "likesCount": number,
  "author": {
    "id": string,
    "email": string,
    "displayName": string,
    "avatarUrl": string
  },
  "isLikedByCurrentUser": boolean
}

export interface Category {
  name: String
  slug: String
}
export interface PostNode {
  author: {
    bio: String
    id: String
    name: String
    photo: {
      url: String
    }
  }
  categories: Array<Category>
  createdAt: Date
  excerpt: String
  featuredImage: { url: String }
  slug: String
  title: String
}
export interface Author {
  bio: String
  id?: String
  name: String
  photo: {
    url: String
  }
}
export interface DetailedPost {
  author: Author
  categories: Array<Category>
  createdAt: Date
  excerpt: String
  content: { raw: { children: any[] } }
  featuredImage: { url: String }
  slug: String
  title: String
}
export interface PostInterface {
  node: PostNode
}
export interface RecentAndRelatedPost {
  createdAt: Date
  featuredImage: { url: String }
  slug: String
  title: String
}

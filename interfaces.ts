interface Category {
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
export interface PostInterface {
  node: PostNode
}

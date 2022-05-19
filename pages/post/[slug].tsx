import React from 'react'
import { getPosts, getPostDetails } from '../../services'
import {
  Category,
  DetailedPost,
  PostInterface,
  PostNode,
} from '../../interfaces'
import {
  Categories,
  PostDetail,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from '../../components'

interface PostDetailInterface {
  post: DetailedPost
}
const PostDetails: React.FC<PostDetailInterface> = ({ post }) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map(
                (category: Category) => category.slug
              )}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export async function getStaticProps({ params }: any) {
  const data = (await getPostDetails(params.slug)) || []
  return {
    props: { post: data },
  }
}
export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }: { node: { slug: String } }) => ({
      params: { slug },
    })),
    fallback: true,
  }
}
export default PostDetails

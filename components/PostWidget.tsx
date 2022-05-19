import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { getRecentPosts, getSimilarPosts } from '../services'
import { Category, RecentAndRelatedPost } from '../interfaces'

interface PostWidgetProps {
  categories?: Array<Category> | Array<String>
  slug?: String
}
const PostWidget: React.FC<PostWidgetProps> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<RecentAndRelatedPost[]>([])
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result: RecentAndRelatedPost[]) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result: RecentAndRelatedPost[]) => {
        setRelatedPosts(result)
      })
    }
    return () => {
      console.log('cleaned up')
    }
  }, [slug])
  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related blogs' : 'Recent blogs'}
      </h3>

      {relatedPosts.map((post: RecentAndRelatedPost) => (
        <div
          className="mb-4 flex w-full items-center"
          key={post.title.toString()}
        >
          <div className="w-16 flex-none">
            <img
              alt={post.title.toString()}
              height="60px"
              width="60px"
              className="rounded-full align-middle"
              src={post.featuredImage.url.toString()}
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget

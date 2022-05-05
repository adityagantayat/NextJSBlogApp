import React from 'react'
import Link from 'next/link'

interface Category {
  name: String
  slug: String
}
const categories: Array<Category> = [
  { name: 'React', slug: 'react' },
  { name: 'webdev', slug: 'webdev' },
]
const Header: React.FC = () => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-b border-blue-400 py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold text-white">
              NextBLOG
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category: Category, index: number) => (
            <Link href={`/category/${category.slug}`} key={index}>
              <span className="aligh-middle mt-2 ml-4 cursor-pointer font-semibold text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header

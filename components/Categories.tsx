import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Category } from '../interfaces'
import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    getCategories().then((newCategories: Category[]) =>
      setCategories(newCategories)
    )
    return () => {
      console.log('cleaned up')
    }
  }, [])
  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
      {categories.map((category: Category) => (
        <Link
          href={`/category/${category.slug}`}
          key={category.slug.toString()}
        >
          <span className="mb-3 block cursor-pointer pb-3 transition duration-300 hover:text-pink-600">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories

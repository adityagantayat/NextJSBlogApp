import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import { Category } from '../interfaces'

const Header: React.FC = () => {
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

import React, { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services'
interface CommentsProps {
  slug: String
}
const CommentsForm: React.FC<CommentsProps> = ({ slug }) => {
  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
    return () => {
      console.log('cleaned up')
    }
  }, [])
  const [error, setError] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
  // const [localStorage, setLocalStorage] = useState(null)
  const commentEl = useRef<any>()
  const nameEl = useRef<any>()
  const emailEl = useRef<any>()
  const storeDataEl = useRef<any>()
  const handleCommentSubmit = () => {
    setError(false)
    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { value: storeData } = storeDataEl.current
    if (!comment || !name || !email) {
      setError(true)
      return
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    }
    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }
    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }
  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Comments Form
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            {' '}
            Same my email and name for the next time I comment
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500"> All fields are required</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          className="ease inline-block cursor-pointer rounded-lg bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
          onClick={handleCommentSubmit}
        >
          Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Commented!
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm

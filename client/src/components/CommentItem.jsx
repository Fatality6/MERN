import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { removeComment } from '../redux/features/comment/commentSlice'


export const CommentItem = ({ cmt, post }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const commentId = cmt._id
  const postId = post._id
  const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)

  const removePostHandler = () => {
    try {
        dispatch(removeComment({commentId, postId}))
        toast('Комментарий был удалён')
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className='flex items-center justify-start gap-3 min-w-full max-w-full'>
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-[12px] max-w-full">{cmt.comment}</div>
      {user?._id === post.author && (
        <div className='flex gap-3 mt-4'>
          <button
            onClick={removePostHandler}
            className='transition-all flex justify-end gap-2 pb-4 text-white opacity-10 hover:opacity-50 hover:transition-all'
          >
            <AiFillDelete />
          </button>
        </div>
      )}
    </div>
  )
}

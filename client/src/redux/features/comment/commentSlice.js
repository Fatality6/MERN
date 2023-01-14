import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

//создаём стартовый state
const initialState = {
    comments: [],
    isLoading: false
}

export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment }) => {
    try {
        const {data} = await axios.post(`/comments/${postId}`, { postId, comment })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
    try {
        const {data} = await axios.get(`/posts/comments/${postId}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removeComment = createAsyncThunk('comments/removeComment', async({commentId, postId}) => {
    try {
        const { data } = await axios.delete(`/comments/${commentId}`, {data: { postID: `${postId}`  }})
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        //Создание комментария
        [createComment.pending]: (state) => {
            state.isLoading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.isLoading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.isLoading = false
        },
        //Получение всех комментариев
        [getPostComments.pending]: (state) => {
            state.isLoading = true
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.isLoading = false
            state.comments = action.payload
        
        },
        [getPostComments.rejected]: (state) => {
            state.isLoading = false
        },
        //Удаление комментария
        [removeComment.pending]: (state) => {
            state.isLoading = true
        },
        [removeComment.fulfilled]: (state, action) => {
            state.isLoading = false
            //перезаписываем state без поста с полученным id
            state.comments = state.comments.filter((comment) => comment._id !== action.payload.id)
        },
        [removeComment.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default commentSlice.reducer
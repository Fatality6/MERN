import React from "react"
import { useEffect } from "react"
import { PostItem } from "../components/PostItem"
import { useDispatch, useSelector } from "react-redux"
import { getMyPosts } from "../redux/features/post/postSlice"

export const MyWorks = () => {
    /* const [posts, setPosts] = useState([])

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    } */
    const dispatch = useDispatch()
    const { myPosts } = useSelector((state) => state.post)
    
    useEffect(()=>{
        dispatch(getMyPosts())
    },[dispatch, myPosts])

    if(!myPosts.length) {
        return <div className="text-xl text-center text-white py-20">Нет опубликованных постов</div>
    }

    return <div className="flex flex-col w-1/2 mx-auto py-10 gap-10">
        {myPosts?.map((post,idx) => <PostItem key={idx} post={post}/>) }
    </div>
}
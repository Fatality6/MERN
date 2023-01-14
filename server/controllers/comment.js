import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

//Создать комментарий
export const createComment = async(req,res) => {
    try {
        //берём из req.body {postId, comment}
        const {postId, comment} = req.body
        //если нет текста комментария возвращаем сообщение
        if(!comment) return res.json({message: 'Комментарий не может быть пустым'})
        //создаём инстанс схемы Comment
        const newComment = new Comment({comment})
        //сохраняем объект комментария в БД
        await newComment.save()
        try {
            //Находим пост по id к которому должен добавиться комментарий и обновляем его
            await Post.findByIdAndUpdate(postId, {
                //добовляем в массив комментариев поста id нового комментария
                $push: {comments: newComment._id}
            })
        } catch (error) {
            console.log(error)
        }
        //возвращаем новый комментарий
        res.json(newComment)
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Удалить комментарий
export const removeComment = async( req, res ) => {
    try {
         // ищем комментарий по ID и удаляем его
         const comment = await Comment.findByIdAndDelete(req.params.id)
        //если комментария нет возвращаем сообщение
        if(!comment) res.json({message: 'Такого коммента не существует'})
        //если есть ищем пост и удаляем из его комментов id коммента
        await Post.findByIdAndUpdate(req.body.postID,{
            $pull: { comments: req.params.id}
         })
        //возвращаем сообщение
         res.json({message: 'Комментарий удалён', id: `${req.params.id}`})
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}
import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url' 

//Создать пост
export const createPost = async( req, res ) => {
    try {
        //из req получаем title,text
        const {title,text} = req.body
        
        //ищем по ID user`а
        const user = await User.findById(req.userId)
        //если в файлах есть картинка
        if (req.files) {
            //формируем имя файла из даты и имени файла
            let fileName = Date.now().toString() + req.files.image.name

            //получаем путь к данному файлу
            const __dirname = dirname(fileURLToPath(import.meta.url))

            //перемещаем фаил в папку uploads
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            //создаём экземпляр схемы Post
            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: user._id
            })

            //сохраняем экземпляр в БД
            await newPostWithImage.save()

            //находим автора поста и добавляем в БД в массив posts новый пост
            await User.findByIdAndUpdate(req.userId,{
                $push: { posts: newPostWithImage }
            }) 

            //возвращаем созданный объект в res
            return res.json({newPostWithImage, message: 'Пост создан'})
        }

        //если в новом посте нет картинки, то создаём другой экземпляр схемы
        const newPostWithoutImage = new Post({
            username: user.username,
                title,
                text,
                imgUrl: '',
                author: req.userId
        })

        //сохраняем экземпляр в БД
        await newPostWithoutImage.save()

        //находим автора поста и добавляем в БД в массив posts новый пост
        await User.findByIdAndUpdate(req.userId,{
            $push: { posts: newPostWithoutImage }
        }) 

        //возвращаем созданный объект в res
        res.json({newPostWithoutImage, message: 'Пост создан'})
    } catch (error) {
        res.json({message: 'Ошибка'})
    }
}

//Найти все посты
export const getAll = async( req, res ) => {
    try {
        //ищем все посты и сортируем их по дате создания
        const posts = await Post.find().sort('-createdAt')
        //ищем 5 самых просматриваемых постов и сортируем их по количеству просмотров
        const popularPosts = await Post.find().limit(5).sort('-views')
        //если постов нет возвращаем сообщение
        if(!posts) return res.json({message: 'Постов нет'})
        //если посты есть возвращаем посты и популярные посты
        res.json({posts, popularPosts})
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Найти пост по ID
export const getById = async( req, res ) => {
    try {
        // ищем пост по ID и инкрементируем свойство views на 1
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        //возвращаем пост
        res.json(post)
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Найти посты пользователя
export const getMyPosts = async( req, res ) => {
    try {
        //ищем пользователя по ID
        const user = await User.findById(req.userId)
        //составляем массив id постов
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            })
        )
        //возвращаем массив id постов
        res.json(list)
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Редактировать пост
export const updatePost = async( req, res ) => {
    try {
        //получаем из req.body title, text, id
       const { title, text, id} = req.body

       //находим пост по id
       const post = await Post.findById(id)

        //если в запросе есть фаил картинки
        if (req.files) {
            //формируем имя файла из даты и имени файла
            let fileName = Date.now().toString() + req.files.image.name

            //получаем путь к данному файлу
            const __dirname = dirname(fileURLToPath(import.meta.url))

            //перемещаем фаил в папку uploads
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            //изменяем адрес картинки поста
            post.imgUrl = fileName || ''
        }

        //изменяем заголовок и текст поста
        post.title = title
        post.text = text 

        // сохраняем изменения в БД
        await post.save()

        //возвращаем пост
        res.json(post)
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Удалить пост
export const removePost = async( req, res ) => {
    try {
        // ищем пост по ID и удаляем его
        const post = await Post.findByIdAndDelete(req.params.id)
        //если поста нет возвращаем сообщение
        if(!post) res.json({message: 'Такого поста не существует'})
        //если есть ищем пользователя и удаляем из его постов id поста
        await User.findByIdAndUpdate(req.userId,{
            $pull: { posts: req.params.id}
        })
        //возвращаем сообщение
        res.json({message: 'Пост удалён'})
    } catch (error) {
        res.json({message: 'Что-то пошло не так', id: `${req.params.id}`})
    }
}

//Найти комментарии к посту
export const getPostComments = async ( req, res ) => {
    try {
        //ищем пост по id из адресной строки 
        const post = await Post.findById(req.params.id)
        //создаём массив id комментариев
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            })
        )
        //возвращаем массив id комментариев
        res.json(list)
    } catch (error) {
        res.json({message: 'Что-то пошло не так'})
    }
}
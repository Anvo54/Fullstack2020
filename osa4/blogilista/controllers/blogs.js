const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const usId = await User.find({})
  const ids = usId.map(u => u.id)
  // const user = await User.findById(body.userId)
  const user = await User.findById(ids[0])
  let likes = (!body.likes) ? 0 : body.likes

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: likes,
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (expection) {
    next(expection)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  let likes = (!body.likes) ? 0 : body.likes

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  }

  try {await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204).end()
  } catch (expection) {
    next (expection)
  }
})

module.exports = blogsRouter
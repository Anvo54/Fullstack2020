const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  let likes = (!body.likes) ? 0 : body.likes

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  })
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(expection) {
    next(expection)
  }
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
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const basicBlogs = [
  {
    title: 'Hello',
    author: 'Me',
    url: 'http://www.fi',
    likes: 2
  },
  {
    title: 'Hello again',
    author: 'You',
    url: 'http://www.com',
    likes: ''
  },
  {
    title: 'Hello again.. third time!',
    author: 'You too',
    url: 'http://www.org',
    likes: '7'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(basicBlogs[0])
  await blogObject.save()

  blogObject = new Blog(basicBlogs[1])
  await blogObject.save()
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(2)
})

test('identification field is id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(b => b.id)).toBeDefined()
})

test('Blog can be posted ', async () => {
  const blogObject = new Blog(basicBlogs[2])

  await api.post('/api/blogs')
    .send(blogObject)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('Likes is zero by default', async () => {
  await Blog.deleteMany({})

  let newBlogObj = {
    title: 'Nikon DSLR blog',
    author: 'Canon europe',
    url: 'http://www.photograpyandbeyond.com',
    likes: ''
  }

  await api
    .post('/api/blogs')
    .send(newBlogObj)
    .expect(200)

  const response = await api.get('/api/blogs')
  expect(response.body.map(r => r.likes)).toContainEqual(0)
})

test('400 Error if title or url missing', async () => {
  await Blog.deleteMany({})

  let newBlogObj = {
    author: 'Piu',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogObj)
    .expect(400)
})

test('Can delete post', async () => {
  await Blog.deleteMany({})

  let newBlogObj = {
    title: 'Delete me blog',
    author: 'Destroyer',
    url: 'http://www.deletemyblog.com',
    likes: ''
  }

  await api
    .post('/api/blogs')
    .send(newBlogObj)
    .expect(200)

  const response = await api.get('/api/blogs')
  let id = response.body.map(b => b.id)

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
})

test('Can modify post', async () => {
  await Blog.deleteMany({})

  let newBlogObj = {
    title: 'Modify my blog',
    author: 'Modifier',
    url: 'http://www.modifymyblog.com',
    likes: ''
  }
  let modBlogObj = {
    title: 'Modify my blog',
    author: 'Modifier',
    url: 'http://www.modifymyblog.com',
    likes: '200'
  }

  await api
    .post('/api/blogs')
    .send(newBlogObj)
    .expect(200)

  let response = await api.get('/api/blogs')
  let id = response.body.map(b => b.id)
  expect(response.body.map(r => r.likes)).toContainEqual(0)

  await api
    .put(`/api/blogs/${id}`).send(modBlogObj)
    .expect(204)

  response = await api.get('/api/blogs')
  expect(response.body.map(r => r.likes)).toContainEqual(200)
})

afterAll(() => {
  mongoose.connection.close()
})
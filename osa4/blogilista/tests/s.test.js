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
    likes: 20
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

afterAll(() => {
  mongoose.connection.close()
})
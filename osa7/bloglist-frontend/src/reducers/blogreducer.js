import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const blogItem = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: blogItem
    })
  }
}

export const likeBlog = (updatedBlog) => {
  const {id, username, user, ...ub} = updatedBlog
  const updated = {
    user: user,
    likes: ub.likes,
    author: ub.author,
    title: ub.title,
    url: ub.url,
  }
  return async dispatch => {
    await blogService.update(id, updated)
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.del(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE':
      return state.filter(blog => blog.id !== action.data)
    case 'LIKE':
      const updated = {
        author: action.data.author,
        id: action.data.id,
        likes: action.data.likes,
        title: action.data.title,
        url: action.data.url,
        user: action.data.user
      }
      return state.map(blogs => blogs.id !== updated.id ? blogs : updated)
    default:
      return state
  }
}

export default blogReducer
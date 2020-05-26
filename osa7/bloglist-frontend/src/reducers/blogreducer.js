import blogService from '../services/blogs'

//Hae alkuperäinen state axionilla DB:stä
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
    const blogItem = await blogService.newBlog(content)
    dispatch({
      type: 'NEW_BLOG',
      data: blogItem
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('Daatta ',action.data)
  switch (action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

export default blogReducer
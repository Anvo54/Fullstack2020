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
  console.log('Content: ',content)
  return async dispatch => {
    const blogItem = await blogService.create(content)
    console.log('BlogItem: ',blogItem)
    dispatch({
      type: 'NEW_BLOG',
      data: blogItem
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('data ',action.data)
  console.log('state ',state)
  switch (action.type){
    case 'INIT_BLOGS':
      state = action.data
      return state
    case 'NEW_BLOG':
      return [...state, action.data]
    default:
      return state
  }
}

export default blogReducer
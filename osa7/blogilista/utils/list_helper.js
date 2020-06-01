const dummy = ( ) => {
  return(1)
}

const totalLikes = (blogs) => {
  const result = blogs.reduce(( ac, cv ) => ac + cv.likes, 0)
  return result
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const obj = blogs.find(blog => blog.likes === Math.max(...likes))
  const result = {
    'title': obj.title,
    'author': obj.author,
    'likes': obj.likes
  }
  return(result)
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
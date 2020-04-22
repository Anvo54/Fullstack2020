const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  const result = blogs.reduce(( ac, cv) => ac + cv.likes, 0)
  return result
}

module.exports = {
  dummy,
  totalLikes
}
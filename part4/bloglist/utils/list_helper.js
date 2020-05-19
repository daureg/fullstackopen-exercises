const _ = require('lodash')

const dummy = (blogs) => { // eslint-disable-line no-unused-vars
  return 1
}

const totalLikes = (blogs) => blogs.map(b => b.likes).reduce((a,b) => a+b, 0)

const favoriteBlog = (blogs) => _.pick(_.maxBy(blogs, 'likes'), ['title', 'author', 'likes'])

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

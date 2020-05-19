const _ = require('lodash')

const dummy = (blogs) => { // eslint-disable-line no-unused-vars
  return 1
}

const totalLikes = (blogs) => blogs.map(b => b.likes).reduce((a,b) => a+b, 0)

const favoriteBlog = (blogs) => _.pick(_.maxBy(blogs, 'likes'), ['title', 'author', 'likes'])

const reshapeMaxValue = (counts, unit, metric) => {
  const maxCount = _.max(_.values(counts))
  const res = _.toPairs(_.pickBy(counts, (v) => v === maxCount))[0]
  return { [unit]: res[0], [metric]: res[1] }
}

const mostBlog = (blogs) => {
  if (_.isEmpty(blogs)) { return {} }
  return reshapeMaxValue(_.countBy(blogs, 'author'), 'author', 'blogs')
}
const mostLikes = (blogs) => {
  if (_.isEmpty(blogs)) { return {} }
  const likeCounts = _.mapValues(_.groupBy(blogs, 'author'), (posts) => posts.map(p => p.likes).reduce((a,b) => a+b))
  return reshapeMaxValue(likeCounts, 'author', 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
}

/*
 val blogs = List(
  Map( "_id" -> "5a422a851b54a676234d17f7", "title" -> "React patterns", "author" -> "Michael Chan", "url" -> "https ->//reactpatterns.com/", "likes" -> 7, "__v" -> 0 ),
  Map( "_id" -> "5a422aa71b54a676234d17f8", "title" -> "Go To Statement Considered Harmful", "author" -> "Edsger W. Dijkstra", "url" -> "http ->//www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", "likes" -> 5, "__v" -> 0 ),
  Map( "_id" -> "5a422b3a1b54a676234d17f9", "title" -> "Canonical string reduction", "author" -> "Edsger W. Dijkstra", "url" -> "http ->//www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", "likes" -> 12, "__v" -> 0 ),
  Map( "_id" -> "5a422b891b54a676234d17fa", "title" -> "First class tests", "author" -> "Robert C. Martin", "url" -> "http ->//blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", "likes" -> 10, "__v" -> 0 ),
  Map( "_id" -> "5a422ba71b54a676234d17fb", "title" -> "TDD harms architecture", "author" -> "Robert C. Martin", "url" -> "http ->//blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", "likes" -> 0, "__v" -> 0 ),
  Map( "_id" -> "5a422bc61b54a676234d17fc", "title" -> "Type wars", "author" -> "Robert C. Martin", "url" -> "http ->//blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", "likes" -> 2, "__v" -> 0 )
)
blogs.groupBy(b => b("author").toString).map({ case (author, posts) => author -> posts.map(p => p("likes").toString.toInt).sum}).maxBy({case (a,p) => p})
 */

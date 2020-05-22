const listHelper = require('../utils/list_helper')
const testHelper = require('../tests/test_helper.js')

const blogs = testHelper.initialBlogs
const listOneBlog = blogs.slice(0, 1)

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('of an single element list to be that element number of likes', () => {
    expect(listHelper.totalLikes(listOneBlog)).toBe(7)
  })
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})
describe('the favorite blog', () => {
  test('of an empty list is empty', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
  test('of an single element list to be that element', () => {
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }
    expect(listHelper.favoriteBlog(listOneBlog)).toEqual(expected)
  })
  test('of a bigger list to be one of those with the most likes', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(listHelper.favoriteBlog(blogs)).toEqual(expected)
  })
})

describe('the author with most written blogs', () => {
  test('of an empty list is empty', () => {
    expect(listHelper.mostBlog([])).toEqual({})
  })
  test('of an single blog list is that author', () => {
    const expected = {
      author: 'Michael Chan',
      blogs: 1,
    }
    expect(listHelper.mostBlog(listOneBlog)).toEqual(expected)
  })
  test('of a bigger list to be one of those with the most blogs', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    expect(listHelper.mostBlog(blogs)).toEqual(expected)
  })
})

describe('the author with most like', () => {
  test('of an empty list is empty', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
  test('of an single blog list is that author', () => {
    const expected = {
      author: 'Michael Chan',
      likes: 7,
    }
    expect(listHelper.mostLikes(listOneBlog)).toEqual(expected)
  })
  test('of a bigger list to be one of those with the most likes', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })
})

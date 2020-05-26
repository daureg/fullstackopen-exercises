import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addOne = async (blog, token) => {
  const addedBlog = await axios.post(baseUrl, blog, {headers: {authorization: `Bearer ${token}`}})
  return addedBlog.data
}

export default { getAll, addOne }

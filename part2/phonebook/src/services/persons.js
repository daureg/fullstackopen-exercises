import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}
const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}
const remove = existingObjectID => {
  return axios.delete([baseUrl, existingObjectID].join("/")).then(response => response.data)
}

export default { getAll, create, remove }

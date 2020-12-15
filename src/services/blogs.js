import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const deleteItem = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(baseUrl + "/" + id, config)
  return request.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async modifiedObject => {
  console.log("tulee addLikeen" + modifiedObject.url)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(baseUrl + "/" + modifiedObject.id, modifiedObject, config)
  return response.data
}

export default { getAll, create, setToken, addLike, deleteItem }
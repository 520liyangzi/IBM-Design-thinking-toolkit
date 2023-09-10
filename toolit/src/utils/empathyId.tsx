import axios from 'axios'
const key = 'empathy-key'

const getEmpathy = async () => {
  try {
    const response = await axios.get('http://localhost:8080/get/token', {
      params: {
        key: key,
      },
    })
    if (response.data === null) {
      return null
    }
    return response.data
  } catch (error) {
    return null
  }
}
const setEmpathy = async (tokenValue: string) => {
  try {
    await axios.post('http://localhost:8080/set/token', {
      tokenKey: key,
      tokenValue,
    })
  } catch (error) {
    console.error('Error setting token:', error)
  }
}

const removeEmpathy = async (tokenValue: string) => {
  try {
    await axios.post('http://localhost:8080/delete/token', {
      tokenValue: key,
    })
  } catch (error) {
    console.error('Error delete token:', error)
  }
}

export { getEmpathy, setEmpathy, removeEmpathy }

import axios from 'axios'
const key = 'scenario-key'

const getScenario = async () => {
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
const setScenario = async (tokenValue: string) => {
  try {
    await axios.post('http://localhost:8080/set/token', {
      tokenKey: key,
      tokenValue,
    })
  } catch (error) {
    console.error('Error setting token:', error)
  }
}

const removeScenario = async (tokenValue: string) => {
  try {
    await axios.post('http://localhost:8080/delete/token', {
      tokenValue: key,
    })
  } catch (error) {
    console.error('Error delete token:', error)
  }
}

export { getScenario, setScenario, removeScenario }

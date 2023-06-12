import { useState } from 'react'

export default function useAuth() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token')
    const token = tokenString ? JSON.parse(tokenString) : null
    return token
  }

  const getUser = () => {
    const userString = sessionStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null
    return user
  }

  const [token, setToken] = useState(getToken())
  const [user, setUser] = useState(getUser())

  const saveToken = (token) => {
    sessionStorage.setItem('token', JSON.stringify(token))
    setToken(token)
  }

  const saveUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  return {
    setToken: saveToken,
    token,
    setUser: saveUser,
    user,
  }
}

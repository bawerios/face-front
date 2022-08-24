import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 29000,
})

api.interceptors.request.use(async (config) => {
  const token = await Cookies.get('token')
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

export async function signin({ email, password }) {
  try {
    return await api.post('/login', { email, password })
  } catch (error) {
    return error.response
  }
}


export async function register({ name, email, password }) {
  try {
    const response = await api.post('/user', { name, email, password })
    return response
  } catch (error) {
    return error.response
  }
}

// PEDIDO ============================================================================
export async function orderCreate({ deliveryDate, orderItems, customization, formOfPayment, clientId, value }) {
  try {
    const response = await api.post('/order', { deliveryDate, orderItems, customization, formOfPayment, clientId, value })
    return response
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export async function order() {
  try {
    const response = await api.get('/order')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function orderById({ orderId }) {
  try {
    const response = await api.get(`/order/${orderId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function orderByIdStatus({ orderId }) {
  try {
    const response = await api.get(`/order/${orderId}/status`)
    return response
  } catch (error) {
    return error.response
  }
}

export async function orderEdit({ orderId, deliveryDate, orderItems, customization, status, formOfPayment, clientId }) {
  try {
    const response = await api.put(`/order/${orderId}`, { deliveryDate, orderItems, customization, status, formOfPayment, clientId })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function orderDelete({ orderId }) {
  try {
    const response = await api.delete(`/order/${orderId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

//CLIENTES ===============================================================================
export async function client() {
  try {
    const response = await api.get('/client')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function clientById({ clientId }) {
  try {
    const response = await api.get(`/client/${clientId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function clientCreate({ name, email, cnpj, phone }) {
  try {
    const response = await api.post('/client', { name, email, cnpj, phone })
    return response
  } catch (error) {
    return error.response
  }
}

export async function clientEdit({ name, email, cnpj, phone, clientId }) {
  try {
    const response = await api.put(`/client/${clientId}`, { name, email, cnpj, phone })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function clientDelete({ clientId }) {
  try {
    const response = await api.delete(`/client/${clientId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

//CLIENTES ===============================================================================
export async function user() {
  try {
    const response = await api.get('/user')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function userById({ userId }) {
  try {
    const response = await api.get(`/user/${userId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function userCreate({ name, email, cnpj, phone }) {
  try {
    const response = await api.post('/user', { name, email, cnpj, phone })
    return response
  } catch (error) {
    return error.response
  }
}

export async function userEdit({ name, email, userId }) {
  try {
    const response = await api.put(`/user/${userId}`, { name, email })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function userDelete({ userId }) {
  try {
    const response = await api.delete(`/user/${userId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}
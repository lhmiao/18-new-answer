import axios from 'axios'
import qs from 'qs'

const clientConfig = {
  baseURL: '',
  timeout: 10000
}

export default class BaseApi {
  constructor () {
    this.client = this.getAxiosClient()
  }

  getAxiosClient () {
    let axiosClient = axios.create(clientConfig)
    axiosClient.interceptors.response.use(
      res => {
        if (res.data.sc !== 200) {
          return Promise.reject(res.data.msg)
        }
        return res.data
      },
      err => Promise.reject(err)
    )
    return axiosClient
  }

  request (option) {
    return this.client.request(option)
  }

  get (url, params = {}) {
    const option = {
      url,
      method: 'get',
      params
    }
    return this.request(option)
  }

  post (url, data = {}, type = 'json') {
    const option = {
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (type === 'form-data') {
      option.headers['Content-Type'] = 'multipart/form-data'
      const form = new FormData()
      for (let key in data) {
        let value = data[key]
        form.append(key, value)
      }
      option.data = form
    } else if (type === 'x-www-form-urlencoded') {
      option.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      option.data = qs.stringify(data)
    } else {
      option.data = data
    }
    return this.request(option)
  }

  put (url, data = {}, type = 'json') {
    const option = {
      url,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (type === 'form-data') {
      option.headers['Content-Type'] = 'multipart/form-data'
      const form = new FormData()
      for (let key in data) {
        let value = data[key]
        form.append(key, value)
      }
      option.data = form
    } else if (type === 'x-www-form-urlencoded') {
      option.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      option.data = qs.stringify(data)
    } else {
      option.data = data
    }
    return this.request(option)
  }

  delete (url, data = {}) {
    const option = {
      url,
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }
    return this.request(option)
  }
}

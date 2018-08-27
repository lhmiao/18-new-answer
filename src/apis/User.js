import BaseApi from './BaseApi.js'

export default class User extends BaseApi {
  login (data) {
    const url = '/user/login'
    return this.post(url, data)
  }

  getTimuList (data) {
    const url = '/exam/timuList'
    return this.post(url, data)
  }

  submitAnswer (data) {
    const url = '/exam/submitAnswer'
    return this.post(url, data)
  }
}

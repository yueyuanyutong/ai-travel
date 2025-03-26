import { storage, validation } from '../utils/helpers.js'

class AuthService {
  constructor() {
    this.currentUser = storage.get('currentUser')
    this.token = storage.get('token')
  }

  // 登录
  async login(email, password) {
    try {
      if (!validation.email(email) || !validation.password(password)) {
        throw new Error('邮箱或密码格式不正确')
      }

      // 模拟登录验证
      if (email === 'test@example.com' && password === '123456') {
        const userData = {
          username: '测试用户',
          email: email,
          id: '1'
        }
        const token = 'mock-token-' + Date.now()
        
        this.token = token
        this.currentUser = userData
        storage.set('token', token)
        storage.set('currentUser', userData)
        return userData
      } else {
        throw new Error('邮箱或密码错误')
      }
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 注册
  async register(userData) {
    try {
      if (!validation.email(userData.email) || !validation.password(userData.password)) {
        throw new Error('邮箱或密码格式不正确')
      }

      // 模拟注册
      const token = 'mock-token-' + Date.now()
      const user = {
        username: userData.username,
        email: userData.email,
        id: Date.now().toString()
      }
      
      this.token = token
      this.currentUser = user
      storage.set('token', token)
      storage.set('currentUser', user)
      return user
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  }

  // 登出
  logout() {
    this.token = null
    this.currentUser = null
    storage.remove('token')
    storage.remove('currentUser')
  }

  // 检查是否已登录
  isAuthenticated() {
    return !!this.token
  }

  // 获取当前用户
  getCurrentUser() {
    return this.currentUser
  }

  // 更新用户信息
  async updateProfile(userData) {
    try {
      if (!this.isAuthenticated()) {
        throw new Error('未登录')
      }

      // 模拟更新用户信息
      const updatedUser = {
        ...this.currentUser,
        ...userData
      }
      
      this.currentUser = updatedUser
      storage.set('currentUser', updatedUser)
      return updatedUser
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }
}

// 创建全局认证服务实例
window.auth = new AuthService() 
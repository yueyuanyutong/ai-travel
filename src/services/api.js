// API服务类
class ApiService {
  constructor() {
    this.baseUrl = 'https://api.example.com' // 替换为实际的API地址
  }

  // 生成行程
  async generatePlan(params) {
    try {
      const response = await fetch(`${this.baseUrl}/plan/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      return await response.json()
    } catch (error) {
      console.error('生成行程失败:', error)
      throw error
    }
  }

  // 获取酒店列表
  async getHotels(params) {
    try {
      const response = await fetch(`${this.baseUrl}/hotels`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: params,
      })
      return await response.json()
    } catch (error) {
      console.error('获取酒店列表失败:', error)
      throw error
    }
  }

  // 获取机票信息
  async getFlights(params) {
    try {
      const response = await fetch(`${this.baseUrl}/flights`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: params,
      })
      return await response.json()
    } catch (error) {
      console.error('获取机票信息失败:', error)
      throw error
    }
  }

  // 保存用户信息
  async saveUserProfile(data) {
    try {
      const response = await fetch(`${this.baseUrl}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      console.error('保存用户信息失败:', error)
      throw error
    }
  }

  // 获取用户行程列表
  async getUserTrips() {
    try {
      const response = await fetch(`${this.baseUrl}/user/trips`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return await response.json()
    } catch (error) {
      console.error('获取用户行程列表失败:', error)
      throw error
    }
  }
}

// 创建全局API服务实例
window.api = new ApiService() 
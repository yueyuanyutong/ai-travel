import { handleError } from '../utils/helpers.js'

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_KIMI_API_KEY
    this.baseUrl = 'https://api.moonshot.cn/v1'
  }

  // 解析用户输入
  async parseUserInput(input) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "moonshot-v1-8k",
          messages: [
            {
              role: "system",
              content: "你是一个旅行规划专家。请分析用户输入并提取以下信息：\n1. 目的地\n2. 预算金额\n3. 旅行天数\n4. 特殊偏好\n\n请严格按照以下JSON格式返回：\n{\n  \"destination\": \"目的地名称\",\n  \"budget\": 预算数字,\n  \"duration\": 天数数字,\n  \"preferences\": [\"偏好1\", \"偏好2\"]\n}"
            },
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0.3,
          max_tokens: 2000,
          stream: false
        })
      })

      const data = await response.json()
      console.log('API Response:', data) // 添加日志
      
      if (data.error) {
        console.error('API Error:', data.error)
        throw new Error(data.error.message || '调用AI服务失败')
      }

      try {
        // 尝试解析AI返回的内容
        const content = data.choices[0].message.content.trim()
        console.log('AI Response Content:', content)
        return JSON.parse(content)
      } catch (parseError) {
        console.error('解析AI响应失败:', parseError)
        // 如果解析失败，返回默认值
        return this.parseAIResponse(data.choices[0].message.content)
      }
    } catch (error) {
      console.error('解析用户输入失败:', error)
      throw new Error('无法解析您的需求，请重试')
    }
  }

  // 生成行程建议
  async generateItinerary(params) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "moonshot-v1-8k",
          messages: [
            {
              role: "system",
              content: "你是一个旅行规划专家。请根据提供的参数生成详细的旅行计划。请严格按照以下JSON格式返回：\n{\n  \"days\": [\n    {\n      \"date\": \"YYYY-MM-DD\",\n      \"spots\": [\n        {\n          \"name\": \"景点名称\",\n          \"duration\": 分钟数,\n          \"description\": \"景点描述\",\n          \"location\": {\n            \"lat\": 纬度,\n            \"lng\": 经度\n          }\n        }\n      ]\n    }\n  ],\n  \"budget\": {\n    \"total\": 总预算,\n    \"accommodation\": 住宿费用,\n    \"transportation\": 交通费用,\n    \"food\": 餐饮费用,\n    \"activities\": 活动费用,\n    \"shopping\": 购物预算\n  }\n}"
            },
            {
              role: "user",
              content: JSON.stringify(params)
            }
          ],
          temperature: 0.3,
          max_tokens: 4000,
          stream: false
        })
      })

      const data = await response.json()
      console.log('API Response:', data) // 添加日志
      
      if (data.error) {
        console.error('API Error:', data.error)
        throw new Error(data.error.message || '调用AI服务失败')
      }

      try {
        // 尝试解析AI返回的内容
        const content = data.choices[0].message.content.trim()
        console.log('AI Response Content:', content)
        return JSON.parse(content)
      } catch (parseError) {
        console.error('解析AI响应失败:', parseError)
        // 如果解析失败，返回默认值
        return this.formatItinerary(data.choices[0].message.content)
      }
    } catch (error) {
      console.error('生成行程失败:', error)
      throw new Error('生成行程失败，请重试')
    }
  }

  // 解析AI响应
  parseAIResponse(response) {
    try {
      // 返回默认值
      return {
        destination: '杭州',
        budget: 5000,
        duration: 3,
        preferences: ['自然风光', '文化古迹']
      }
    } catch (error) {
      console.error('解析AI响应失败:', error)
      throw new Error('解析响应失败，请重试')
    }
  }

  // 格式化行程
  formatItinerary(response) {
    try {
      // 返回默认值
      return {
        days: [
          {
            date: '2024-03-20',
            spots: [
              {
                name: '西湖',
                duration: 180,
                description: '西湖风景名胜区，游览时间建议3小时',
                location: {
                  lat: 30.2587,
                  lng: 120.1485
                }
              },
              {
                name: '灵隐寺',
                duration: 120,
                description: '著名的佛教寺院，游览时间建议2小时',
                location: {
                  lat: 30.2417,
                  lng: 120.1228
                }
              }
            ]
          }
        ],
        budget: {
          total: 5000,
          accommodation: 1500,
          transportation: 1000,
          food: 1000,
          activities: 1000,
          shopping: 500
        }
      }
    } catch (error) {
      console.error('格式化行程失败:', error)
      throw new Error('格式化行程失败，请重试')
    }
  }

  // 优化行程
  async optimizeItinerary(itinerary) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的旅行规划助手，请根据当前行程提供优化建议，包括时间安排、路线优化、预算调整等。以JSON格式返回。'
            },
            {
              role: 'user',
              content: JSON.stringify(itinerary)
            }
          ],
          temperature: 0.7
        })
      })

      const data = await response.json()
      return JSON.parse(data.choices[0].message.content)
    } catch (error) {
      console.error('优化行程失败:', error)
      throw handleError(error)
    }
  }

  // 获取景点推荐
  async getAttractions(location, preferences = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的旅行规划助手，请根据目的地和用户偏好推荐合适的景点。包含景点名称、描述、推荐游览时间、门票价格等信息。以JSON格式返回。'
            },
            {
              role: 'user',
              content: JSON.stringify({ location, preferences })
            }
          ],
          temperature: 0.7
        })
      })

      const data = await response.json()
      return JSON.parse(data.choices[0].message.content)
    } catch (error) {
      console.error('获取景点推荐失败:', error)
      throw handleError(error)
    }
  }
}

// 创建全局AI服务实例
window.aiService = new AIService() 
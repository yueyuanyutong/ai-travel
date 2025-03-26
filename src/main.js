import './style.css'
import './utils/helpers.js'
import './services/auth.js'
import './services/api.js'
import './services/map.js'
import './services/ai.js'

// 创建路由实例
import { Router } from './router.js'

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 初始化路由
  window.router = new Router()
  
  // 检查用户登录状态
  if (!window.auth.isAuthenticated()) {
    window.router.navigate('/login')
  }
}) 
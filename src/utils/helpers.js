// 日期格式化
export function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 金额格式化
export function formatCurrency(amount) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount)
}

// 时间格式化
export function formatTime(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}小时${mins}分钟`
}

// 生成随机ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// 防抖函数
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 本地存储工具
export const storage = {
  get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  set(key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}

// 表单验证
export const validation = {
  email(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },
  password(password) {
    return password && password.length >= 6
  },
  phone(phone) {
    const re = /^1[3-9]\d{9}$/
    return re.test(phone)
  },
}

// 错误处理
export function handleError(error) {
  console.error('错误:', error)
  // 这里可以添加错误上报逻辑
  return {
    message: error.message || '操作失败，请稍后重试',
    code: error.code || 500,
  }
} 
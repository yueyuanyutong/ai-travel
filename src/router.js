import { createNavbar } from './components/navbar.js'

// 路由配置
const routes = {
  '/': 'home',
  '/plan': 'plan',
  '/booking': 'booking',
  '/profile': 'profile',
  '/login': 'login',
  '/register': 'register'
}

// 路由管理类
export class Router {
  constructor() {
    this.currentPage = 'home'
    this.init()
  }

  init() {
    // 监听路由变化
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname)
    })

    // 初始路由
    this.handleRoute(window.location.pathname)
  }

  handleRoute(path) {
    const page = routes[path] || 'home'
    this.currentPage = page
    this.renderPage(page)
  }

  navigate(path) {
    window.history.pushState({}, '', path)
    this.handleRoute(path)
  }

  renderPage(page) {
    const app = document.getElementById('app')
    
    // 只在登录和注册页面不显示导航栏
    if (page !== 'login' && page !== 'register') {
      app.innerHTML = createNavbar()
    }

    const content = document.createElement('div')
    app.appendChild(content)

    switch (page) {
      case 'home':
        this.renderHome(content)
        break
      case 'plan':
        this.renderPlan(content)
        break
      case 'booking':
        this.renderBooking(content)
        break
      case 'profile':
        this.renderProfile(content)
        break
      case 'login':
        this.renderLogin(app)
        break
      case 'register':
        this.renderRegister(app)
        break
    }
  }

  renderHome(app) {
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8">你想去哪里？</h1>
        
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input 
              type="text" 
              id="searchInput"
              placeholder="输入你的旅行需求，例如：预算5k，7月去海边"
              class="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
            >
            <button id="planButton" class="btn-primary absolute right-2 top-2">
              开始规划
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="card text-center cursor-pointer hover:shadow-lg transition-shadow" onclick="router.navigate('/plan')">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold mb-2">智能规划</h3>
            <p class="text-gray-600">AI助手帮你规划完美行程</p>
          </div>
          
          <div class="card text-center cursor-pointer hover:shadow-lg transition-shadow" onclick="router.navigate('/profile')">
            <div class="text-4xl mb-4">📋</div>
            <h3 class="text-xl font-semibold mb-2">我的行程</h3>
            <p class="text-gray-600">查看和管理你的旅行计划</p>
          </div>
          
          <div class="card text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">🆘</div>
            <h3 class="text-xl font-semibold mb-2">紧急帮助</h3>
            <p class="text-gray-600">24小时旅行支持服务</p>
          </div>
        </div>
      </div>
    `

    // 添加搜索按钮点击事件
    document.getElementById('planButton').addEventListener('click', async () => {
      const input = document.getElementById('searchInput').value.trim()
      if (!input) {
        alert('请输入旅行需求')
        return
      }

      try {
        // 显示加载状态
        const button = document.getElementById('planButton')
        button.disabled = true
        button.textContent = '规划中...'

        // 解析用户输入
        const params = await window.aiService.parseUserInput(input)
        
        // 生成行程
        const itinerary = await window.aiService.generateItinerary(params)
        
        // 存储行程数据
        window.localStorage.setItem('currentItinerary', JSON.stringify(itinerary))
        
        // 跳转到行程规划页面
        this.navigate('/plan')
      } catch (error) {
        alert(error.message)
        // 恢复按钮状态
        const button = document.getElementById('planButton')
        button.disabled = false
        button.textContent = '开始规划'
      }
    })
  }

  renderPlan(app) {
    // 获取当前行程数据
    const itinerary = JSON.parse(localStorage.getItem('currentItinerary') || '{}')
    const { days = [], budget = {} } = itinerary

    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">行程规划</h1>
          <button class="btn-secondary" onclick="router.navigate('/')">返回首页</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左侧时间轴 -->
          <div class="lg:col-span-2">
            <div class="card">
              <div class="space-y-4">
                ${days.map((day, index) => `
                  <div class="day-card" draggable="true">
                    <div class="flex items-center justify-between">
                      <h3 class="text-xl font-semibold">第${index + 1}天</h3>
                      <span class="text-gray-500">${day.date}</span>
                    </div>
                    <div class="mt-4 space-y-3">
                      ${day.spots.map(spot => `
                        <div class="flex items-center space-x-3">
                          <span class="text-2xl">📍</span>
                          <div>
                            <h4 class="font-medium">${spot.name}</h4>
                            <p class="text-sm text-gray-500">推荐游览时间：${spot.duration / 60}小时</p>
                            <p class="text-sm text-gray-500">${spot.description}</p>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 地图容器 -->
            <div class="card mt-8">
              <div id="map" class="w-full h-[400px] rounded-lg"></div>
            </div>
          </div>

          <!-- 右侧信息栏 -->
          <div class="space-y-6">
            <div class="card">
              <h3 class="text-xl font-semibold mb-4">预算概览</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>总预算</span>
                  <span class="font-medium">¥${budget.total || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span>住宿</span>
                  <span>¥${budget.accommodation || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span>交通</span>
                  <span>¥${budget.transportation || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span>餐饮</span>
                  <span>¥${budget.food || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span>活动</span>
                  <span>¥${budget.activities || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span>购物</span>
                  <span>¥${budget.shopping || 0}</span>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="text-xl font-semibold mb-4">行程操作</h3>
              <div class="space-y-2">
                <button id="printButton" class="w-full btn-primary mb-2">
                  打印行程
                </button>
                <button id="clearButton" class="w-full btn-secondary">
                  清除行程
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    // 初始化地图
    if (days.length > 0) {
      const spots = days.flatMap(day => day.spots)
      this.initMap(spots)
    }

    // 添加按钮事件监听器
    document.getElementById('printButton').addEventListener('click', () => {
      window.print()
    })

    document.getElementById('clearButton').addEventListener('click', () => {
      localStorage.removeItem('currentItinerary')
      this.navigate('/')
    })
  }

  // 初始化地图
  async initMap(spots) {
    try {
      await window.mapService.initMap('map')
      
      // 添加所有景点的标记
      spots.forEach(spot => {
        window.mapService.addMarker(spot.location.lat, spot.location.lng, spot.name)
      })

      // 如果有多个景点，规划路线
      if (spots.length > 1) {
        const waypoints = spots.map(spot => ({
          lat: spot.location.lat,
          lng: spot.location.lng
        }))
        window.mapService.planRoute(waypoints)
      }
    } catch (error) {
      console.error('初始化地图失败:', error)
    }
  }

  renderBooking(app) {
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">预订服务</h1>
          <button class="btn-secondary" onclick="router.navigate('/')">返回首页</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 酒店预订 -->
          <div class="card">
            <h3 class="text-xl font-semibold mb-4">酒店预订</h3>
            <div class="space-y-4">
              <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium">杭州西湖凯悦酒店</h4>
                  <span class="text-primary font-semibold">¥888/晚</span>
                </div>
                <p class="text-sm text-gray-500 mb-2">距离西湖步行5分钟</p>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="mr-4">⭐ 4.8</span>
                  <span>👍 98%好评</span>
                </div>
              </div>
              <button class="btn-primary w-full">立即预订</button>
            </div>
          </div>

          <!-- 机票预订 -->
          <div class="card">
            <h3 class="text-xl font-semibold mb-4">机票预订</h3>
            <div class="space-y-4">
              <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium">北京 → 杭州</h4>
                  <span class="text-primary font-semibold">¥680</span>
                </div>
                <p class="text-sm text-gray-500 mb-2">3月20日 08:30 - 10:30</p>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="mr-4">✈️ 直飞</span>
                  <span>🎫 经济舱</span>
                </div>
              </div>
              <button class="btn-primary w-full">立即预订</button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderProfile(app) {
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">个人中心</h1>
          <button class="btn-secondary" onclick="router.navigate('/')">返回首页</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 用户信息 -->
          <div class="card md:col-span-2">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h3 class="text-xl font-semibold">用户名</h3>
                <p class="text-gray-500">user@example.com</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input type="text" class="w-full px-4 py-2 border rounded-lg" value="用户名">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input type="email" class="w-full px-4 py-2 border rounded-lg" value="user@example.com">
              </div>
              <button class="btn-primary">保存修改</button>
            </div>
          </div>

          <!-- 我的行程 -->
          <div class="card">
            <h3 class="text-xl font-semibold mb-4">我的行程</h3>
            <div class="space-y-4">
              <div class="border rounded-lg p-4">
                <h4 class="font-medium">杭州之旅</h4>
                <p class="text-sm text-gray-500">3月20日 - 3月23日</p>
                <div class="mt-2">
                  <span class="text-sm bg-primary/10 text-primary px-2 py-1 rounded">进行中</span>
                </div>
              </div>
              <button class="btn-secondary w-full">查看所有行程</button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderLogin(app) {
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto">
          <div class="card">
            <h2 class="text-2xl font-bold text-center mb-6">登录</h2>
            <form id="loginForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
                >
              </div>
              <button type="submit" class="btn-primary w-full">
                登录
              </button>
            </form>
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600">
                还没有账号？
                <a href="#" onclick="router.navigate('/register')" class="text-primary hover:underline">
                  立即注册
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `

    // 添加表单提交事件
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      try {
        await window.auth.login(formData.get('email'), formData.get('password'))
        this.navigate('/')
      } catch (error) {
        alert(error.message)
      }
    })
  }

  renderRegister(app) {
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto">
          <div class="card">
            <h2 class="text-2xl font-bold text-center mb-6">注册</h2>
            <form id="registerForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input 
                  type="text" 
                  name="username"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
                >
              </div>
              <button type="submit" class="btn-primary w-full">
                注册
              </button>
            </form>
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600">
                已有账号？
                <a href="#" onclick="router.navigate('/login')" class="text-primary hover:underline">
                  立即登录
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `

    // 添加表单提交事件
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      if (formData.get('password') !== formData.get('confirmPassword')) {
        alert('两次输入的密码不一致')
        return
      }
      try {
        await window.auth.register({
          username: formData.get('username'),
          email: formData.get('email'),
          password: formData.get('password')
        })
        this.navigate('/')
      } catch (error) {
        alert(error.message)
      }
    })
  }
} 
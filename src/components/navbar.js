export function createNavbar() {
  const user = window.auth.getCurrentUser()
  
  return `
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <a href="/" class="text-xl font-bold text-primary" onclick="router.navigate('/'); return false;">
            AI旅行
          </a>

          <!-- 导航链接 -->
          <div class="hidden md:flex space-x-8">
            <a href="/" class="text-gray-700 hover:text-primary" onclick="router.navigate('/'); return false;">
              首页
            </a>
            <a href="/plan" class="text-gray-700 hover:text-primary" onclick="router.navigate('/plan'); return false;">
              行程规划
            </a>
            <a href="/booking" class="text-gray-700 hover:text-primary" onclick="router.navigate('/booking'); return false;">
              预订服务
            </a>
          </div>

          <!-- 用户菜单 -->
          <div class="relative">
            <button class="flex items-center space-x-2 text-gray-700 hover:text-primary">
              <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                ${user ? user.username.charAt(0).toUpperCase() : '👤'}
              </div>
              <span>${user ? user.username : '未登录'}</span>
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden">
              <a href="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" onclick="router.navigate('/profile'); return false;">
                个人资料
              </a>
              <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" onclick="window.auth.logout(); router.navigate('/login'); return false;">
                退出登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
} 
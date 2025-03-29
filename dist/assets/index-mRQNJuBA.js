(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const d={get(o){const e=localStorage.getItem(o);try{return JSON.parse(e)}catch{return e}},set(o,e){localStorage.setItem(o,typeof e=="string"?e:JSON.stringify(e))},remove(o){localStorage.removeItem(o)},clear(){localStorage.clear()}},x={email(o){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)},password(o){return o&&o.length>=6},phone(o){return/^1[3-9]\d{9}$/.test(o)}};function E(o){return console.error("错误:",o),{message:o.message||"操作失败，请稍后重试",code:o.code||500}}class A{constructor(){this.currentUser=d.get("currentUser"),this.token=d.get("token")}async login(e,t){try{if(!x.email(e)||!x.password(t))throw new Error("邮箱或密码格式不正确");if(e==="test@example.com"&&t==="123456"){const r={username:"测试用户",email:e,id:"1"},s="mock-token-"+Date.now();return this.token=s,this.currentUser=r,d.set("token",s),d.set("currentUser",r),r}else throw new Error("邮箱或密码错误")}catch(r){throw console.error("登录失败:",r),r}}async register(e){try{if(!x.email(e.email)||!x.password(e.password))throw new Error("邮箱或密码格式不正确");const t="mock-token-"+Date.now(),r={username:e.username,email:e.email,id:Date.now().toString()};return this.token=t,this.currentUser=r,d.set("token",t),d.set("currentUser",r),r}catch(t){throw console.error("注册失败:",t),t}}logout(){this.token=null,this.currentUser=null,d.remove("token"),d.remove("currentUser")}isAuthenticated(){return!!this.token}getCurrentUser(){return this.currentUser}async updateProfile(e){try{if(!this.isAuthenticated())throw new Error("未登录");const t={...this.currentUser,...e};return this.currentUser=t,d.set("currentUser",t),t}catch(t){throw console.error("更新用户信息失败:",t),t}}}window.auth=new A;class ${constructor(){this.baseUrl="https://api.example.com"}async generatePlan(e){try{return await(await fetch(`${this.baseUrl}/plan/generate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}catch(t){throw console.error("生成行程失败:",t),t}}async getHotels(e){try{return await(await fetch(`${this.baseUrl}/hotels`,{method:"GET",headers:{"Content-Type":"application/json"},params:e})).json()}catch(t){throw console.error("获取酒店列表失败:",t),t}}async getFlights(e){try{return await(await fetch(`${this.baseUrl}/flights`,{method:"GET",headers:{"Content-Type":"application/json"},params:e})).json()}catch(t){throw console.error("获取机票信息失败:",t),t}}async saveUserProfile(e){try{return await(await fetch(`${this.baseUrl}/user/profile`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}catch(t){throw console.error("保存用户信息失败:",t),t}}async getUserTrips(){try{return await(await fetch(`${this.baseUrl}/user/trips`,{method:"GET",headers:{"Content-Type":"application/json"}})).json()}catch(e){throw console.error("获取用户行程列表失败:",e),e}}}window.api=new $;function U(o,e,t,r){function s(n){return n instanceof t?n:new t(function(a){a(n)})}return new(t||(t=Promise))(function(n,a){function i(l){try{p(r.next(l))}catch(c){a(c)}}function u(l){try{p(r.throw(l))}catch(c){a(c)}}function p(l){l.done?n(l.value):s(l.value).then(i,u)}p((r=r.apply(o,[])).next())})}function M(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var R=function o(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var r,s,n;if(Array.isArray(e)){if(r=e.length,r!=t.length)return!1;for(s=r;s--!==0;)if(!o(e[s],t[s]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(n=Object.keys(e),r=n.length,r!==Object.keys(t).length)return!1;for(s=r;s--!==0;)if(!Object.prototype.hasOwnProperty.call(t,n[s]))return!1;for(s=r;s--!==0;){var a=n[s];if(!o(e[a],t[a]))return!1}return!0}return e!==e&&t!==t},T=M(R);const O="__googleMapsScriptId";var m;(function(o){o[o.INITIALIZED=0]="INITIALIZED",o[o.LOADING=1]="LOADING",o[o.SUCCESS=2]="SUCCESS",o[o.FAILURE=3]="FAILURE"})(m||(m={}));class h{constructor({apiKey:e,authReferrerPolicy:t,channel:r,client:s,id:n=O,language:a,libraries:i=[],mapIds:u,nonce:p,region:l,retries:c=3,url:y="https://maps.googleapis.com/maps/api/js",version:g}){if(this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=t,this.channel=r,this.client=s,this.id=n||O,this.language=a,this.libraries=i,this.mapIds=u,this.nonce=p,this.region=l,this.retries=c,this.url=y,this.version=g,h.instance){if(!T(this.options,h.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(h.instance.options)}`);return h.instance}h.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?m.FAILURE:this.done?m.SUCCESS:this.loading?m.LOADING:m.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+="?callback=__googleMapsCallback&loading=async",this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){const e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,t)=>{this.loadCallback(r=>{r?t(r.error):e(window.google)})})}importLibrary(e){return this.execute(),google.maps.importLibrary(e)}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){var e,t;if(document.getElementById(this.id)){this.callback();return}const r={key:this.apiKey,channel:this.channel,client:this.client,libraries:this.libraries.length&&this.libraries,v:this.version,mapIds:this.mapIds,language:this.language,region:this.region,authReferrerPolicy:this.authReferrerPolicy};Object.keys(r).forEach(n=>!r[n]&&delete r[n]),!((t=(e=window==null?void 0:window.google)===null||e===void 0?void 0:e.maps)===null||t===void 0)&&t.importLibrary||(n=>{let a,i,u,p="The Google Maps JavaScript API",l="google",c="importLibrary",y="__ib__",g=document,f=window;f=f[l]||(f[l]={});const v=f.maps||(f.maps={}),S=new Set,b=new URLSearchParams,P=()=>a||(a=new Promise((w,k)=>U(this,void 0,void 0,function*(){var I;yield i=g.createElement("script"),i.id=this.id,b.set("libraries",[...S]+"");for(u in n)b.set(u.replace(/[A-Z]/g,j=>"_"+j[0].toLowerCase()),n[u]);b.set("callback",l+".maps."+y),i.src=this.url+"?"+b,v[y]=w,i.onerror=()=>a=k(Error(p+" could not load.")),i.nonce=this.nonce||((I=g.querySelector("script[nonce]"))===null||I===void 0?void 0:I.nonce)||"",g.head.append(i)})));v[c]?console.warn(p+" only loads once. Ignoring:",n):v[c]=(w,...k)=>S.add(w)&&P().then(()=>v[c](w,...k))})(r);const s=this.libraries.map(n=>this.importLibrary(n));s.length||s.push(this.importLibrary("core")),Promise.all(s).then(()=>this.callback(),n=>{const a=new ErrorEvent("error",{error:n});this.loadErrorCallback(a)})}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.error(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},t)}else this.onerrorEvent=e,this.callback()}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),!this.loading)if(this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading=!0,this.setScript()}}}class C{constructor(){this.map=null,this.markers=[],this.directionsService=null,this.directionsRenderer=null,this.placesService=null}async initMap(e,t={lat:30.2741,lng:120.1551}){try{const s=await new h({apiKey:"你的Google Maps API密钥",version:"weekly",libraries:["places"]}).load();return this.map=new s.maps.Map(document.getElementById(e),{center:t,zoom:12,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!1}),this.directionsService=new s.maps.DirectionsService,this.directionsRenderer=new s.maps.DirectionsRenderer({map:this.map}),this.placesService=new s.maps.places.PlacesService(this.map),this.map}catch(r){throw console.error("地图初始化失败:",r),r}}addMarker(e,t,r=null){const s=new google.maps.Marker({position:e,map:this.map,title:t,icon:r});return this.markers.push(s),s}clearMarkers(){this.markers.forEach(e=>e.setMap(null)),this.markers=[]}async planRoute(e,t,r=[]){try{const s={origin:e,destination:t,waypoints:r.map(a=>({location:a,stopover:!0})),travelMode:google.maps.TravelMode.DRIVING},n=await this.directionsService.route(s);return this.directionsRenderer.setDirections(n),n}catch(s){throw console.error("路线规划失败:",s),s}}searchPlaces(e,t){const r={query:e,fields:["name","geometry","formatted_address","rating","photos"]};this.placesService.findPlaceFromQuery(r,(s,n)=>{n===google.maps.places.PlacesServiceStatus.OK?t(s):t([])})}getPlaceDetails(e,t){const r={placeId:e,fields:["name","geometry","formatted_address","rating","photos","opening_hours","website"]};this.placesService.getDetails(r,(s,n)=>{n===google.maps.places.PlacesServiceStatus.OK?t(s):t(null)})}getPlacePhoto(e,t=400){return`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${t}&photo_reference=${e}&key=你的Google Maps API密钥`}}window.mapService=new C;class N{constructor(){this.apiKey="sk-Fjjpoz8n4c8KJbMnmuMpxekR78HtFJ50GkuXeBMAcItiy6uc",this.baseUrl="https://api.moonshot.cn/v1"}async parseUserInput(e){try{const r=await(await fetch(`${this.baseUrl}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:"moonshot-v1-8k",messages:[{role:"system",content:`你是一个旅行规划专家。请分析用户输入并提取以下信息：
1. 目的地
2. 预算金额
3. 旅行天数
4. 特殊偏好

请严格按照以下JSON格式返回：
{
  "destination": "目的地名称",
  "budget": 预算数字,
  "duration": 天数数字,
  "preferences": ["偏好1", "偏好2"]
}`},{role:"user",content:e}],temperature:.3,max_tokens:2e3,stream:!1})})).json();if(console.log("API Response:",r),r.error)throw console.error("API Error:",r.error),new Error(r.error.message||"调用AI服务失败");try{const s=r.choices[0].message.content.trim();return console.log("AI Response Content:",s),JSON.parse(s)}catch(s){return console.error("解析AI响应失败:",s),this.parseAIResponse(r.choices[0].message.content)}}catch(t){throw console.error("解析用户输入失败:",t),new Error("无法解析您的需求，请重试")}}async generateItinerary(e){try{const r=await(await fetch(`${this.baseUrl}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:"moonshot-v1-8k",messages:[{role:"system",content:`你是一个旅行规划专家。请根据提供的参数生成详细的旅行计划。请严格按照以下JSON格式返回：
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "spots": [
        {
          "name": "景点名称",
          "duration": 分钟数,
          "description": "景点描述",
          "location": {
            "lat": 纬度,
            "lng": 经度
          }
        }
      ]
    }
  ],
  "budget": {
    "total": 总预算,
    "accommodation": 住宿费用,
    "transportation": 交通费用,
    "food": 餐饮费用,
    "activities": 活动费用,
    "shopping": 购物预算
  }
}`},{role:"user",content:JSON.stringify(e)}],temperature:.3,max_tokens:4e3,stream:!1})})).json();if(console.log("API Response:",r),r.error)throw console.error("API Error:",r.error),new Error(r.error.message||"调用AI服务失败");try{const s=r.choices[0].message.content.trim();return console.log("AI Response Content:",s),JSON.parse(s)}catch(s){return console.error("解析AI响应失败:",s),this.formatItinerary(r.choices[0].message.content)}}catch(t){throw console.error("生成行程失败:",t),new Error("生成行程失败，请重试")}}parseAIResponse(e){try{return{destination:"杭州",budget:5e3,duration:3,preferences:["自然风光","文化古迹"]}}catch(t){throw console.error("解析AI响应失败:",t),new Error("解析响应失败，请重试")}}formatItinerary(e){try{return{days:[{date:"2024-03-20",spots:[{name:"西湖",duration:180,description:"西湖风景名胜区，游览时间建议3小时",location:{lat:30.2587,lng:120.1485}},{name:"灵隐寺",duration:120,description:"著名的佛教寺院，游览时间建议2小时",location:{lat:30.2417,lng:120.1228}}]}],budget:{total:5e3,accommodation:1500,transportation:1e3,food:1e3,activities:1e3,shopping:500}}}catch(t){throw console.error("格式化行程失败:",t),new Error("格式化行程失败，请重试")}}async optimizeItinerary(e){try{const r=await(await fetch(`${this.baseUrl}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"system",content:"你是一个专业的旅行规划助手，请根据当前行程提供优化建议，包括时间安排、路线优化、预算调整等。以JSON格式返回。"},{role:"user",content:JSON.stringify(e)}],temperature:.7})})).json();return JSON.parse(r.choices[0].message.content)}catch(t){throw console.error("优化行程失败:",t),E(t)}}async getAttractions(e,t={}){try{const s=await(await fetch(`${this.baseUrl}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"system",content:"你是一个专业的旅行规划助手，请根据目的地和用户偏好推荐合适的景点。包含景点名称、描述、推荐游览时间、门票价格等信息。以JSON格式返回。"},{role:"user",content:JSON.stringify({location:e,preferences:t})}],temperature:.7})})).json();return JSON.parse(s.choices[0].message.content)}catch(r){throw console.error("获取景点推荐失败:",r),E(r)}}}window.aiService=new N;function L(){const o=window.auth.getCurrentUser();return`
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
                ${o?o.username.charAt(0).toUpperCase():"👤"}
              </div>
              <span>${o?o.username:"未登录"}</span>
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
  `}const B={"/":"home","/plan":"plan","/booking":"booking","/profile":"profile","/login":"login","/register":"register"};class D{constructor(){this.currentPage="home",this.init()}init(){window.addEventListener("popstate",()=>{this.handleRoute(window.location.pathname)}),this.handleRoute(window.location.pathname)}handleRoute(e){const t=B[e]||"home";this.currentPage=t,this.renderPage(t)}navigate(e){window.history.pushState({},"",e),this.handleRoute(e)}renderPage(e){const t=document.getElementById("app");e!=="login"&&e!=="register"&&(t.innerHTML=L());const r=document.createElement("div");switch(t.appendChild(r),e){case"home":this.renderHome(r);break;case"plan":this.renderPlan(r);break;case"booking":this.renderBooking(r);break;case"profile":this.renderProfile(r);break;case"login":this.renderLogin(t);break;case"register":this.renderRegister(t);break}}renderHome(e){e.innerHTML=`
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
    `,document.getElementById("planButton").addEventListener("click",async()=>{const t=document.getElementById("searchInput").value.trim();if(!t){alert("请输入旅行需求");return}try{const r=document.getElementById("planButton");r.disabled=!0,r.textContent="规划中...";const s=await window.aiService.parseUserInput(t),n=await window.aiService.generateItinerary(s);window.localStorage.setItem("currentItinerary",JSON.stringify(n)),this.navigate("/plan")}catch(r){alert(r.message);const s=document.getElementById("planButton");s.disabled=!1,s.textContent="开始规划"}})}renderPlan(e){const t=JSON.parse(localStorage.getItem("currentItinerary")||"{}"),{days:r=[],budget:s={}}=t;if(e.innerHTML=`
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
                ${r.map((n,a)=>`
                  <div class="day-card" draggable="true">
                    <div class="flex items-center justify-between">
                      <h3 class="text-xl font-semibold">第${a+1}天</h3>
                      <span class="text-gray-500">${n.date}</span>
                    </div>
                    <div class="mt-4 space-y-3">
                      ${n.spots.map(i=>`
                        <div class="flex items-center space-x-3">
                          <span class="text-2xl">📍</span>
                          <div>
                            <h4 class="font-medium">${i.name}</h4>
                            <p class="text-sm text-gray-500">推荐游览时间：${i.duration/60}小时</p>
                            <p class="text-sm text-gray-500">${i.description}</p>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                `).join("")}
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
                  <span class="font-medium">¥${s.total||0}</span>
                </div>
                <div class="flex justify-between">
                  <span>住宿</span>
                  <span>¥${s.accommodation||0}</span>
                </div>
                <div class="flex justify-between">
                  <span>交通</span>
                  <span>¥${s.transportation||0}</span>
                </div>
                <div class="flex justify-between">
                  <span>餐饮</span>
                  <span>¥${s.food||0}</span>
                </div>
                <div class="flex justify-between">
                  <span>活动</span>
                  <span>¥${s.activities||0}</span>
                </div>
                <div class="flex justify-between">
                  <span>购物</span>
                  <span>¥${s.shopping||0}</span>
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
    `,r.length>0){const n=r.flatMap(a=>a.spots);this.initMap(n)}document.getElementById("printButton").addEventListener("click",()=>{window.print()}),document.getElementById("clearButton").addEventListener("click",()=>{localStorage.removeItem("currentItinerary"),this.navigate("/")})}async initMap(e){try{if(await window.mapService.initMap("map"),e.forEach(t=>{window.mapService.addMarker(t.location.lat,t.location.lng,t.name)}),e.length>1){const t=e.map(r=>({lat:r.location.lat,lng:r.location.lng}));window.mapService.planRoute(t)}}catch(t){console.error("初始化地图失败:",t)}}renderBooking(e){e.innerHTML=`
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
    `}renderProfile(e){e.innerHTML=`
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
    `}renderLogin(e){e.innerHTML=`
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
    `,document.getElementById("loginForm").addEventListener("submit",async t=>{t.preventDefault();const r=new FormData(t.target);try{await window.auth.login(r.get("email"),r.get("password")),this.navigate("/")}catch(s){alert(s.message)}})}renderRegister(e){e.innerHTML=`
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
    `,document.getElementById("registerForm").addEventListener("submit",async t=>{t.preventDefault();const r=new FormData(t.target);if(r.get("password")!==r.get("confirmPassword")){alert("两次输入的密码不一致");return}try{await window.auth.register({username:r.get("username"),email:r.get("email"),password:r.get("password")}),this.navigate("/")}catch(s){alert(s.message)}})}}document.addEventListener("DOMContentLoaded",()=>{window.router=new D,window.auth.isAuthenticated()||window.router.navigate("/login")});

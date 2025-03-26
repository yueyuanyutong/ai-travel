import { Loader } from '@googlemaps/js-api-loader'

class MapService {
  constructor() {
    this.map = null
    this.markers = []
    this.directionsService = null
    this.directionsRenderer = null
    this.placesService = null
  }

  // 初始化地图
  async initMap(elementId, center = { lat: 30.2741, lng: 120.1551 }) {
    try {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      })

      const google = await loader.load()
      
      this.map = new google.maps.Map(document.getElementById(elementId), {
        center,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })

      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map
      })

      this.placesService = new google.maps.places.PlacesService(this.map)

      return this.map
    } catch (error) {
      console.error('地图初始化失败:', error)
      throw error
    }
  }

  // 添加标记
  addMarker(position, title, icon = null) {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      title,
      icon
    })

    this.markers.push(marker)
    return marker
  }

  // 清除所有标记
  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null))
    this.markers = []
  }

  // 规划路线
  async planRoute(origin, destination, waypoints = []) {
    try {
      const request = {
        origin,
        destination,
        waypoints: waypoints.map(point => ({
          location: point,
          stopover: true
        })),
        travelMode: google.maps.TravelMode.DRIVING
      }

      const result = await this.directionsService.route(request)
      this.directionsRenderer.setDirections(result)
      return result
    } catch (error) {
      console.error('路线规划失败:', error)
      throw error
    }
  }

  // 搜索地点
  searchPlaces(query, callback) {
    const request = {
      query,
      fields: ['name', 'geometry', 'formatted_address', 'rating', 'photos']
    }

    this.placesService.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(results)
      } else {
        callback([])
      }
    })
  }

  // 获取地点详情
  getPlaceDetails(placeId, callback) {
    const request = {
      placeId,
      fields: ['name', 'geometry', 'formatted_address', 'rating', 'photos', 'opening_hours', 'website']
    }

    this.placesService.getDetails(request, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(result)
      } else {
        callback(null)
      }
    })
  }

  // 获取地点照片
  getPlacePhoto(photoReference, maxWidth = 400) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
  }
}

// 创建全局地图服务实例
window.mapService = new MapService() 
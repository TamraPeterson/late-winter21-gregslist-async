import { ProxyState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { House } from "../Models/House.js"
import { api } from "./AxiosService.js"
class HousesService {

  async editHouse(updatedHouse, id) {
    const res = await api.put('houses/' + id, updatedHouse)
    console.log(res.data)
    const houseIndex = ProxyState.houses.findIndex(h => h.id == id)
    ProxyState.houses.splice(houseIndex, 1, new Car(res.data))
    ProxyState.houses = ProxyState.houses
  }
  async getAllHouses() {
    const res = await api.get('houses')
    console.log('house service getAllHouses')
    ProxyState.houses = res.data.map(rd => new House(rd))
  }

  async createHouse(newHouse) {
    const res = await api.post('houses', newHouse)
    console.log(res.data)
    let realHouse = new House(res.data)
    ProxyState.houses = [realHouse, ...ProxyState.houses]
  }

  async deleteHouse(houseId) {
    console.log('service deleting house', houseId)
    const res = await api.delete(`houses/${houseId}`)
    console.log('housesservice delete car', res.data)
    ProxyState.houses = ProxyState.houses.filter(h => h.id != houseId)
  }
}

export const housesService = new HousesService()
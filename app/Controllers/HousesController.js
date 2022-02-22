import { ProxyState } from "../AppState.js"
import { Pop } from "../Utils/Pop.js"
import { housesService } from "../Services/HousesService.js"
import { getHouseForm } from "../Components/HouseForm.js"

function _draw() {
  let template = ''
  ProxyState.houses.forEach(h => template += h.Template)
  document.getElementById('listings').innerHTML = template
}


export class HousesController {
  constructor() {
    ProxyState.on('houses', _draw)
  }

  async viewHouses() {
    try {
      await housesService.getAllHouses()
      document.getElementById('modal-body-slot').innerHTML = getHouseForm()
      console.log('view houses at controller success')
      document.getElementById('create-button').classList.remove('visually-hidden')
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  async handleSubmit(id) {

    try {
      window.event.preventDefault()
      let form = window.event.target
      let rawData = {
        bedrooms: form.bedrooms.value,
        bathrooms: form.bathrooms.value,
        levels: form.levels.value,
        year: form.year.value,
        price: form.price.value,
        imgUrl: form.imgUrl.value,
        description: form.description.value
      }
      if (!id) {
        housesService.createHouse(rawData)
      } else {
        housesService.editHouse(rawData, id)
      }
      let modal = document.getElementById('new-listing')
      bootstrap.Modal.getOrCreateInstance(modal).hide()
      Pop.toast('Complete')
    }
    catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  async deleteHouse(houseId) {
    try {
      if (await Pop.confirm()) {
        await housesService.deleteHouse(houseId)
      }
    } catch (error) {
      Pop.error(error)
    }
  }

  editHouse(houseId) {
    const house = ProxyState.houses.find(h => h.id == houseId)
    document.getElementById('modal-body-slot').innerHTML = getHouseForm(house)
    let modal = document.getElementById('new-listing')
    bootstrap.Modal.getOrCreateInstance(modal).toggle()
  }
}
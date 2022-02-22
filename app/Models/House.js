export class House {
  constructor({ bedrooms, bathrooms, levels, year, price, imgUrl, description, id }) {
    this.id = id || ''
    this.bedrooms = bedrooms || ''
    this.bathrooms = bathrooms || ''
    this.levels = levels || 1
    this.year = year || 2000
    this.price = price || 0
    this.imgUrl = imgUrl || ''
    this.description = description || ''
  }

  get Template() {
    return `
    <div class="col-md-4">
        <div class="bg-white rounded shadow">
          <img class="object-fit-img rounded-top" src="${this.imgUrl}" alt="house image">
          <div class="p-3 clip-text">
            <p>${this.year} | ${this.bedrooms} bedrooms | ${this.bathrooms} bathrooms </p>
            <p></p>
            <p>${this.description}</p>
            <p>$${this.price}</p>
           
            <div class="text-end">
            <button class="btn btn-outline-warning" onclick="app.housesController.editHouse('${this.id}')"> Edit </button>
            <button class="btn btn-outline-danger" onclick="app.housesController.deleteHouse('${this.id}')"> delete </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
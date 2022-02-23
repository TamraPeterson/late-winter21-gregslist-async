export class Job {
  constructor({ company, jobTitle, description, hours, rate, id }) {
    this.id = id || ''
    this.company = company || ''
    this.jobTitle = jobTitle || ''
    this.description = description || ''
    this.hours = hours || 10
    this.rate = rate || 10
  }

  get Template() {
    return `
    <div class="col-md-3 bg-light shadow m-1">
      <div class="p-3 ">
        <p>${this.company} | ${this.jobTitle} | ${this.hours} hours </p>
        <p></p>
        <p>${this.description}</p>
        <p>$${this.rate}</p>
        <div class="text-end">
        <button class="btn btn-outline-warning" onclick="app.jobsController.editJob('${this.id}')"> Edit </button>
        <button class="btn btn-outline-danger" onclick="app.jobsController.deleteJob('${this.id}')"> delete </button>
        </div>
      </div>
    </div>
  </div>
    `
  }
}
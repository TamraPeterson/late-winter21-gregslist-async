import { ProxyState } from "../AppState.js"
import { Pop } from "../Utils/Pop.js"
import { jobsService } from "../Services/JobsService.js"
import { getJobForm } from "../Components/JobForm.js"
import { carsService } from "../Services/CarsService.js"



function _draw() {
  let template = ''
  ProxyState.jobs.forEach(j => template += j.Template)
  document.getElementById('listings').innerHTML = template
}

export class JobsController {
  constructor() {
    ProxyState.on('jobs', _draw)
    console.log('jobscontroller loaded')
  }

  async viewJobs() {
    try {
      await jobsService.getAllJobs()
      document.getElementById('modal-body-slot').innerHTML = getJobForm()
      console.log('viewjobs at controller')
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
        company: form.company.value,
        jobTitle: form.jobTitle.value,
        description: form.description.value,
        hours: form.hours.value,
        rate: form.rate.value
      }
      if (!id) {
        jobsService.createJob(rawData)
      } else {
        jobsService.editJob(rawData, id)
      }
      let modal = document.getElementById('new-listing')
      form.reset()
      bootstrap.Modal.getOrCreateInstance(modal).hide()
      Pop.toast('Complete')
    }
    catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  async deleteJob(jobId) {
    try {
      if (await Pop.confirm()) {
        await jobsService.deleteJob(jobId)
      }
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  editJob(jobId) {
    const job = ProxyState.jobs.find(j => j.id == jobId)
    document.getElementById('modal-body-slot').innerHTML = getJobForm(job)
    let modal = document.getElementById('new-listing')
    bootstrap.Modal.getOrCreateInstance(modal).toggle()
  }
}
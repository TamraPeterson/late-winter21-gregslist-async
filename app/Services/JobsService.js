import { ProxyState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Job } from "../Models/Job.js"


class JobsService {


  async getAllJobs() {
    const res = await api.get('jobs')
    console.log(res, 'at jobsservice getalljobs')
    ProxyState.jobs = res.data.map(rd => new Job(rd))
  }

  async createJob(newJob) {
    const res = await api.post('jobs', newJob)
    console.log(res.data)
    let realJob = new Job(res.data)
    ProxyState.jobs = [realJob, ...ProxyState.jobs]
  }

  async deleteJob(jobId) {
    const res = await api.delete(`jobs/${jobId}`)
    ProxyState.jobs = ProxyState.jobs.filter(j => j.id != jobId)
  }

  async editJob(updatedJob, id) {
    const res = await api.put('jobs/' + id, updatedJob)
    console.log(res.data)
    const jobIndex = ProxyState.jobs.findIndex(j => j.id == id)
    ProxyState.jobs.splice(jobIndex, 1, new Job(res.data))
    ProxyState.jobs = ProxyState.jobs
  }
}


export const jobsService = new JobsService()
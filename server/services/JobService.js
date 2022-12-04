import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class JobService {
    async getAllJobs(query) {
        const jobs = await dbContext.Jobs.find(query)
        return jobs
    }
    async getJobById(id) {
        const job = await dbContext.Jobs.findById(id)
        if(!job){
            throw new BadRequest('Job not found at this id')
        }
        return job
    }
    async createJob(jobData) {
        const newJob = await dbContext.Jobs.create(jobData)
        return newJob
    }
    async updateJob(id, jobData) {
        const original = await dbContext.Jobs.findById(id)
        if(!original) throw new BadRequest('no job at id ' + id)
        original.jobTitle = jobData.jobTitle ? jobData.jobTitle : original.jobTitle
        original.company = jobData.company ? jobData.company : original.company
        original.rate = jobData.rate !== undefined ? jobData.rate : original.rate
        original.hours = jobData.hours !== undefined ? jobData.hours : original.hours
        original.description = jobData.description ? jobData.description : original.jobDescription

        await original.save()
        return original
    }
    async removeJob(id) {
        const job = await dbContext.Jobs.findById(id)
        if(!job) throw new BadRequest ('no job at id ' + id)
        await job.remove()
        return 'deleted job'
    }
}
export const jobService = new JobService()
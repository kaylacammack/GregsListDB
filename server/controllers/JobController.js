import { jobService } from "../services/JobService.js";
import BaseController from "../utils/BaseController";

export class JobController extends BaseController {
    constructor() {
        super('api/jobs')
        this.router
            .get('', this.getAllJobs)
            .get('/:id', this.getJobById)
            .post('', this.createJob)
            .put('/:id', this.updateJob)
            .delete('/:id', this.removeJob)
    }
    async getAllJobs (req, res, next) {
        try {
            const query = req.query
            const jobs = await jobService.getAllJobs(query)
            return res.send(jobs)
        } catch (error) {
            next(error)
        }
    }
    async getJobById(req, res, next) {
        try {
            const job = await jobService.getJobById(req.params.id)
            return res.send(job)
        } catch (error) {
            next(error)
        }
    }
    async createJob(req, res, next) {
        try {
            const job = await jobService.createJob(req.body)
            return res.send(job)
        } catch (error) {
            next(error)
        }
    }
    async updateJob(req, res, next) {
        try {
            const updated = await jobService.updateJob(req.params.id, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
    async removeJob(req, res, next) {
        try {
            const message = await jobService.removeJob(req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}
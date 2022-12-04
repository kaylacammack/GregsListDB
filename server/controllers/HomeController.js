import { homeService } from "../services/HomeService.js";
import BaseController from "../utils/BaseController.js";

export class HomeController extends BaseController {
    constructor() {
        super('api/homes')
        this.router
            .get('', this.getAllHomes)
            .get('/:id', this.getHomeById)
            .post('', this.createHome)
            .put('/:id', this.updateHome)
            .delete('/:id', this.removeHome)
    }
    async getAllHomes(req, res, next) {
        try {
            const query = req.query
            const homes = await homeService.getAllHomes(query)
            return res.send(homes)
        } catch (error) {
            next(error)
        }
    }
    async getHomeById(req, res, next) {
        try {
            const home = await homeService.getHomeById(req.params.id)
            return res.send(home)
        } catch (error) {
            next(error)
        }
    }
    async createHome(req, res, next) {
        try {
            const home = await homeService.createHome(req.body)
            return res.send(home)
        } catch (error) {
            next(error)
        }
    }
    async updateHome(req, res, next) {
        try {
            const updated = await homeService.updateHome(req.params.id, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
    async removeHome(req, res, next) {
        try {
            const message = await homeService.removeHome(req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}
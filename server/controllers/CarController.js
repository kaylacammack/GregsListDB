import { carService } from "../services/CarService.js";
import BaseController from "../utils/BaseController.js";

export class CarController extends BaseController {
    constructor() {
        super('api/cars')
        this.router
            .get('', this.getAllCars)
            .get('/:id', this.getCarById)
            .post('', this.createCar)
            .put('/:id', this.updateCar)
            .delete('/:id', this.removeCar)
    }
    async getAllCars(req, res, next) {
        try {
            const query = req.query
            const cars = await carService.getAllCars(query)
            return res.send(cars)
        } catch (error) {
            next(error)
        }
    }
    async getCarById(req, res, next) {
        try {
            const car = await carService.getCarById(req.params.id)
            return res.send(car)
        } catch (error) {
            next(error)
        }
    }
    async createCar(req, res, next) {
        try {
            const car = await carService.createCar(req.body)
            return res.send(car)
        } catch (error) {
            next(error)
        }
    }
    async updateCar(req, res, next) {
        try {
            const updated = await carService.updateCar(req.params.id, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
    async removeCar(req, res, next) {
        try {
            const message = await carService.removeCar(req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}
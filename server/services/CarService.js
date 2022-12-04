import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CarService {
    async getAllCars(query) {
        const cars = await dbContext.Cars.find(query)
        return cars
    }
    async getCarById(id) {
        const car = await dbContext.Cars.findById(id)
        if(!car){
            throw new BadRequest('Car not found at this id')
        }
        return car
    }
    async createCar(carData) {
        const newCar = await dbContext.Cars.create(carData)
        return newCar
    }
    async updateCar(id, carData) {
        const original = await dbContext.Cars.findById(id)
        if(!original) throw new BadRequest ('no car at id: ' + id)
        original.make = carData.make ? carData.make : original.make
        original.model = carData.model ? carData.model : original.model
        original.year = carData.year !== undefined ? carData.year : original.year
        original.description = carData.description ? carData.description : original.description
        original.imgUrl = carData.imgUrl ? carData.imgUrl : original.imgUrl
        original.color = carData.color ? carData.color : original.color
        original.price = carData.price !== undefined ? carData.price : original.price

        await original.save()
        return original
    }
    async removeCar(id) {
        const car = await dbContext.Cars.findById(id)
        if (!car) throw new BadRequest ('no car at id ' + id)
        await car.remove()
        return `deleted ${car.make} ${car.model}`
    }
}
export const carService = new CarService()
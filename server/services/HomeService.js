import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class HomeService {
    async getAllHomes(query) {
        const homes = await dbContext.Homes.find(query)
        return homes
    }
    async getHomeById(id) {
        const home = await dbContext.Homes.findById(id)
        if(!home) {
            throw new BadRequest('Home not found at this id')
        }
        return home
    }
    async createHome(homeData) {
        const newHome = await dbContext.Homes.create(homeData)
        return newHome
    }
    async updateHome(id, homeData) {
        const original = await dbContext.Homes.findById(id)
        if(!original) throw new BadRequest ('no home at id ' + id)
        original.bedrooms = homeData.bedrooms !== undefined ? homeData.bedrooms : original.bedrooms
        original.bathrooms = homeData.bathrooms !== undefined ? homeData.bathrooms : original.bathrooms
        original.imgUrl = homeData.imgUrl ? homeData.imgUrl : original.imgUrl
        original.year = homeData.year !== undefined ? homeData.year : original.year
        original.price = homeData.price !== undefined ? homeData.price : original.price
        original.description = homeData.description ? homeData.description : original.description

        await original.save()
        return original
    }
    async removeHome(id) {
        const home = await dbContext.Homes.findById(id)
        if(!home) throw new BadRequest ('no home at id ' + id)
        await home.remove()
        return 'deleted home'
    }
}
export const homeService = new HomeService()
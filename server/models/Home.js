import { Schema } from "mongoose";

export const HomeSchema = new Schema({
    bedrooms: { type: Number, Required: true },
    bathrooms: { type: Number, Required: true },
    imgUrl: { type: String, Required: true },
    year: { type: Number, Required: true },
    price: { type: Number, Required: true },
    description: { type: String, Required: true }
}, { timestamps: true, toJSON: { virtuals: true} })
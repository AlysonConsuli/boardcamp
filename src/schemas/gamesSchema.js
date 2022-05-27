import joi from "joi";

export const gamesSchema = joi.object({
    name: joi.string().required(),
    stockTotal: joi.number().required().positive(),
    pricePerDay: joi.number().required().positive()
})
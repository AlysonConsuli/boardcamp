import db from "../db.js"
import { categoriesSchema } from "../schemas/categoriesSchema.js"

export const categoriesMiddleware = async (req, res, next) => {
    const { name } = req.body
    const validation = categoriesSchema.validate({ name }, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(400)
    }
    try {
        const conflictName = await db.query('SELECT name FROM categories WHERE name = $1', [name])
        if (conflictName.rows[0]?.name) {
            return res.sendStatus(409)
        }
        next()
    } catch {
        res.sendStatus(500);
    }
}
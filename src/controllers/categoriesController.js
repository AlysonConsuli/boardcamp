import db from "../db.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await db.query('SELECT * FROM categories')
        res.send(categories.rows)
    } catch {
        res.sendStatus(500)
    }
}
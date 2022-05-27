import db from "../db.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await db.query('SELECT * FROM categories')
        res.send(categories.rows)
    } catch {
        res.sendStatus(500)
    }
}

export const postCategory = async (req, res) => {
    const { name } = req.body
    try {
        const category = await db.query('INSERT INTO categories (name) VALUES ($1)', [name])
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}
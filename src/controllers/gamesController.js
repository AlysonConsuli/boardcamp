import db from "../db.js";

export const getGames = async (req, res) => {
    try {
        const name = req.query.name?.toLowerCase()
        if (name) {
            const gamesName = await db.query(`
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories ON games."categoryId" = categories.id
            WHERE LOWER (games.name) LIKE $1`, [`${name}%`])
            return res.send(gamesName.rows)
        }
        const games = await db.query(`
        SELECT games.*, categories.name as "categoryName" FROM games 
        JOIN categories ON games."categoryId" = categories.id
        `)
        res.send(games.rows)
    } catch {
        res.sendStatus(500)
    }
}

export const postGame = async (req, res) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body
    try {
        const game = await db.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}
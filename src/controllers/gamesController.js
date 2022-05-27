import db from "../db.js";

export const getGames = async (req, res) => {
    try {
        const games = await db.query(`
        SELECT games.*, categories.name as "categoryName" FROM games 
        JOIN categories ON games."categoryId" = categories.id
        `)
        res.send(games.rows)
    } catch {
        res.sendStatus(500)
    }
}
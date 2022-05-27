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
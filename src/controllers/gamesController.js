import db from "../db.js";

export const getGames = async (req, res) => {
    try {
        const games = await db.query('SELECT * FROM games')
        res.send(games.rows)
    } catch {
        res.sendStatus(500)
    }
}
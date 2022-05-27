import db from "../db.js";

export const getRentals = async (req, res) => {
    try {
        const rentals = await db.query('SELECT * FROM rentals')
        res.send(rentals.rows)
    } catch {
        res.sendStatus(500)
    }
}
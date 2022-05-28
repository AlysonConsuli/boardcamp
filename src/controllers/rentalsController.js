import db from "../db.js";

export const getRentals = async (req, res) => {
    try {
        const rentals = await db.query(`
        SELECT rentals.*, customers.name as "customerName", 
        games.name as "gameName", games."categoryId", 
        categories.name as "categoryName" FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id`)
        let rentalsResult = []
        for (let rental of rentals.rows) {
            const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,
                customerName, gameName, categoryId, categoryName } = rental
            rentalsResult.push({
                id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,
                customer: { id: customerId, name: customerName },
                game: { id: gameId, name: gameName, categoryId, categoryName }
            })
        }
        res.send(rentalsResult)
    } catch {
        res.sendStatus(500)
    }
}
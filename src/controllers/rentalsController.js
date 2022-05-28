import db from "../db.js";

export const getRentals = async (req, res) => {
    const { customerId, gameId } = req.query
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
            const { id, rentDate, daysRented, returnDate, originalPrice, delayFee,
                customerName, gameName, categoryId, categoryName } = rental
            rentalsResult.push({
                id, customerId: rental.customerId, gameId: rental.gameId,
                rentDate, daysRented, returnDate, originalPrice, delayFee,
                customer: { id: rental.customerId, name: customerName },
                game: { id: rental.gameId, name: gameName, categoryId, categoryName }
            })
        }
        if (customerId && gameId) {
            const rentalsGameAndCustomer = rentalsResult.filter(rental => {
                return (rental.customerId === Number(customerId) && rental.gameId === Number(gameId))
            })
            return res.send(rentalsGameAndCustomer)
        }
        if (customerId) {
            const rentalsCustomer = rentalsResult.filter(rental => {
                return (rental.customerId === Number(customerId))
            })
            return res.send(rentalsCustomer)
        }
        if (gameId) {
            const rentalsGame = rentalsResult.filter(rental => {
                return (rental.gameId === Number(gameId))
            })
            return res.send(rentalsGame)
        }
        res.send(rentalsResult)
    } catch {
        res.sendStatus(500)
    }
}
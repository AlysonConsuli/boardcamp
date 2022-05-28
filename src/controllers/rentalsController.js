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
        for (let rent of rentals.rows) {
            const { id, rentDate, daysRented, returnDate, originalPrice, delayFee,
                customerName, gameName, categoryId, categoryName } = rent
            rentalsResult.push({
                id, customerId: rent.customerId, gameId: rent.gameId,
                rentDate, daysRented, returnDate, originalPrice, delayFee,
                customer: { id: rent.customerId, name: customerName },
                game: { id: rent.gameId, name: gameName, categoryId, categoryName }
            })
        }
        if (customerId && gameId) {
            const rentalsGameAndCustomer = rentalsResult.filter(rent => {
                return (rent.customerId === Number(customerId) && rent.gameId === Number(gameId))
            })
            return res.send(rentalsGameAndCustomer)
        }
        if (customerId) {
            const rentalsCustomer = rentalsResult.filter(rent => {
                return (rent.customerId === Number(customerId))
            })
            return res.send(rentalsCustomer)
        }
        if (gameId) {
            const rentalsGame = rentalsResult.filter(rent => {
                return (rent.gameId === Number(gameId))
            })
            return res.send(rentalsGame)
        }
        res.send(rentalsResult)
    } catch {
        res.sendStatus(500)
    }
}
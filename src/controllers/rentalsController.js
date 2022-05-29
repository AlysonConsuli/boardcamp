import moment from "moment";

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

export const postRent = async (req, res) => {
    const { customerId, gameId, daysRented } = req.body
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const rentDate = `${year}-${month}-${date}`
    try {
        const pricePerDay = await db.query(`
        SELECT "pricePerDay" FROM games
        WHERE id = $1`, [gameId])
        const price = pricePerDay.rows[0].pricePerDay
        const originalPrice = daysRented * price
        const rent = await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", 
        "originalPrice", "returnDate", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, null, null)`,
            [customerId, gameId, daysRented, rentDate, originalPrice]
        )
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}

export const postReturnRent = async (req, res) => {
    const { id } = req.params
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const returnDate = `${year}-${month}-${date}`
    const dateNow = moment().format('YYYY-MM-DD')
    try {
        const rentDate = await db.query(`
        SELECT rentals."rentDate", games."pricePerDay" FROM rentals 
        JOIN games ON games.id = rentals."gameId"
        WHERE rentals.id = $1`, [id])
        const pastDate = moment(rentDate.rows[0].rentDate).format('YYYY-MM-DD')
        const diff = moment(dateNow).diff(moment(pastDate))
        const daysLate = moment.duration(diff).asDays()
        const delayFee = daysLate * rentDate.rows[0].pricePerDay
        const rent = await db.query(`
        UPDATE rentals SET "returnDate" = '${returnDate}', "delayFee" = ${delayFee} 
        WHERE id = $1`, [id])
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}
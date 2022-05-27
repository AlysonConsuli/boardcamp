import db from "../db.js";

export const getCustomers = async (req, res) => {
    try {
        const { cpf } = req.query
        if (cpf) {
            const customerCpf = await db.query(`
            SELECT * FROM customers WHERE cpf LIKE $1`, [`${cpf}%`])
            return res.send(customerCpf.rows)
        }
        const customers = await db.query('SELECT * FROM customers')
        res.send(customers.rows)
    } catch {
        res.sendStatus(500)
    }
}

export const getCustomer = async (req, res) => {
    const { customer } = res.locals
    try {
        res.send(customer)
    } catch {
        res.sendStatus(500)
    }
}
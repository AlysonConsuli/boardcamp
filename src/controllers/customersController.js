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

export const postCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body
    try {
        const customer = await db.query(`
        INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}

export const putCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params
    try {
        const customer = await db.query(`
        UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 
        WHERE id = $5`, [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
}
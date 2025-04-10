const express = require("express");
const { Pool } = require('pg');
const cors = require('cors');
const port = 4000;

const app = express();

app.set('port', port);
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'mampa',
    host: '165.227.198.249',
    database: 'ventas_jorge',
    password: 'mampa3365',
    port: 1232,
});



app.get('/api/:entity', async(req, res) => {
    let entity = req.params.entity
    if (!["clientes", "pedidos", "productos"].includes(entity)) {
        res.status(400).json({ error: " no existe esta entidad" })
    };
    const result = await pool.query(`select * from ${entity}`);
    res.json(result.rows);
});

app.delete('/api/:entity', async(req, res) => {
    let entity = req.params.entity
    if (!["clientes", "pedidos", "productos"].includes(entity)) {
        res.status(400).json({ error: " no existe esta entidad" })
    }
    let id = req.body.id
    const result = await pool.query(`delete from ${entity} where id =  ${id}`);
    res.json(result.rows);
});

app.post('/api/:entity', async(req, res) => {
    let entity = req.params.entity
    if (!["clientes", "pedidos", "productos"].includes(entity)) {
        res.status(400).json({ error: " no existe esta entidad" })
    }
    let query = ""
    if (!req.body.id) {
        const columns = Object.keys(req.body).join(', ');
        const values = Object.values(req.body).map(val => typeof val === 'string' ? `'${val}'` : val).join(', ');
        query = `insert into ${entity}(${columns}) values(${values})`
    }
    if (req.body.id) {
        let comand = ''
        for (let key in req.body) {
            if (key !== 'id') {
                comand += `${key} = '${req.body[key]}', `;
            }
        }
        comand = comand.slice(0, -2);
        query = ` UPDATE ${entity} SET ${comand} WHERE id = ${req.body.id} `;
    }
    const result = await pool.query(query);
    res.status(201).json(result.rows);
});



app.listen(app.get('port'), ()=>{
    console.log('escuchando en el puerto', app.get('port') )
});

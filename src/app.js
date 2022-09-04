const cors = require('cors');
const express = require('express');
const { measureMemory } = require('vm');
const connection = require('./connection');



const app = express();

app.use(express.json());
app.use(express.urlencoded({  extended: true }))
app.use(cors());



app.get('/produtos', async (req, res) => {
        const query = 'SELECT * FROM meuDB.produtos '
        const [data] = await connection.execute(query);
        if (data.length === 0) {
            return res.status(404).json({ message: 'Nâo encontrado' });
        }
        return res.status(200).json({ data });
});

app.get('/produtos/find', async (req, res) => {
        const { produto } = req.query;
        const query = 'SELECT * FROM meuDB.produtos WHERE produto=?'
        const [data] = await connection.execute(query, [produto]);
        if (data.length === 0) {
          return res.status(404).json('Não encontrado');
        }
        return res.status(200).json({ data });
});

app.get('/produtos/:id', async (req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM meuDB.produtos WHERE id=?';
        const [data] = await connection.execute(query, [id]);
        if (data.length === 0) {
          return res.status(404).json('Não encontrado');
        }
        return res.status(200).json({data});
});

app.post('/produtos', async (req, res) => {
        const { produto, valor, descricao } = req.body;
        const query = 'INSERT INTO meuDB.produtos (produto, valor, descricao) VALUES (?, ?, ?)'
        const [inserido] = await connection
        .execute(query, [produto, valor, descricao]);
        if (inserido.affectedRows === 0) {
          res.status(400).json({ message: 'não foi possível inserir produto sem os campos' });
        }
        return res.status(201).json({ message: 'produto inserido com sucesso' }); 
});

app.put('/produtos/:id', async (req, res) => {
        const { produto, valor, descricao } = req.body;
        const { id } = req.params;
        const query = `UPDATE meuDB.produtos SET produto=?, valor=?, descricao=?  WHERE id="${id}"`;
        const [atualizado] = await connection.execute(query, [produto, valor, descricao]);
        if (atualizado.affectedRows === 0) {
            res.status(404).json({ message: 'produto não encontrado!' });
        }
        return res.status(200).json({ message: 'produto atualizado com sucesso' });
});

app.patch('/produtos/:id', async (req, res) => {
        const { id } = req.params;
        const { produto } = req.body;
        const query = `UPDATE meuDB.produtos SET produto=? WHERE id=${id}`;
        const [atualizado] = await connection.execute(query, [produto]);
        if (atualizado.affectedRows === 0) {
            res.status(404).json({ message: 'produto não encontrado!' });
        }
        return res.status(201).json({ message: 'produto atualizado com sucesso' });
});

app.delete('/produtos/:id', async (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM meuDB.produtos WHERE id=?';
        const [retorno] = await connection.execute(query, [id]);
        if (retorno.affectedRows === 0) {
            res.status(404).json({ message: 'produto não encontrado!' });
        }
        res.status(200).json({ message: 'produto excluído com sucesso!' });
});

module.exports = app;
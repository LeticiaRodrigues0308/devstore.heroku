import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());


app.get('/produto', async(req, resp) => {
    try {
        let produtos = await db.tb_produto.findAll({order: [['id_produto', 'desc']]});
        resp.send(produtos)
    } catch (e) {
        resp.send({erro: e.toString()});
    }
});

app.post('/produto', async(req,resp) => {
    try {
        let {nome, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo, data} = req.body;

        let r = await db.tb_produto.create({
            nm_produto: nome,
            ds_categoria: categoria, 
            vl_preco_de: precode,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: ativo,
            dt_inclusao: data
        })
        resp.send(r)
    } catch (e) {
        resp.send('Ocorreu um erro')
    }
});

app.put('/produto/:id', async(req, resp) => {
    try {
        let {nome, categoria, precode, precopor, avaliacao, descricao, estoque, imagem} = req.body;
        let {id} = req.params;

        let r = await db.tb_produto.update({
            nm_produto: nome,
            ds_categoria: categoria, 
            vl_preco_de: precode,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: true,
            dt_inclusao: new Date()
        },
        {
            where: {id_produto: id}
        })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()});
    }
})

app.delete('/produto/:id', async(req, resp) => {
    try {
        let {id} = req.params;

        let r = await db.tb_produto.destroy({where: {id_produto: req.params.id}});
        resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()});
    }
})


app.listen(process.env.PORT,

    x => console.log(`Server up at port ${process.env.PORT}`))
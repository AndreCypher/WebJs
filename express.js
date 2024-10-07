/**
 * Configurações iniciais
 * 
 */

const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000;

//Indica ao servior que iremos trabalhar com JSON 
app.use(express.json());

/*
    Simula um banco de dados
*/ 
let items = [
    { id: 1, name: "Engenharia de Software"},
    { id: 2, name: "Sistemas de Informação"},
];

/**
 * 
 * Endpoint para buscar os dados da lista
 * 
 */

app.get('/item', (req, res) => {
    res.status(200).json(items);
});
app.get('/item/:id', (req, res) => {
    const id = parseInt (req.params.id);
    const item = items.find( item => item.id === id);

    if (item) {
        res.status(200).json (item);}
        else{
            res.status(404).json({message: "Não desista, em breve fica pior"});
        }
}); 


app.post('/item', (req, res) => 
//1. Adicionar Validação Simples nos Dados...
{const { name } = req.body;


if (!name || typeof name !== 'string' || name.length < 3){
    return res.status(400).json({
        error: 'Deu Ruim Estagiário',
        message: 'Isso que da ficar baixando esses conteudos duvidosos'
    })
} else{
const newItem = { id: items.length + 1, ...req.body}
//push insere um novo item no vetor...
items.push(newItem);
res.status(201).json(newItem);}
});

//vamos passar como parametro na chamada o id do objeto que irá ser excluido
app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        //desafio remover o item do array
        items.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

app.put('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = {id, ...req.body}
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});
// 4 
app.delete('/item', (req, res) => {
    items = [];
    res.status(200).json({mensage: "Todos os Iteens foram removidos"});
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})
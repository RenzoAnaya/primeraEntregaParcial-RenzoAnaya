const {Router} = require('express');
const router = Router();

const Api = require('../apiClass')
const api = new Api("/dataBase/productos.json")

const isAdmin = false

function adminOrClient(req, res,next){
    if(!isAdmin){

        res.send(`Error: -1, descripción: ruta ${req.originalUrl}  método ${req.method} no autorizada`)
    }else{ 
        next()
    }
};


router.get('/', async (req,res)=>{
    const productos = await api.findAll()
    res.json(productos)
});


router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const producto = await api.findById(id)
    res.json(producto)
});

router.post('/', adminOrClient, async (req,res)=>{
    const obj = req.body
    const producto = await api.create(obj)
    res.json(producto)
});

router.put('/:id', adminOrClient, async(req, res)=>{
    const {id} = req.params;
    const {body} = req;
    const producto = await api.findById(parseInt(id));
    producto ? api.updateProduct(id,body) : res.json({message: 'Producto no encontrado. Id: ' + id});
    res.json({message : 'Producto actualizado', producto: body});
});

router.delete('/:id', adminOrClient, async(req,res)=>{
    const {id} = req.params;
    const producto = await api.deleteById(parseInt(id));
    producto ? res.json({message: 'Producto eliminado', id: id}) : res.json({message: 'Producto no encontrado. Id:' + id })

})

module.exports = router;
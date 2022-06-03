const {Router} = require('express');

const router = Router();

const Api = require('../apiClass')
const api = new Api("/dataBase/carrito.json")



router.post('/', async (req,res)=>{
    const obj = req.body
    const carrito = await api.create(obj)
    res.json(carrito)
});



router.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    const carrito = await api.deleteById(parseInt(id));
    carrito ? res.json({message: 'Carrito eliminado', id: id}) : res.json({message: 'Carrito no encontrado. Id:' + id })

})


router.get('/:id/productos', async (req,res)=>{
    const {id} = req.params
    const carrito = await api.findById(id)
    res.json(carrito.productos)
});


router.post('/:id/productos', async (req,res)=>{
    const {id} = req.params
    const obj = req.body
    const carrito = await api.agregarAlCarrito(obj,id)
    carrito ? res.json({message: 'Producto agregado', id: obj.id}) : res.json({message: 'Producto no encontrado. Id:' + id })
});



router.delete('/:id/productos/:id_prod', async(req,res)=>{
    const {id} = req.params;
    const {id_prod} = req.params
    const carrito = await api.deleteByProduct(parseInt(id,id_prod));
    console.log(carrito)
    carrito ? res.json({message: 'Producto eliminado', id: id_prod}) : res.json({message: 'Producto no encontrado. Id:' + id_prod })

})






module.exports = router;
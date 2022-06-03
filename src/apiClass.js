const fs = require('fs');

class Api {
    constructor(rutaBD){
        this.rutaBD = __dirname + rutaBD
    }


async findAll(){
    try{
      const todos = JSON.parse (await fs.promises.readFile(this.rutaBD, "utf-8"));
      return (todos);
    } catch(error){
        throw new Error(`Error: ${error}`);
    }
}

async findById(id){

    try{
        const todos = await this.findAll();
        const resultado = todos.find(e => e.id == id);
        return resultado
    }catch(error){
        throw new Error(`Error: ${error}`)
    }

}

async create(obj){
    try{
        const todos = await this.findAll()
        let id
        todos.length===0
        ? id = 1
        : id = todos[todos.length - 1].id + 1

        timestamp = Date.now()

        todos.push({...obj,id,timestamp});

        await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))

        return id
    }catch(error){
        throw new Error(`Error al guardar : ${error}`)
    }
}




async deleteById(id){
    try {
        const todos = await this.findAll()
        const index = todos.findIndex(e => e.id == id)
        if(index<0){
            return false
        }
        todos.splice(index, 1);
        await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))
        
        return id

    } catch (error) {
        throw new Error(`Error al borrar : ${error} `)
        
    }
}




async agregarAlCarrito(obj,id){
    try{
        const todos = await this.findAll()

        const index = todos.findIndex(e=> e.id == id)
        todos[index].productos.push(obj);
        

        await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))

        return id
    }catch(error){
        throw new Error(`Error al guardar : ${error}`)
        console.log(error)
    }
}



async deleteByProduct(id, id_prod){
    try {
        const todos = await this.findAll()
        const index = todos.findIndex(e => e.id == id)
        const indexProduct = todos[index].productos.findIndex(a => a.id == id_prod)
        if(indexProduct < 0){
            return false
        }
        todos[index].productos.splice(indexProduct, 1);
        await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))

        return id_prod

    } catch (error) {
        throw new Error(`Error al borrar : ${error} `)
        
    }
}



async updateProduct(id, product){
    console.log('Actualizando...', product);
    const todos = await this.findAll();
    const index = todos.findIndex(e => e.id == id)
    todos[index] = product;
    await fs.promises.writeFile(this.rutaBD, JSON.stringify(todos))
    console.log('Actualizado');
    
}


}

module.exports = Api;
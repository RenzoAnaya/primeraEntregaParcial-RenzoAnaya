//ruta /api/productos

//ruta /api/productos/:id

let archivo_json = [
  {
  id: 1, timestamp: '2022-05-01 11:45', nombre: 'producto 1', descripcion: 'descripcion 1', codigo: 'codigo 1', foto: 'foto 1', precio: 10, stock: 1
  },
  {
  id: 2, timestamp: '2022-06-01 11:45', nombre: 'producto 2', descripcion: 'descripcion 2', codigo: 'codigo 2', foto: 'foto 2', precio: 20, stock: 2
  },
  {
  id: 3, timestamp: '2022-07-01 11:45', nombre: 'producto 3', descripcion: 'descripcion 3', codigo: 'codigo 3', foto: 'foto 3', precio: 30, stock: 3
  },
]

function get(id = null)
{
  //leer objeto o archivo txt o formato json
  if(id){
    const elemento = archivo_json.find(el => el.id === id);
    if(elemento){
      return elemento;
    }else if(!elemento){
      return `El elemento con ${id} no existe en el archivo_json.`
    }
  }else if(!id){
    return archivo_json;
  }
}

function post(administrador = false, producto)
{
  //leer objeto o archivo txt o formato json
  let url = 'api/productos', metodo= 'post';
  let producto1 = {
    id: 4, timestamp: '2022-07-01 11:45', nombre: 'producto 4', descripcion: 'descripcion 4', codigo: 'codigo 4', foto: 'foto 4', precio: 40, stock: 4
  };

  if(administrador){
    let nuevo_objeto = archivo_json.push(producto1);
    return nuevo_objeto;
  }else if(!administrador){
    let respuesta = { "error" : -2, "descripcion": `ruta ${url} método ${metodo} no implementada`}
    return respuesta;
  }
}

function putProducto(administrador = false, producto)
{
  //leer objeto o archivo txt o formato json
  let url = 'api/productos', metodo= 'put';

  if(administrador){
    const index = archivo_json.findIndex(el => el.id === producto.id);
    if(index !== -1){
      //en caso que el elemento exista
      archivo_json[index] = producto;
    }else if(index === -1){
      //en caso que el elemento no exista en el array
      let respuesta = { "error" : -2, "descripcion": `ruta ${url} método ${metodo} no implementada`}
      return respuesta;
    }
  }else if(!administrador){
    let respuesta = { "error" : -2, "descripcion": `ruta ${url} método ${metodo} no implementada`}
    return respuesta;
  }
}

function deleteProducto(administrador = false, id){
  let url = 'api/productos', metodo= 'delete';
  if(administrador){
    const index = archivo_json.findIndex(el => el.id === producto.id);
    if(index !== -1){
      //en caso de que el elemento exista en el array
      let nuevo_array = archivo_json.splice(index, 1);
      return nuevo_array;
    }else if(index === -1){
      //en caso de que el elemento no exista en el array
      let respuesta = { "error" : -2, "descripcion": `ruta ${url} método ${metodo} no implementada`}
      return respuesta;
    }
  }else if(!administrador){
    let respuesta = { "error" : -2, "descripcion": `ruta ${url} método ${metodo} no implementada`}
    return respuesta;
  }
  
}

//En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}

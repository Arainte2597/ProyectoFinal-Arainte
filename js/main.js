
const buscar = document.getElementById("buscar");
const input = document.getElementById("ingreso");
const contenedorProductos = document.getElementById("contenedorVino")
const verCarrito = document.getElementById("verCarrito");
const contenedorLista = document.getElementById("contenedor-lista");
const contadorCarrito = document.getElementById("contador-carrito");
const botonVaciar = document.getElementById('vaciar-carrito')
const busqueda = document.getElementById("busqueda")
const vinos = [
    { id: 1, nombre: "El Enemigo", precio: 1200, img: "./img/enemigo.jpg"},
    { id: 2, nombre: "Salentein", precio: 1800 , img: "./img/salentein.jpg"},
    { id: 3, nombre: "Luigi bosca", precio: 2800, img: "./img/luigi-bosca.jpg"},
    { id: 4, nombre: "Catena malbec", precio: 1500, img: "./img/catena.jpg"},
    { id: 5, nombre: "Patridge", precio: 1200, img: "./img/partridge.jpg"},
    { id: 6, nombre: "Catena zapata", precio: 1900, img: "./img/catena-zapata.jpg"},
    { id:7, nombre:"Viejo Guerrero Malbec", precio:2200, img:"./img/viejoguerreromalvec.png"},
    { id:8, nombre:"Viejo Guerrero Cabernet Sauvignon", precio:3200, img:"./img/viejoguerrero-cabsev.png"},
    { id:9, nombre:"Viejo Guerrero Blend de Tintas", precio:4000, img:"./img/viejoblend.png"},
    { id:10, nombre:"Artista Malbec", precio:1500, img:"./img/artistamalvec.png"},
    { id:11, nombre:"Artista Malbec Merlot", precio:2000, img:"./img/artistamalbmerlot.png"},
    { id:12, nombre:"Quijano Malbec", precio:2500, img:"./img/quijanomalbec.png"},
    { id:13, nombre:"Quijano Cabernet Sauvignon", precio:3000, img:"./img/quijanocabsau.png"},
    { id:14, nombre:"Combo Quijano Malbec x6", precio:14000, img:"./img/comboquijano.png"},
    { id:15, nombre:"Combo Viejo Guerrero Malbec x6", precio:12000, img:"./img/comboviejo.png"},
    { id:16, nombre:"Combo Artista Malbec x6", precio:9000, img:"./img/comboartista.png"},
  ];


Swal.fire('Bienvenido a la mejor vinoteca de Buenos Aires!, Recuerda que tienes que ser mayor de 18 años para comprar nuestros productos.')
   
  //                  *********         fetch a api local  ***************
  async function vinosfetch(){
    try {
     const carpetavino='./js/data.json';
     const response = await fetch(carpetavino);
     const data = await response.json();
     
    //    ****************                boton  filtrado del vino ******

   buscar.addEventListener('click',()=>{
     const filtro = filtrarvino(data)
   htmlbusqueda(filtro);
   
   })
     
    } catch (error) {
     console.log(error);
    }
  }
   vinosfetch()
  ////          ******************           html de la busqueda    ********** 
   function htmlbusqueda(arr) {
     let html = "";
     busqueda.innerHTML = "";
     arr.forEach((vino) => {
       const { nombre, precio, img } = vino;
       html = ` <div class="cards">
                  <h3>  Tu busqueda es: </h3>
                  <img src="${img}" alt="">
                  <div class="card-body">
                  <h3>${nombre}</h3>
                  <p class="precioProducto">precio: $${precio}</p>
                </div>`;
   
       busqueda.innerHTML += html;
     });
  }
   ///             **************************      filtro del vino         ********************         
   function filtrarvino(array){
     let nombre = input.value;
     let nombreC = nombre.charAt(0).toUpperCase() + nombre.slice(1);
     if (!nombre) {
       return array;
     } else {
       return array.filter((e) => e.nombre.includes(nombreC));
     }
   }
   
  //        ********************    creando carrito y aplicando guardado local  ******************************   //
   let carrito = [];
   document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//              **********************     boton eliminacion del carrito  **********************

botonVaciar.addEventListener('click',() =>{
  Swal.fire({
    title: 'Seguro que quieren eliminarlos?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `no`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
          icon: 'success',
          title: 'Hemos eliminado tus productos!',
          text: 'Tu carrito esta vacio!',
          })
          carrito.length = 0
          localStorage.clear()
          actualizarCarrito()
    } 
    else if (result.isDenied) {
      Swal.fire('No se han borrado tus productos', '', 'info')
    }
  })      
})

//                **********          creando el html     ********
vinos.forEach((producto) => {
  const div = document.createElement('div')
  div.classList.add('cards')
  div.innerHTML = `
  <img src=${producto.img} alt= "">
  <h3>${producto.nombre}</h3>
  <p class="precioProducto">Precio:$ ${producto.precio}</p>
  <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
  `
  contenedorProductos.appendChild(div)
  
  const boton = document.getElementById(`agregar${producto.id}`)


  boton.addEventListener('click', () => {
      
      agregarAlCarrito(producto.id)
      Toastify({
        text: "Agregado al Carrito!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "#ff0000",
        },
        onClick: function(){}
      }).showToast();
  })


})
              //           ************  click carrito para mostrar ****************************//
const mostrarcarrito = () =>{
  document.getElementById("contenedor-lista").style.display ="inline-block";
}
 verCarrito.addEventListener("click",()=>{
   mostrarcarrito();
 })
//                           push al carrito
const agregarAlCarrito = (prodId) => {

  const item = vinos.find(prod => prod.id === prodId)

      carrito.push(item)
      actualizarCarrito()
      
  }

//                     ----------------       lista productos  ************
 
const actualizarCarrito = () => {
    contenedorLista.innerHTML = ""

  carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('listaProductos')
    div.innerHTML = `
    <img src="${prod.img}">
    <p>${prod.nombre}</p>
    <p>Precio:$${prod.precio}</p>
    
    `

    contenedorLista.appendChild(div)
    
  localStorage.setItem('carrito',JSON.stringify(carrito))
  

  })

//                 **************         contador a pagar            **************
  contadorCarrito.innerText = carrito.length;
  const total = carrito.reduce((acc , el) => acc + el.precio,0);

     const totalProductos = document.createElement("div")
     totalProductos.className = "totalProductos"
     totalProductos.innerHTML = `
       <h3>Total a pagar: $ ${total}
   `;
     contenedorLista.append(totalProductos);
    
   
//                ******* boton salir de la lista **********


     const listaButton = document.createElement("h1")
     listaButton.innerText = "❌";
     listaButton.className = "listaButton text-center";
   
   
     listaButton.addEventListener("click",() => {
          contenedorLista.style.display = "none"
     });
   
     contenedorLista.append(listaButton);
  
     const comprar = document.createElement("button")
     comprar.innerText = "Finalizar compra";
     comprar.className = "btn btn-danger btn-primary-outline-success text-center";
   
   
     comprar.addEventListener("click",() => {
      carrito.length = 0
      localStorage.clear()
      actualizarCarrito()
      Swal.fire({
        icon: 'success',
        title: 'Compra Exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      
          contenedorLista.style.display = "none"
          
     });
   
     contenedorLista.append(comprar);


}

  
  
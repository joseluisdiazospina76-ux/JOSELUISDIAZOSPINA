const productos = [
    {id:1, nombre:"Audífonos", precio:50, img:"assets/audifonos.jpg"},
    {id:2, nombre:"Teclado", precio:80, img:"assets/teclado.jpg"},
    {id:3, nombre:"Mouse", precio:40, img:"assets/mouse.jpg"},
    {id:4, nombre:"Monitor", precio:300, img:"assets/monitor.jpg"},
    {id:5, nombre:"Laptop", precio:1500, img:"assets/laptop.jpg"},
    {id:6, nombre:"Celular", precio:900, img:"assets/celular.jpg"},
    {id:7, nombre:"Cargador", precio:25, img:"assets/cargador.jpg"},
    {id:8, nombre:"USB", precio:15, img:"assets/usb.jpg"},
    {id:9, nombre:"Silla Gamer", precio:250, img:"assets/silla.jpg"},
    {id:10, nombre:"Tablet", precio:400, img:"assets/tablet.jpg"}
];

let carrito = [];

// MOSTRAR PRODUCTOS
function mostrarProductos(lista = productos){
    let cont = document.getElementById("productos");
    cont.innerHTML = "";

    lista.forEach(p=>{
        cont.innerHTML += `
        <div class="producto">
            <img src="${p.img}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="agregar(${p.id})">Agregar</button>
        </div>`;
    });
}

// BUSCADOR + FILTRO
function filtrar(){
    let texto = document.getElementById("buscador").value.toLowerCase();
    let filtro = document.getElementById("filtro").value;

    let resultado = productos.filter(p=>{
        let coincide = p.nombre.toLowerCase().includes(texto);

        if(filtro === "bajo") return coincide && p.precio < 100;
        if(filtro === "alto") return coincide && p.precio >= 100;

        return coincide;
    });

    mostrarProductos(resultado);
}

// AGREGAR
function agregar(id){
    let prod = productos.find(p=>p.id===id);
    carrito.push(prod);
    mostrarCarrito();
}

// MOSTRAR CARRITO
function mostrarCarrito(){
    let lista = document.getElementById("carrito");
    lista.innerHTML = "";

    carrito.forEach((p,i)=>{
        lista.innerHTML += `
        <li>
            ${p.nombre} - $${p.precio}
            <button onclick="eliminar(${i})"></button>
        </li>`;
    });

    let total = carrito.reduce((acc,p)=>acc+p.precio,0);
    document.getElementById("total").textContent = total;
}

// ELIMINAR
function eliminar(i){
    carrito.splice(i,1);
    mostrarCarrito();
}

// MOSTRAR PAGO
function mostrarPago(){
    let metodo = document.getElementById("metodoPago").value;
    document.getElementById("tarjeta").style.display =
        metodo === "tarjeta" ? "block" : "none";
}

// COMPRA + FACTURA
function comprar(){
    let metodo = document.getElementById("metodoPago").value;
    let mensaje = document.getElementById("mensaje");

    if(carrito.length === 0){
        mensaje.textContent = "Carrito vacío";
        mensaje.style.color = "red";
        return;
    }

    if(metodo === ""){
        mensaje.textContent = "Selecciona método de pago";
        mensaje.style.color = "red";
        return;
    }

    if(metodo === "tarjeta"){
        let numero = document.getElementById("numero").value;
        let cvv = document.getElementById("cvv").value;

        if(numero === "" || cvv === ""){
            mensaje.textContent = "Completa datos de tarjeta";
            mensaje.style.color = "red";
            return;
        }
    }

    generarFactura();

    mensaje.textContent = "Compra exitosa";
    mensaje.style.color = "green";

    carrito = [];
    mostrarCarrito();
}

// FACTURA
function generarFactura(){
    let factura = document.getElementById("factura");
    let detalle = document.getElementById("detalleFactura");

    factura.style.display = "block";

    let total = carrito.reduce((acc,p)=>acc+p.precio,0);

    detalle.innerHTML = "<ul>";

    carrito.forEach(p=>{
        detalle.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
    });

    detalle.innerHTML += `</ul><h3>Total: $${total}</h3>`;
}

// MODO OSCURO
document.getElementById("modoOscuro").addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
});

// INICIO
mostrarProductos();
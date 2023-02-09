//PLANTILLA HOTELES

class Hotel {
  constructor(nombre, precioNoche, rating, desayunoIncluido) {
    this.nombre = nombre;
    this.precioNoche = precioNoche;
    this.rating = rating;
    this.desayunoIncluido = desayunoIncluido;

    this.generarHabitaciones();
  }

  generarHabitaciones() {
    this.habitaciones = [];
    for (let i = 0; i < 20; i++) {
      const habitacion = new Habitacion(i, false);
      this.habitaciones.push(habitacion);
    }
  }

  getHabitacionesDisponibles() {
    return this.habitaciones.filter(
      (habitacion) => habitacion.ocupada === false
    ).length;
  }
}

class Habitacion {
  constructor(id, ocupada) {
    this.id = id;
    this.ocupada = ocupada;
  }

  ocupar() {
    this.ocupada = true;
  }
}

class App {
  constructor(hoteles) {
    this.hoteles = hoteles;
    this.selectedHotel = null;
  }

  listarHoteles() {
    return this.hoteles
      .map((hotel) => {
        return `${hotel.nombre}:\nPrecio por noche es $${
          hotel.precioNoche
        }. \nEs un hotel de ${hotel.rating}. \n${
          hotel.desayunoIncluido ? "Desayuno incluido" : "Desayuno no incluido"
        }. \nHabitaciones disponibles: ${hotel.getHabitacionesDisponibles()}`;
      })
      .join("\n\n");
  }

  findHotelByName(hotelName) {
    return this.hoteles.find(
      (hotel) => hotel.nombre.toLowerCase() === hotelName.toLowerCase()
    );
  }

  seleccionarHotel(hotel) {
    this.selectedHotel = hotel;
  }

  calculadorDePrecioFinal(noches, huespedes) {
    return noches * huespedes * this.selectedHotel.precioNoche;
  }

  reservaDeHabitaciones() {
    const habitacionLibre = this.selectedHotel.habitaciones.find(
      (habitacion) => habitacion.ocupada === false
    );
    habitacionLibre.ocupar();
  }
}
//HOTELES DISPONIBLES
const listaDeHoteles = [
  new Hotel("ABC Hotel", 110, "5 Estrellas", true),
  new Hotel("Spa Resort", 95, "4 Estrellas", true),
  new Hotel("Pepito", 50, "2 Estrellas", false),
];

//INICIO
const app = new App(listaDeHoteles);
function ejecucion() {
  let hotelSeleccionado;
  while (hotelSeleccionado === undefined) {
    let userInputHotel = prompt(
      `Hoteles disponibles en Palma de Mallorca: \n${app.listarHoteles()} \n\nIngrese nombre del hotel donde se hospedará: `
    );
    hotelSeleccionado = app.findHotelByName(userInputHotel);
    if (hotelSeleccionado !== undefined) {
      app.seleccionarHotel(hotelSeleccionado);
    } else {
      alert("Hotel no válido o no disponible");
    }
  }

  const userInputCantidadHuespedes = parseInt(
    prompt("Cuantas personas se hospedarán? ")
  );
  const userInputCantidadNoches = parseInt(
    prompt("Cuantas noches se hospedarán? ")
  );
  const precioFinal = app.calculadorDePrecioFinal(
    userInputCantidadNoches,
    userInputCantidadHuespedes
  );
  const confirmacion = confirm(
    `El precio final en ${app.selectedHotel.nombre} es de $${precioFinal} `
  );

  if (confirmacion) {
    app.reservaDeHabitaciones();
  }

  alert(
    `Has resevado en ${app.selectedHotel.nombre} ${userInputCantidadNoches} noches por un precio final de $${precioFinal} `
  );
}
let toBeContinued = true;
while (toBeContinued) {
  ejecucion();
  toBeContinued = confirm("Desea hacer otra reserva?");
}

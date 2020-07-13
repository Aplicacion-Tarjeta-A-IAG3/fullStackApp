# fullStackApp

Toda la app con las partes en carpetas

## Iniciar la app en el servidor local

1. git clone https://github.com/Aplicacion-Tarjeta-A-IAG3/fullStackApp.git

1. cd fullStackApp

1. npm install

1. npm start


# Requests desde el frontend

Descripción de los requests a los endpoint del backend

## Clientes

### GET un cliente

*Request*
```
fetch('http://african-express.us-e2.cloudhub.io/api/clients/1')
  .then(response => response.json())
  .then(data => console.log(data))
```
*Output*
```
{
  id: 1,
  dni: 123456
  nombre: "Julia",
  apellido: "Espinoza",
  estadoCivil: 0,
  password: "pwd123",
  puntos: 1,
  activo: true,
  activoDescripcion: "pendiente"
  domicilio: {
    id: 1,
    calle: "La Calle",
    numero: 1234,
    piso: 1,
    departamento: "A",
    barrio: "Palermo",
    codigoPostal: "AA12345BB",
    ciudad: "CABA",
    localidad: "CABA",
    provincia: "CABA",
    pais: "Argentina",
  },
  contacto: {
    id: 1,
    mail: "jespinoza@uade.edu.ar",
    celular: 12345647897,
    telefono: 123456478,
  }
}
```
### GET todos los clientes

*Frontend Request*
```
fetch('https://jsonplaceholder.typicode.com/clients')
  .then((response) => response.json())
  .then((list) => console.log(list))
```
*Output*
```
[
  { id: 1, dni: 123456, nombre: "Julia", apellido: "Espinoza", activo: true, activoDescripcion: "pendiente", contacto: { mail: "jespinoza@uade.edu.ar"}},
  { ... },
  { id: 100, dni: 123457, nombre: "Juan", apellido: "Perez", activo: true, activoDescripcion: "validado", contacto: { mail: "jperez@uade.edu.ar"}},
]
```
### POST crear cliente

*Frontend Request*
```
fetch('https://jsonplaceholder.typicode.com/clients', {
    method: 'POST',
    body: JSON.stringify({
      dni: 123456
      nombre: "Julia",
      apellido: "Espinoza",
      estadoCivil: 0,
      password: "pwd123",
      puntos: 0,
      activo: true,
      activoDescripcion: "pendiente",
      fechaNacimiento: 19990502,
      password: "algoRandom",
      contacto: {
        mail: "jespinoza@uade.edu.ar",
        celular: 12345647897,
        telefono: 123456478,
      },
      domicilio: {
        calle: "La Calle",
        numero: 1234,
        piso: 1,
        departamento: "A",
        barrio: "Palermo",
        codigoPostal: "AA12345BB",
        ciudad: "CABA",
        localidad: "CABA",
        provincia: "CABA",
        pais: "Argentina",
      }
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
```
*Output*
```
{
  id: 1,
  dni: 123456
  nombre: "Julia",
  apellido: "Espinoza",
  estadoCivil: 0,
  password: "pwd123",
  puntos: 1,
  activo: true,
  activoDescripcion, "pendiente",
  fechaNacimiento: 19990502,
  domicilio: {
    id: 1,
    calle: "La Calle",
    numero: 1234,
    piso: 1,
    departamento: "A",
    barrio: "Palermo",
    codigoPostal: "AA12345BB",
    ciudad: "CABA",
    localidad: "CABA",
    provincia: "CABA",
    pais: "Argentina",
  },
  contacto: {
    id: 1,
    mail: "jespinoza@uade.edu.ar",
    celular: 12345647897,
    telefono: 123456478,
  }
}
```
### PUT editar cliente

*Frontend Request*
```
fetch('https://jsonplaceholder.typicode.com/clients/1', {
    method: 'PUT',
    body: JSON.stringify({
      id: 1,
      dni: 123456
      nombre: "Julia",
      apellido: "Espinoza",
      estadoCivil: 0,
      password: "pwd123",
      puntos: 0,
      activo: true,
      activoDescripcion: "validado",
      fechaNacimiento: 19990502,
      password: "algoRandom",
      contacto: {
        id: 1,
        mail: "jespinoza@uade.edu.ar",
        celular: 12345647897,
        telefono: 123456478,
      },
      domicilio: {
        id: 1,
        calle: "La Calle",
        numero: 1234,
        piso: 1,
        departamento: "A",
        barrio: "Palermo",
        codigoPostal: "AA12345BB",
        ciudad: "CABA",
        localidad: "CABA",
        provincia: "CABA",
        pais: "Argentina",
      }
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
```
*Output*
```
{
  id: 1,
  dni: 123456,
  nombre: "Julia",
  apellido: "Espinoza",
  estadoCivil: 0,
  password: "pwd123",
  puntos: 1,
  activo: true,
  activoDescripcion: "validado",
  fechaNacimiento: 19990502,
  domicilio: {
    id: 1,
    calle: "La Calle",
    numero: 1234,
    piso: 1,
    departamento: "A",
    barrio: "Palermo",
    codigoPostal: "AA12345BB",
    ciudad: "CABA",
    localidad: "CABA",
    provincia: "CABA",
    pais: "Argentina",
  },
  contacto: {
    id: 1,
    mail: "jespinoza@uade.edu.ar",
    celular: 12345647897,
    telefono: 123456478,
  }
}
```

# fullStackApp

Toda la app con las partes en carpetas

## Iniciar la app en el servidor local

1. git clone https://github.com/Aplicacion-Tarjeta-A-IAG3/fullStackApp.git

1. cd fullStackApp

1. npm install

1. npm start

## Especificaciones de requests

1. [Clientes](#clientes)

- [Detalle cliente](#get-un-cliente)
- [Lista clientes](#get-todos-los-clientes)
- [Crear cliente](#post-crear-cliente)
- [Editar cliente](#put-editar-cliente)

1. [Comercios](#comercios)

- [Detalle comercio](#get-un-comercio)
- [Lista comercios](#get-todos-los-comercios)
- [Crear comercio](#post-crear-comercio)
- [Editar comercio](#put-editar-comercio)

---

# Requests desde el frontend

Descripción de los requests a los endpoint del backend

## Clientes

### GET un cliente

**Request**

```
fetch('http://african-express.us-e2.cloudhub.io/api/clients/1')
  .then(response => response.json())
  .then(data => console.log(data))
```

**Output**

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
  bajaDescripcion: "pendiente"
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

**Request**

```
fetch('https://jsonplaceholder.typicode.com/clients')
  .then((response) => response.json())
  .then((list) => console.log(list))
```

**Output**

```
[
  { id: 1, dni: 123456, nombre: "Julia", apellido: "Espinoza", activo: true, bajaDescripcion: "pendiente", contacto: { mail: "jespinoza@uade.edu.ar"}},
  { ... },
  { id: 100, dni: 123457, nombre: "Juan", apellido: "Perez", activo: true, bajaDescripcion: "validado", contacto: { mail: "jperez@uade.edu.ar"}},
]
```

### POST crear cliente

**Request**

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

**Output**

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
  bajaDescripcion, "pendiente",
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

**Request**

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
      bajaDescripcion: "validado",
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

**Output**

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
  bajaDescripcion: "validado",
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

## Comercios

### GET un comercio

**Request**

```
fetch('http://african-express.us-e2.cloudhub.io/api/businesses/1')
  .then(response => response.json())
  .then(data => console.log(data))
```

**Output**

```
{
  id: 1,
  cuit: 123456,
  password: "pwd123",
  nombreComercio: "Mi comercio",
  nombrePersona: "Juana Perez",
  activo: true,
  bajaDescripcion: "pendiente",
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
    mail: "elcomercio@mail.com",
    celular: 12345647897,
    telefono: 123456478,
  }
}
```

### GET todos los comercios

**Request**

```
fetch('https://jsonplaceholder.typicode.com/businesses')
  .then((response) => response.json())
  .then((list) => console.log(list))
```

**Output**

```
[
  { id: 1, dni: 123456, nombreComercio: "Mi comercio", nombrePersona: "Juana Perez", activo: true, bajaDescripcion: "pendiente", contacto: { mail: "elcomercio@mail.com"}},
  { ... },
  { id: 100, dni: 123457, nombreComercio: "Otro comercio", nombrePersona: "Juana Perez", activo: true, bajaDescripcion: "validado", contacto: { mail: "otrocomercio@mail.com"}},
]
```

### POST crear comercio

**Request**

```
fetch('https://jsonplaceholder.typicode.com/bussinesses', {
    method: 'POST',
    body: JSON.stringify({
      cuit: 123456,
      password: "pwd123",
      nombreComercio: "Mi comercio",
      nombrePersona: "Juana Perez",
      activo: true,
      contacto: {
        mail: "elcomercio@mail.com",
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

**Output**

```
{
  id: 1,
  cuit: 123456,
  password: "pwd123",
  nombreComercio: "Mi comercio",
  nombrePersona: "Juana Perez",
  activo: true,
  bajaDescripcion: "pendiente",
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
    mail: "elcomercio@mail.com",
    celular: 12345647897,
    telefono: 123456478,
  }
}
```

### PUT editar comercio

**Request**

```
fetch('https://jsonplaceholder.typicode.com/bussinesses/1', {
    method: 'PUT',
    body: JSON.stringify({
      id: 1,
      cuit: 123456,
      password: "pwd123",
      nombreComercio: "Mi comercio",
      nombrePersona: "Juana Perez",
      activo: true,
      bajaDescripcion: "pendiente",
      contacto: {
        id: 1,
        mail: "elcomercio@mail.com",
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

**Output**

```
{
  id: 1,
  cuit: 123456,
  password: "pwd123",
  nombreComercio: "Mi comercio",
  nombrePersona: "Juana Perez",
  activo: true,
  bajaDescripcion: "pendiente",
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
    mail: "elcomercio@mail.com",
    celular: 12345647897,
    telefono: 123456478,
  }
}
```

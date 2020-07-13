import fakeDataProvider from "ra-data-fakerest";

export const myFakeDataProvider = fakeDataProvider({
  clients: [
    {
      id: 1,
      dni: 123456,
      nombre: "Julia",
      apellido: "Espinoza",
      estadoCivil: 0,
      password: "pwd123",
      puntos: 1,
      activo: true,
      bajaDescripcion: "",
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
      },
    },
    {
      id: 2,
      dni: 321654,
      nombre: "Juan",
      apellido: "Perez",
      estadoCivil: 0,
      password: "1234",
      puntos: 0,
      activo: true,
      bajaDescripcion: "",
      fechaNacimiento: 19990502,
      domicilio: {
        id: 2,
        calle: "La Callecita",
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
        id: 2,
        mail: "jperez@uade.edu.ar",
        celular: 12345647897,
        telefono: 123456478,
      },
    },
  ],
  businesses: [
    {
      id: 1,
      cuit: 123456,
      password: "pwd123",
      nombreComercio: "Mi comercio",
      nombrePersona: "Juana Perez",
      activo: true,
      bajaDescripcion: "",
      domicilio: {
        id: 3,
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
        id: 3,
        mail: "elcomercio@mail.com",
        celular: 12345647897,
        telefono: 123456478,
      },
    },
    {
      id: 2,
      cuit: 123458,
      password: "lalala",
      nombreComercio: "Otro comercio",
      nombrePersona: "Juana Perez",
      activo: false,
      bajaDescripcion: "",
      domicilio: {
        id: 4,
        calle: "Otra Calle",
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
        id: 4,
        mail: "otrocomercio@mail.com",
        celular: 12345647897,
        telefono: 123456478,
      },
    },
  ],
});

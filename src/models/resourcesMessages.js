const resourceMessages = {
  resources: {
    users: {
      name: "Usuarios",
      fields: {
        name: "Nombre",
        company: {
          name: "Nombre de empresa",
          website: "Sitio web",
        },
      },
    },
    personas: {
      name: "Clientes",
      fields: {
        dni: "DNI",
        contacto: {
          mail: "Email",
        },
      },
    },
    comercios: {
      name: "Comercios",
      fields: {
        contacto: {
          mail: "Email",
        },
      },
    },
    transacciones: {
      name: "Transacciones del día",
      fields: {
        dni: "DNI del cliente",
        cuit: "CUIT del comercio",
        tarjeta: "Nro. de tarjeta",
        cvc: "CVC",
        tipo: "Tipo de transacción",
        cliente: "Nombre del cliente",
        comercio: "Nombre del comercio",
        monto: "Monto",
      },
    },
  },
  app: {
    page: {
      loading: "Cargando",
    },
    message: {
      loading:
        "¿Está tardando mucho? Refrescá la página y volvé a intentarlo por favor.",
      invalid_form:
        "Datos incorrectos o incompletos. Por favor verifique el formulario y las pestañas",
    },
  },
  newRecords: {
    "forEach is not a function": "No se encontraron datos",
  },
  serverResponseError:
    "Respuesta incorrecta del servidor. Consulte al proveedor del servicio.",
  "Unexpected token E in JSON at position 0":
    "Respuesta incorrecta del servidor. Consulte al proveedor del servicio.",
  emptyValidation: "No puede estar vacío",
  numericValidation: "Debe ser numérico",
  emailValidation: "Email inválido",
  invalid_form:
    "Datos incorrectos o incompletos. Por favor verifique el formulario y las pestañas",
  passNotMatch: "Tu contraseña actual no coincide",
  sameNewPass: "Tu contraseña nueva es igual que la actual",
};
export default resourceMessages;

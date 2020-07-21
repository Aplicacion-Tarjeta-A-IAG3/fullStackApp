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
      name: "Transacciones",
      fields: {
        dni: "DNI del cliente",
        cuit: "CUIT del comercio",
        tarjeta: "Nro. de tarjeta",
        cvc: "CVC",
      },
    },
  },
  app: {
    page: {
      loading: "Cargando",
    },
  },
  newRecords: {
    "forEach is not a function": "No se encontraron datos",
  },
};
export default resourceMessages;

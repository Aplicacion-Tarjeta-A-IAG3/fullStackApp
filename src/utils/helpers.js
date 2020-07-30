export const currencyParser = (number) => {
  let parsedNum = "-";
  console.log("number 1", number);
  if (number && number !== "undefined" && !isPromise(number)) {
    console.log("number 2", number, number.then);
    parsedNum = number.toLocaleString("de-DE", {
      style: "currency",
      currency: "ARS",
    });
  }
  console.log("PARSED?", number, parsedNum);
  return parsedNum;
};

export const isDefined = (v) => {
  return (
    v &&
    v !== "undefined" &&
    Object.prototype.toString.call(v) !== "[object Promise]"
  );
};

const isPromise = (p) => {
  console.log("es p?", p);
  return p && Object.prototype.toString.call(p) === "[object Promise]";
};

export const monthsMapper = {
  0: "-",
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

export const balanceTableOptions = {
  filterType: "checkbox",
  pagination: false,
  selectableRows: "none",
  textLabels: {
    body: {
      noMatch: "No se encontraron registros",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Filtrar Tabla",
    },
    filter: {
      all: "Todos",
      title: "FILTROS",
      reset: "LIMPIAR FILTROS",
    },
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Esconder Columnas",
    },
    selectedRows: {
      text: "filas(s) seleccionadas",
      delete: "Borrar",
      deleteAria: "Borrar Filas Seleccionadas",
    },
  },
};

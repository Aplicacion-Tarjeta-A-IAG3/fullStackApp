export const currencyParser = (number) =>
  Number.isNaN(number)
    ? "-"
    : number.toLocaleString("de-DE", {
        style: "currency",
        currency: "ARS",
      });

export const monthsMapper = {
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

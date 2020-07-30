import * as React from "react";
import { Route } from "react-router-dom";
import AssignProduct from "../components/assignClientProduct";
import ShowStatements from "../components/showStatements";

export default [
  <Route path="/personas/:id/asignar_producto" component={AssignProduct} />,
  <Route
    path="/tarjetas/:id/mostrar_resumen/:tarjeta"
    component={ShowStatements}
  />,
  // <Route exact path="/ejemplo" component={EjemploSinLayout} noLayout />,
];

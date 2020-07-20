import * as React from "react";
import { Route } from "react-router-dom";
import AsignProduct from "../components/asignClientProduct";
import showStatements from "../components/showStatements";

export default [
  <Route path="/personas/:id/asignar_producto" component={AsignProduct} />,
  // <Route exact path="/ejemplo" component={EjemploSinLayout} noLayout />,
];

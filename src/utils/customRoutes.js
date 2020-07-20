import * as React from "react";
import { Route } from "react-router-dom";
import AssignProduct from "../components/assignClientProduct";

export default [
  <Route path="/personas/:id/asignar_producto" component={AssignProduct} />,
  // <Route exact path="/ejemplo" component={EjemploSinLayout} noLayout />,
];

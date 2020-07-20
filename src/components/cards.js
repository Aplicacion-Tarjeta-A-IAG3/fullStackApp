import * as React from "react";
import { Title } from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const CardList = (props) => (
  <Card>
    <Title title="Mis tarjetas" />
    <CardContent>
      <p>Seguimos trabajando en esta sección.</p>
      <p>Disculpe las molestias</p>
    </CardContent>
  </Card>
);

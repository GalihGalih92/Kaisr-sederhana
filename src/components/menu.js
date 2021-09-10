import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utilts/utils";

const menu = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} es={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: 16, fontWeight: "bold" }}>
            {menu.nama} (<strong>{menu.kode}</strong>)
          </Card.Title>
          <Card.Text>Rp.{numberWithCommas(menu.harga)}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default menu;

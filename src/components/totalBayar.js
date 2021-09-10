import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utilts/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utilts/constant";

export default class totalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_Bayar: totalBayar,
      Menu: this.props.Keranjang,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    const totalBayar = this.props.Keranjang.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* Web Version */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong style={{ float: "right", marginRight: 10 }}>
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="mb-4 mt-2"
                  onClick={() => this.submitTotalBayar()}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ marginRight: 10 }}
                  />
                  Bayar{" "}
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile Version */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong style={{ float: "right", marginRight: 10 }}>
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="mb-4 mt-2"
                  onClick={() => this.submitTotalBayar()}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ marginRight: 10 }}
                  />
                  Bayar{" "}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

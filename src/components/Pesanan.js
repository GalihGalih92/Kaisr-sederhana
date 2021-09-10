import React, { Component } from "react";
import {
  Col,
  ListGroup,
  Row,
  Badge,
  Modal,
  Button,
  Card,
} from "react-bootstrap";
import { numberWithCommas } from "../utilts/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./totalBayar";
import { API_URL } from "../utilts/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Pesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      KeranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };
  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };
  hanldeSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan!",
          text: "Berhasil Menambahkan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log("error yaa:", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan!",
          text: "Berhasil Menghapus " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log("error yaa:", error);
      });
  };
  render() {
    const { Keranjang } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Pesanan</strong>
        </h4>
        <hr />
        {Keranjang.length !== 0 && (
          <Card className="overflow-auto pesanan">
            <ListGroup variant="flush">
              {Keranjang.map((menuKeranjang, index) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs="2">
                      <h4>
                        <Badge pill bg="success">
                          {index + 1}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>
                        Rp. {numberWithCommas(menuKeranjang.product.harga)} x
                        {menuKeranjang.jumlah}
                      </p>
                    </Col>
                    <Col>
                      <strong style={{ float: "right" }}>
                        {" "}
                        <Col>
                          Rp. {numberWithCommas(menuKeranjang.total_harga)}
                        </Col>
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}{" "}
              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                hanldeSubmit={this.hanldeSubmit}
                changeHandler={this.changeHandler}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar Keranjang={Keranjang} {...this.props} />
      </Col>
    );
  }
}

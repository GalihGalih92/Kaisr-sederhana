import { Row, Col, Container } from "react-bootstrap";
import { Pesanan, ListCategories, Menus } from "../components";
import React, { Component } from "react";
import { API_URL } from "../utilts/constant";
import axios from "axios";
import swal from "sweetalert";

export default class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Menu: [],
      pilihCategori: "Minuman",
      Keranjang: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.pilihCategori)
      .then((res) => {
        const Menu = res.data;
        this.setState({ Menu });
      })
      .catch((error) => {
        console.log("error yaa:", error);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.Keranjang !== prevState.Keranjang) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const Keranjang = res.data;
  //         this.setState({ Keranjang });
  //       })
  //       .catch((error) => {
  //         console.log("error yaa:", error);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const Keranjang = res.data;
        this.setState({ Keranjang });
      })
      .catch((error) => {
        console.log("error yaa:", error);
      });
  };

  ChangeCategory = (value) => {
    this.setState({
      pilihCategori: value,
      Menu: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        this.getListKeranjang();
        const Menu = res.data;
        this.setState({ Menu });
      })
      .catch((error) => {
        console.log("error yaa:", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        this.getListKeranjang();
        if (res.data.length === 0) {
          const dataKeranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", dataKeranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses!",
                text: "Berhasil Menambahkan " + dataKeranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log("error yaa:", error);
            });
        } else {
          const dataKeranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, dataKeranjang)
            .then((res) => {
              swal({
                title: "Sukses!",
                text: "Berhasil Menambahkan " + dataKeranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log("error yaa:", error);
            });
        }
      })
      .catch((error) => {
        console.log("error yaa:", error);
      });
  };

  render() {
    const { Menu, Keranjang } = this.state;
    return (
      <div>
        <div className="App">
          <div>
            <Container fluid>
              <Row className="mt-3">
                <ListCategories
                  ChangeCategory={this.ChangeCategory}
                  pilihCategori={this.state.pilihCategori}
                />
                <Col>
                  <h4>
                    <strong>Daftar Produk</strong>
                  </h4>
                  <hr />
                  <Row className="overflow-auto menu">
                    {Menu &&
                      Menu.map((menu) => (
                        <Menus
                          key={menu.id}
                          menu={menu}
                          masukKeranjang={this.masukKeranjang}
                        />
                      ))}
                  </Row>
                </Col>
                <Pesanan
                  Keranjang={Keranjang}
                  {...this.props}
                  getListKeranjang={this.getListKeranjang}
                />
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

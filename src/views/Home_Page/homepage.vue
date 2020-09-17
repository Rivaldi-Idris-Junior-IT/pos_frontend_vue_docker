<template>
    <div id="app">
        <div class="Checkout">
            <nav class="navbar navbar-light ">
                <a class="navbar-brand" href="#">
                    <img src="../../assets/images/menu (1).svg" width="30" height="30" class="d-inline-block align-top"
                        alt="" loading="lazy">
                </a>
                <div class="justify-content-center mx-auto">
                    <div class="food-name-brand mx-auto">
                        <h5>Food items</h5>
                    </div>
                </div>
            </nav>

            <section id="main-side-aside">
                <div class="row">
                    <div class="col-md-1" style="background-color:#ffff;">
                        <div class="sidebar pl-4">
                            <a href="#" @click="goToHomepage(data)"><img src="../../assets/images/fork.svg" alt="" width="40" height="40"></a>
                            <a href="#" @click="goToHistory(data)"><img src="../../assets/images/clipboard.svg" alt="" width="40" height="40"></a>
                            <button data-toggle="modal" data-target="#addedModal" class="modal-button-added"><img
                                    src="../../assets/images/add.svg" alt=""></button>
                        </div>
                    </div>
                    <div class="col-md-8 mt-1">
                        <div class="col-md-12 menu-option mt-1 form-inline">
                            <div class="col-md-6 mt-1 mx-auto" style="padding-top:2px;">
                                <label class="sr-only" for="inlineFormInputGroup">Username</label>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">Live Search Here</div>
                                    </div>
                                    <input type="text" class="form-control" v-model="search" id="inlineFormInputGroup"
                                        placeholder="Username">
                                </div>
                            </div>
                            <div class="dropdown mx-auto" style="margin-top:-3px;">
                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort By :
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#" @click="sortByCategory">Category</a>
                                    <a class="dropdown-item" href="#" @click="sortByName">Name</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-menu">
                            <div class="card d-inline-block mt-5 mb-2" v-for="item in filteredData" :key="item.id">
                                <img :src="item.link_gambar" alt="" width="250" height="200">
                                <div class="card-body">
                                    <h5>{{ item.nama }}</h5>
                                    <h6><span>Rp.</span> {{ item.harga }}</h6>
                                    <button type="button" style="margin-right:10px; color:white;"
                                        v-on:click="edit(item)" class="btn btn-warning btn-sm" data-toggle="modal"
                                        data-target="#editModal">
                                        Edit
                                    </button>
                                    <button type="button" @click="hapus(item)"
                                        class="btn btn-danger btn-sm">Delete</button>
                                    <button type="button" style="margin-top:5px;" @click="addToCart(item)"
                                        class="btn btn-primary btn-block">Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3" style="background-color: #ffff; height: 100vh;">
                        <div class="empty-item" style="text-align: center;" v-if="listCart.length == 0">
                            <img src="../../assets/images/food-and-restaurant.svg" alt="">
                            <h5 style="margin-top:-45px;">Your cart is empty</h5>
                            <small style="color:gray;">
                                <h6>Please add some items from the menu</h6>
                            </small>
                        </div>
                        <div class="menu-cart" v-if="listCart.length">
                            <div class="food-name-cart mx-auto">
                                <h5>Cart <span
                                        style="background-color:#57CAD5; border-radius:20px; color:white;">{{ totalQty() }}</span>
                                </h5>
                            </div>
                            <div class="card-listed">
                                <div class="card mt-3">
                                    <ul class="list-group">
                                        <li class="list-group-item" v-for="item in listCart" :key="item.id">
                                            <button @click="removeItem(item.id)" type="button" class="close"
                                                data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <div class="media" style="width:90%;">
                                                <img class="mr-3" :src="item.link_gambar" width="150px" />
                                                <div class="media-body">
                                                    <h6 class="mt-0">{{ item.nama }}</h6>
                                                    <button @click="reduceQty(item.id)"
                                                        class="btn-qty btn-sm btn-secondary">-</button>
                                                    x {{ item.qty }}
                                                    <button @click="addQty(item.id)"
                                                        class="btn-qty btn-sm btn-secondary">+</button>
                                                    <p class="mt-3">Rp. {{ item.harga }}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="price-total-cart">
                                <h6>Total: <span style="margin-left:180px;">Rp. {{ totalPrice() }}</span></h6>
                                <small>*Belum termasuk ppn</small>
                            </div>
                            <div class="button-checkout-cancel ">
                                <div class="button-checkout">
                                    <button type="button" class="btn btn-primary" data-toggle="modal"
                                        data-target="#checkoutModal">Checkout</button>
                                </div>
                                <div class="button-cancel">
                                    <button>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Modal -->
            <!-- Button trigger modal -->
            <!-- Modal -->
            <div class="modal fade" id="addedModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="col-md-12">
                            <div class="modal-title mt-3">
                                <h3>Add item</h3>
                            </div>
                            <form @submit.prevent="save">
                                <div class="form-group row mt-3">
                                    <label for="name" class="col-sm-2 col-form-label">
                                        <h6>Name</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="text" v-model="form.nama" name="" class="form-control" id="name">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="image" class="col-sm-2 col-form-label">
                                        <h6>Image</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="text" v-model="form.link_gambar" class="form-control" id="image">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="price" class="col-sm-2 col-form-label">
                                        <h6>Price</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="form.harga" id="price"
                                            name="price">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="stok" class="col-sm-2 col-form-label">
                                        <h6>Stok</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="form.stok" id="stok"
                                            name="stok">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="category" class="col-sm-2 col-form-label">
                                        <h6>Category</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="form.kategori_id" id="stok"
                                            name="stok">
                                    </div>
                                </div>

                                <div class="buttons-modal-decision mb-3 float-right">
                                    <button type="button" style="margin-right:20px;" class="btn btn-modal-cancel" data-dismiss="modal">Cancel</button>
                                    <button type="submit" @click="goToHomepage(data)" class="btn btn-modal-add">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="col-md-12">
                            <div class="modal-title mt-3">
                                <h3>Edit item</h3>
                            </div>
                            <form @submit.prevent="update">
                                <div class="form-group row mt-3">                                    
                                    <div class="col-sm-10">
                                        <input type="hidden" v-model="edit_data.id" name="" class="form-control" id="id">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="name" class="col-sm-2 col-form-label">
                                        <h6>Name</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="text" v-model="edit_data.nama" name="" class="form-control"
                                            id="name">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="image" class="col-sm-2 col-form-label">
                                        <h6>Image</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="text" v-model="edit_data.link_gambar" class="form-control"
                                            id="image">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="price" class="col-sm-2 col-form-label">
                                        <h6>Price</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="edit_data.harga" id="price"
                                            name="price">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="stok" class="col-sm-2 col-form-label">
                                        <h6>Stok</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="edit_data.stok" id="stok"
                                            name="stok">
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="category" class="col-sm-2 col-form-label">
                                        <h6>Category</h6>
                                    </label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="edit_data.kategori_id"
                                            id="stok" name="stok">
                                    </div>
                                </div>

                                <div class="buttons-modal-decision mb-3 float-right">
                                    <button type="button" style="margin-right:20px;" class="btn btn-modal-cancel" data-dismiss="modal">Cancel</button>
                                    <button type="submit" v-on:click="update()" class="btn btn-modal-add">Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="checkoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Checkout Items</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="saveCheckout">
                                <div class="header-modal-text form-inline">
                                    <div class="mr-auto">
                                        <small>
                                            <h6>Cashier :<span> Pevita Pearce</span></h6>
                                            <input type="hidden" class="form-control" v-model="checkout.namaCashier">
                                        </small>
                                    </div>
                                    <div class="ml-auto">
                                        <h6 style="margin-left:130px;">Receipt no: <span>#010410919</span></h6>
                                        <input type="hidden" class="form-control" v-model="checkout.codeCheckout">
                                    </div>
                                </div>
                                <div class="modal-information form-inline mt-3" v-for="item in listCart" :key="item.id">
                                    <div class="modal-name-item">
                                        <h5>{{ item.nama }} <span> {{ item.qty }}x </span></h5>
                                        <input type="hidden" class="form-control" v-model="item.orders">
                                    </div>
                                    <div class="modal-price ml-auto">
                                        <h5>Rp. <span>{{ item.harga }}</span></h5>
                                        <input type="hidden" class="form-control" v-model="item.harga">
                                    </div>
                                </div>
                                <div class="modal-information form-inline mt-3">
                                    <div class="modal-name-item">
                                        <h5>Ppn 10% <span> </span></h5>
                                    </div>
                                    <div class="modal-price ml-auto">
                                        <h5>Rp. <span>10500</span></h5>
                                        <input type="hidden" class="form-control" v-model="checkout.checkoutPpn">
                                    </div>
                                </div>
                                <div class="modal-information form-inline mt-3 ">
                                    <div class="modal-name-item ml-auto" style="margin-right:20px;">
                                        <h5>Total :</h5>
                                    </div>
                                    <div class="modal-price">
                                        <h5>Rp. <span>{{ totalAll() }}</span></h5>
                                        <input type="hidden" class="form-control" v-model="checkout.totalCheckout">
                                    </div>
                                </div>
                                <div class="modal-information form-inline mt-3 ">
                                    <div class="modal-name-item mr-auto" style="margin-right:20px;">
                                        <h5>Payment :<span> Cash</span></h5>
                                    </div>
                                </div>
                                <input type="hidden" class="form-control" v-model="checkout.dateCheckout">
                                <div class="modal-footer" style="display:flex; flex-direction:column;">
                                    <button type="submit"
                                        class="btn btn-secondary btn-block btn-checkout-print">Print</button>
                                    <button type="button" class="btn btn-primary btn-block btn-checkout-email">Send
                                        Email</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: 'HomePage',
        components: {},
        data() {
            return {
                value: 1,
                form: {
                    id: '',
                    nama: '',
                    harga: '',
                    stok: '',
                    kategori_id: '',
                    link_gambar: ''
                },
                data: [],
                search: '',
                listCart: [],
                edit_data: {
                    id: '',
                    nama: '',
                    harga: '',
                    stok: '',
                    kategori_id: '',
                    link_gambar: ''
                },
                checkout : {
                    invoices : '',
                    cashier : '',
                    date : '',
                    orders : '',
                    amount : ''                    
                },
            }
        },
        methods: {
            goToHistory(data) {
                this.$router.push({ path: "/history", params: {data} })
            },
            goToHomepage(data) {
                this.$router.push({ path: "/", params: {data} })
            },            
            save() {
                axios.post(process.env.VUE_APP_URL, this.form)
                    .then(() => {
                        this.form.nama = ''
                        this.form.harga = ''
                        this.form.stok = ''
                        this.form.kategori_id = ''
                        this.form.link_gambar = ''
                        alert("Data Berhasil Disimpan")
                        this.load()
                    })
            },
            saveCheckout() {
                console.log("Masuk")
                axios.post("http://localhost:4500/history/", this.checkout)
                    .then(() => {
                        this.checkout.invoices = '#10928'
                        this.checkout.cashier = 'Cashier 3'
                        this.checkout.date = '2020-09-15',
                        this.checkout.orders = 'Cake',
                        this.checkout.amount = '130000',
                        alert("Data Berhasil Disimpan")
                        this.load()
                    })
                    .catch(err => {
                        console.log(err)
                    })                              
            },
            hapus: function (item) {
                axios.delete(process.env.VUE_APP_URL + `/delete/${item.id}`)
                    .then(() => {
                        alert('deleted')
                        this.load()
                        this.form.nama = ''
                        this.clean()

                    })                    
            },
            edit(item) {
                const data = {
                    ...this.edit_data
                }
                data.id = item.id
                data.nama = item.nama
                data.harga = item.harga
                data.stok = item.stok
                data.kategori_id = item.kategori_id
                data.link_gambar = item.link_gambar
                this.edit_data = data
            },
            update() {
                axios.put(process.env.VUE_APP_URL, this.edit_data)
                    .then(() => {
                        alert("Masuk")
                        this.load()
                        this.edit_data.id = ''
                        this.edit_data.nama = ''
                        this.edit_data.harga = ''
                        this.edit_data.stok = ''
                        this.edit_data.kategori_id = ''
                        this.edit_data.link_gambar = ''
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            sortByCategory() {
                this.data.sort((a, b) => a.nama_kategori > b.nama_kategori ? 1 : -1)
            },
            sortByName() {
                this.data.sort((a, b) => a.nama > b.nama ? 1 : -1)
            },
            addToCart(item) {
                this.listCart.push({
                    ...item,
                    qty: 1
                })
            },
            addQty(id) {
                const currentItem = this.listCart.find((product) => product.id === id);
                currentItem.qty++
            },
            reduceQty(id) {
                const currentItem = this.listCart.find((product) => product.id === id);
                if (currentItem.qty > 1) {
                    currentItem.qty--
                } else {
                    this.listCart = this.listCart.filter(product => product.id !== id);
                }
            },
            removeItem(id) {
                this.listCart = this.listCart.filter(product => product.id !== id);
            },
            totalQty() {
                return this.listCart.reduce((a, b) => a + b.qty, 0)
            },
            totalPrice() {
                return this.listCart.reduce((a, b) => a + b.qty * b.harga, 0)
            },
            totalAll() {
                const ppn = 10500;
                return this.listCart.reduce((a, b) => a + b.qty * b.harga + ppn, 0)
            }
        },
        mounted() {
            axios.get(process.env.VUE_APP_URL)
                .then((res) => {
                    this.data = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        computed: {
            filteredData: function () {
                return this.data.filter((product) => {
                    return product.nama.match(this.search);
                });
            }
        },
    }
</script>

<style lang="css" scoped>
    body {
        background-color: #E5E5E5;
    }

    /* Alternate Element */

    /* end of alternate */

    /* Navbar */
    .navbar {
        background-color: #FFFFFF;
        width: 75%;

    }

    .navbar-brand {
        margin-left: 10px;
        position: fixed;
    }

    .food-name-cart {
        height: 50px;
        background-color: #FFFFFF;
        margin-left: -20px !important;
        padding-top: 10px;
        text-align: center;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }

    .navbar {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }

    /* end navbar */

    /* Sidebar */

    .col-md-1 {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
    }

    .sidebar img {
        margin-top: 15px;
    }

    /* end of navbar */
    /* Main bar */
    .col-md-8 {
        padding-left: 20px;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        height: 550px;
    }

    .col-md-8 .menu-option {
        background-color: #ecf0f1;
        height: 50px;
        text-align: center;
        padding-top: -4px;
        border-radius: 20px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
    }

    .col-md-8 .card-menu {
        margin-top: 50px;
    }

    .col-md-8 .card {
        width: 260px;
        height: 200px;
        margin-left: 20px;
        background-color: transparent;
        border-color: transparent;

    }

    /* end of main bar */


    /* Aside bar */
    .col-md-3 {
        margin-top: -49px;
        padding-right: 10px;
    }

    .col-md-3 .card {
        height: 50px;
        display: flex;
        background-color: transparent;
        border-color: transparent;
    }

    .col-md-3 .empty-item {
        padding-top: 150px !important;
    }

    .col-md-3 .card-listed {
        overflow-y: scroll;
        height: 400px;
    }

    .col-md-3 .card .no-gutters .card-body h5 {
        margin-top: -20px;
    }

    .col-md-3 .card .no-gutters .card-body input {
        margin-top: 10px;
        height: 24px;
        width: 30px;
        border-color: transparent;
        color: yellowgreen;
        font-weight: bold;
    }

    .col-md-3 .card .no-gutters .card-body button {
        margin-top: 10px;
        height: 30px;
        width: 30px;
        border-color: transparent;
        color: yellowgreen;
        font-weight: bold;
    }

    .col-md-3 .card .no-gutters .card-body h6 {
        margin-top: 9px;
        text-align: right;
    }

    .price-total-cart {
        margin-top: 20px;
    }

    .col-md-3 .button-checkout-cancel {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        padding-right: 8px;
    }

    .col-md-3 .button-checkout-cancel button {
        width: 100%;
        height: 40px;

    }

    .col-md-3 .button-checkout-cancel .button-checkout button {
        background-color: #57CAD5;
        border: none;
        color: #FFFFFF
    }

    .col-md-3 .button-checkout-cancel .button-cancel button {
        margin-top: 10px;
        background-color: #F24F8A;
        border: none;
        color: #FFFFFF
    }


    /* Modal  */

    /* Modal Checkout */
    .modal-button-added {
        background-color: transparent;
        border: none;
    }

    .modal-button-added::after {
        border: none;
    }

    .modal-button-added img {
        width: 40px;
        height: 40px;
        margin-left: -5px;
        border: none;
    }

    /* end modal checkout */

    /* Modal Added */

    .form-control {
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    }

    .buttons-modal-decision .btn-modal-cancel {
        background-color: #F24F8A;
        color: #ffff;
    }

    .buttons-modal-decision .btn-modal-add {
        background-color: #57CAD5;
        color: #ffff
    }

    .btn-checkout-print {
        background-color: #F24F8A;
    }

    /* end modal added */

    @media (max-width:575.98px) {
        .navbar {
            width: 100%;
        }
    }
</style>
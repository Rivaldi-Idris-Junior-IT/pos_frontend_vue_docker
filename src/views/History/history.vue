<template>
    <div id="app">
        <div class="History">
            <header>
                <nav class="navbar navbar-light ">
                    <a class="navbar-brand" href="#">
                        <img src="../../assets/images/menu (1).svg" width="30" height="30"
                            class="d-inline-block align-top" alt="" loading="lazy">
                    </a>
                    <div class="justify-content-center mx-auto">
                        <div class="food-name-brand mx-auto">
                            <h5>History</h5>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section id="main-side-aside">
                    <div class="row">
                        <div class="col-md-1" style="background-color:#ffff;">
                            <div class="sidebar pl-4">
                                <a href="#" @click="goToHomepage(data)"><img src="../../assets/images/fork.svg" alt="" width="40" height="40"></a>
                                <a href="#" @click="goToHistory(data)"><img src="../../assets/images/clipboard.svg" alt="" width="40"
                                        height="40"></a>                                
                            </div>
                        </div>
                        <div class="col-md-11 mt-1">
                            <div class="card-list d-inline-block pt-3 pr-1">
                                <div class="card pt-3 d-inline-block card-income">
                                    <div class="card-body">
                                        <small>
                                            <h6>Todays Income</h6>
                                        </small>
                                        <h2>Rp. 1000.000</h2>
                                        <small>
                                            <h6>+2% Yesterday</h6>
                                        </small>
                                    </div>
                                </div>
                                <div class="card pt-3 d-inline-block card-orders">
                                    <div class="card-body">
                                        <small>
                                            <h6>Todays Income</h6>
                                        </small>
                                        <h2>Rp. 1000.000</h2>
                                        <small>
                                            <h6>+2% Yesterday</h6>
                                        </small>
                                    </div>
                                </div>
                                <div class="card pt-3 d-inline-block card-year-income">
                                    <div class="card-body">
                                        <small>
                                            <h6>Todays Income</h6>
                                        </small>
                                        <h2>Rp. 1000.000</h2>
                                        <small>
                                            <h6>+2% Yesterday</h6>
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="mytable">
                                <h2>Recent Orders</h2>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Invoices</th>
                                            <th scope="col">Cashier</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Orders</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="item in data" :key="item.id">
                                    <tr>
                                        <th scope="row">{{ item.invoices }}</th>
                                        <th scope="row">{{ item.cashier }}</th>
                                        <th scope="row">{{ item.date }}</th>
                                        <th scope="row">{{ item.orders }}</th>
                                        <th scope="row">{{ item.amount }}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    </div>
</template>

<script>    
    import axios from "axios"

    export default {
        name: 'History',
        methods : {
            goToHistory(data) {
                this.$router.push({ path: "/history", params: {data} })
            },
            goToHomepage(data) {
                this.$router.push({ path: "/", params: {data} })
            },
        },
        components: {            
        },
        data() {
            return {
                data: null,
            }
        },
        mounted() {
            axios.get("http://localhost:4500/backend/history/")
                .then((res) => {
                    this.data = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
</script>

<style lang="css" scoped>
    body {
        background-color: #FFFFFF;
    }

    /* Alternate Element */




    /* end of alternate */

    /* Navbar */
    .navbar {
        background-color: #FFFFFF;
    }

    .navbar-brand {
        margin-left: 10px;
    }

    .food-name-cart {
        margin-right: 40px;
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
    .col-md-11 {
        padding-left: 20px;
        flex-wrap: wrap;
        display: flex;
        height: 120vh;

    }

    .col-md-11 .card-list {
        margin-left: -10px;
    }

    .col-md-11 .card-list .card {
        width: 402px;
        height: 213px;
    }

    .col-md-11 .card-list .card-income {
        background: linear-gradient(278.29deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%);
        filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
        border-radius: 10px;

    }

    .col-md-11 .card-list .card-orders {
        background: linear-gradient(278.29deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%);
        filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
        border-radius: 10px;
        margin-left: 5px;
    }

    .col-md-11 .card-list .card-year-income {
        background: linear-gradient(278.29deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%);
        filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
        border-radius: 10px;
        margin-left: 5px;
    }

    .mytable .table {
        width: 1200px;
    }


    /* Modal Added */

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
    /* end modal added */
</style>
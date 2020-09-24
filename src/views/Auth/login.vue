<template>
    <div id="login">        
        <div class="container">            
            <div class="row">                                
                <section class="col-8 col-sm-6 col-md-4 mx-auto my-lg mt-md-5 mt-sm-5 mt-5">                                        
                    <div class="card">
                        <div class="card-header text-center">
                            <h5 class="card-tite text-center mb-3">Login User</h5>
                            <img src="../../assets/login/undraw_business_shop_qw5t.svg" width="150" height="150" alt="">
                        </div>
                        <div class="card-body">
                            <div class="form-group mt-3">
                                <label for="">Username</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-group mt-3">
                                <label for="">Password</label>
                                <input type="password" class="form-control">
                            </div>
                            <div class="form-group" style="margin-top: 30px;">
                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    #login {
        background-image: url("../../assets/login/cafe_bck.jpg");
        
        
        /* Full height */
        width: 100%; 
        height: 700px; 
        
        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;        
    }

    .card {
        box-shadow: 0px 0px 10px 0px #000;        
    }
</style>
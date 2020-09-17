<template>
    <div class="item-product">        
            <img :src="link_gambar" alt="" width="250" height="200">
            <div class="card-body">
                <h5>{{ nama }}</h5>
                <h6><span>Rp.</span> {{ harga }}</h6>
                <h6>{{ nama_kategori }}</h6>               
            </div>        
    </div>
</template>

<script>
    export default {
        name: "items_product",
        props : {
            nama: {
            type : String,
            required : true,
            },            
            harga: {
            type : String,
            required : true,
            },            
            link_gambar: {
            type : String,
            required : true,
            },
            nama_kategori: {
            type : String,
            required :true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
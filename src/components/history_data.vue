<template>
    <div class="history_data">
    <tr>
        <th scope="row">{{ invoices }}</th>
        <th scope="row">{{ cashier }}</th>
        <th scope="row">{{ date }}</th>
        <th scope="row">{{ orders }}</th>
        <th scope="row">{{ amount }}</th>
    </tr>
    </div>
</template>

<script>
    export default {
        name: "history",
        props: {
            invoices: {
                type: String,
                required: true,
            },
            cashier: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            orders: {
                type: String,
                required: true,
            },
            amount: {
                type: String,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>
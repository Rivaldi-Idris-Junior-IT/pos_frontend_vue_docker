import Vue from 'vue'
import VueRouter from 'vue-router'
require("../node_modules/bootstrap/dist/css/bootstrap.css")

Vue.use(VueRouter)


import home_page from "./views/Home_Page/homepage"
import history from "./views/History/history"
import login from "./views/Auth/login"
import logout from "./views/Auth/logout"


const mainRouter = new VueRouter({
    mode: 'history',
    routes: [
        {
            path : "/",
            name : "Login",
            component: login,
        },
        {
            path : "/homepage",
            name : "HomePage",
            component: home_page,
        },
        {
            path : "/history",
            name : "History",
            component: history,
        },        
        {
            path : "/logout",
            name : "Logout",
            component: logout,
        }
    ]
})

export default mainRouter
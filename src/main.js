import Vue from 'vue'
import Router from 'vue-router'
import Apartment from './components/Apartment.vue'
import ApartmentFeedback from './components/ApartmentFeedback.vue'
import RenterFeedback from './components/RenterFeedback.vue'
import Users from './components/Users.vue'
import Renter from './components/Renter.vue'
import App from './App.vue'
import AddApartment from "@/components/AddApartment";
import LandlordApartments from "@/components/LandlordApartments";

Vue.use(Router)

Vue.config.productionTip = false




const routes = [
    {
        path: '/apartment/feedback', component: ApartmentFeedback, props: {message: "Отзывы на квартиры"}
    },
    {
        path: '/apartment', component: Apartment,
        props: {message: 'Квартиры:'},
        children: [
            {
                path: '/apartment/:id',
                component: Apartment,
                props: {message: 'Квартира:'},
            }

        ]
    },
    {
        path: '/landlord', component: LandlordApartments,
        props: {message: 'Квартиры:'},
        children: [
            {
                path: '/landlord/:login',
                component: LandlordApartments,
            }

        ]
    },
    // {
    //     path: '/apartment/feedback', component: ApartmentFeedback, props: {message: "Отзывы на квартиры"}
    // },
    {
        path: '/user', component: Users, props: {message: "Пользователи"}
    },
    {
        path: '/renter', component: Renter, props: {isAdd: false},
        children: [
            {
                path: '/renter/:login',
                component: Renter,
                props: {isAdd: true}
            }

        ]
    },
    {
        path: '/renter/feedback', component: RenterFeedback, props: {message: "Отзывы на нанимателей"}
    },
    {
        path: '/addApartment', component: AddApartment
    }
]

const router = new Router({
    routes // сокращённая запись для `routes: routes`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')



//   new Vue({
//   render: h => h(App),
// }).$mount('#app')

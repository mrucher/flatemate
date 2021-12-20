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

import * as VueGoogleMaps from 'vue2-google-maps'
import Geocoder from "@pderas/vue2-geocoder";

import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)

Vue.use(Geocoder, {
    defaultCountryCode: null, // e.g. 'CA'
    defaultLanguage:    null, // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   'AIzaSyBos7Wp8jrFdVzh-X_CfDLlz9MzYVFAsAo'
});

Vue.use(VueGoogleMaps, {

    load: {

        key: 'AIzaSyBos7Wp8jrFdVzh-X_CfDLlz9MzYVFAsAo',

        libraries: 'places',

    }

});

// Vue.$geocoder.setDefaultMode('address');      // this is default
// var addressObj = {
//     address_line_1: '1600 Amphitheatre Parkway',
//     address_line_2: '',
//     city:           'Mountain View',
//     state:          'CA',               // province also valid
//     zip_code:       '94043',            // postal_code also valid
//     country:        'United States'
// }
// Vue.$geocoder.send(addressObj, response => { console.log(response) });

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
                path: '/apartment/:login',
                component: Apartment,
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


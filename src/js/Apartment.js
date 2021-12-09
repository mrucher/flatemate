import Vue from 'vue'
// import Router from 'vue-router'
import App from "@/App";

new Vue({
    props: {
      msg: '228'
    },
    render: h => h(App)
}).$mount('#apartment')
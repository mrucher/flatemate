<script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBos7Wp8jrFdVzh-X_CfDLlz9MzYVFAsAo"
    async
></script>


<!-- google map markerclusterer-->
<script src="https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js">
</script>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Flatmate"/>
    <div v-if="isLogin">
      <ul class="nav">
        <li>
          <router-link to="/apartment">Перейти к Apartment</router-link>
        </li>
        <li>
          <router-link to="/user">Перейти к User</router-link>
        </li>
        <li>
          <router-link to="/renter">Перейти к Renter</router-link>
        </li>

      </ul>
      <router-view></router-view>
    </div>
    <div v-if="isChoose">
      <button v-on:click="chooseSignin">Авторизоваться</button>
      <br>
      <button v-on:click="chooseSignup">Регистрация</button>
      <br>
    </div>
    <div v-if="isSignin">
      <input v-model="login" placeholder="Логин">
      <br>
      <input v-model="password" placeholder="Пароль">
      <br>
      <button v-on:click="signin">Авторизоваться</button>
    </div>
    <div v-if="isSignup">
      <span>Введите данные</span>
      <br>
      <input v-model="login" placeholder="Логин">
      <br>
      <input v-model="password" placeholder="Пароль">
      <br>
      <input v-model="firstname" placeholder="Имя">
      <br>
      <input v-model="city" placeholder="Город">
      <br>
      <input v-model="email" placeholder="Почта">
      <br>
      <button v-on:click="signup">Отправить</button>
      <br>
      <div v-if="isNotFullData">
        Введены не все данные
      </div>
    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Apartment from './components/Apartment.vue'
// import Foo from './components/Foo.vue'

export default {
  name: 'App',
  data() {
    return {
      isLogin: false,
      isChoose: false,
      isSignin: false,
      isSignup: false,
      isNotFullData: false,
      login: undefined,
      password: undefined,
      firstname: undefined,
      city: undefined,
      email: undefined,
      token: undefined,

    }
  },
  components: {
    HelloWorld,
    Apartment

    // Foo
  },
  methods: {
    chooseSignin:  function() {
      this.isChoose = false;
      this.isSignin = true;
    },
    signin: function() {
      var that = this;
      let token = undefined
      let tmp = {
        login: this.login,
        password: this.password
      }
      let json = JSON.stringify(tmp);

      var xhr = new XMLHttpRequest();

      xhr.open("POST", 'http://localhost:8080/auth/signin', true)
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.send(json)
      xhr.onload = function() {
        if (xhr.status !== 200) {
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
          token = JSON.parse(xhr.response)
          that.isSignin = false;
          that.isLogin = true;
          that.token = token["token"]
          sessionStorage.setItem('token', token["token"]);
          sessionStorage.setItem('login', that.login);
        }
      };



    },
    chooseSignup:  function() {
      this.isChoose = false;
      this.isSignup = true;
    },
    signup: async function() {
      var that = this;
      if (this.login !== undefined && this.password !== undefined
          && this.city !== undefined && this.email !== undefined && this.firstname !== undefined) {
        this.isNotFullData = false
        let user = {
          login: this.login,
          password: this.password,
          city: this.city,
          email: this.email,
          firstname: this.firstname
        }
        let json = JSON.stringify(user);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", 'http://localhost:8080/auth/signup', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        xhr.send(json)
        xhr.onload = function () {
          if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            that.isSignup = false;
            that.isSignin = true;
          }
        };

      }
    },
    created() {
      alert(sessionStorage.getItem("token"))
      if (sessionStorage.getItem("token") !== undefined) {
        console.log(sessionStorage.getItem("token"))
          this.isLogin = true;
      }
      else {
        console.log(sessionStorage.getItem("token"))
        this.isChoose = true;
      }
    },


  },
  mounted(){
    if (sessionStorage.getItem("token") !== null) {
      this.isLogin = true;
      this.login = sessionStorage.getItem("login")
      console.log(sessionStorage.getItem("token"))
    }
    else {
      this.isChoose = true;
    }
  }
}
</script>

<!--<script src="./main.js"></script>-->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul.nav > li {
  display: inline;
  margin-right: 10px;
}
</style>

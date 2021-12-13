<template>
  <div>
    <h3>Профиль</h3>
    <div>
      <div v-for="user in users" v-bind:key="user.id">
        <ul>
          <li>ID: {{ user.id }} </li>
          <li>Логин: {{ user.login }}</li>
          <li>Имя: {{user.firstname}}</li>
          <li>Город: {{user.city}}</li>
          <li>Почта: {{user.email}}</li>

        </ul>
        <ul class="nav">
          <li><router-link to="/addApartment">Добавить квартиру</router-link></li>
          <li><router-link :to="{path: '/apartment/' + login }">Мои квартиры</router-link></li>
          <li><router-link :to="{path: '/renter/' + login }">Хочу быть в списке ищущих квартиру</router-link></li>
        </ul>

      </div>
    </div>
<!--    <br>-->
<!--    <router-link to="/addApartment">Добавить квартиру</router-link>-->
<!--    <br>-->
<!--    <router-link :to="{path: '/landlord/' + login }">Мои квартиры</router-link>-->


  </div>
</template>

<!--<script>-->
<!--  import '../js/utils.js'-->
<!--  console.log(getUserByLogin("admin"))-->
<!--</script>-->


<script>
import * as Utils from '../js/utils.js'
export default {

  name: "Users",
  props: {
    message: String
  },
  // computed: {
  //   id: function () {
  //     return "2676c2b6-8832-4781-9817-ed6f2819657b"
  //   }
  // },
  data() {
    return {
      isShow: true,
      isNotFullData: false,
      login: undefined,
      users: []
    }
  },
  methods: {
    getUsers: async function () {
      this.login = sessionStorage.getItem("login")
      Utils.getUserByLogin(this, this.login )
    },
    update: function () {
      this.isShow = !this.isShow;
    },
    send: async function () {
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

        console.log(json)


        var xhr = new XMLHttpRequest();

        xhr.open("POST", 'http://localhost:8080/user', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
        xhr.send(json);
      } else {
        this.isNotFullData = true
        alert("Не все данные")
      }
    }
  },
  mounted() {
    this.getUsers()
  },
}
</script>

<style scoped>

</style>
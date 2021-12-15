<template>
  <div>
    <h3>Профиль</h3>
    <div class="content">
      <div v-for="user in users" v-bind:key="user.id">
        <b-list-group>
          <b-list-group-item>Логин: {{ user.login }}</b-list-group-item>
          <b-list-group-item>Имя: {{user.firstname}}</b-list-group-item>
          <b-list-group-item>Город: {{user.city}}</b-list-group-item>
          <b-list-group-item>Почта: {{user.email}}</b-list-group-item>

        </b-list-group>
        <b-nav align="center">
          <b-nav-item active href="#/addApartment">Добавить квартиру</b-nav-item>
          <b-nav-item active :to="{path: '/apartment/' + login }">Мои квартиры</b-nav-item>
          <b-nav-item active :to="{path: '/renter/' + login }">Хочу быть в списке ищущих квартиру</b-nav-item>
        </b-nav>

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
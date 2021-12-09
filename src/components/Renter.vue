<template>
  <div>
    <div v-if="isShow">
      <span>Введите данные</span>
      <br>
      <input v-model="maxPrice" placeholder="Максимальная цена">
      <br>
      <input v-model="rooms" placeholder="Количество комнат">
      <br>
      <input v-model="lodgers" placeholder="Количество жильцов">
      <br>
      <button v-on:click="loadAparts">Отправить</button>
    </div>
<!--    <div v-else>-->
<!--      <span>Введите данные</span>-->
<!--      <br>-->
<!--      <input v-model="rooms" placeholder="Количество комнат">-->
<!--      <br>-->
<!--      <input v-model="lodgers" placeholder="Количество жильцов">-->
<!--      <br>-->
<!--      <button v-on:click="loadAparts">Отправить</button>-->
<!--    </div>-->
    <div v-if="isFiltred">
      <div v-for="apartment in apartments" v-bind:key="apartment.id">
        <ul>
          <li>ID {{ apartment.id }}</li>
          <li>Количество комнат: {{apartment.roomsCount}}</li>
          <li>Количество жильцов: {{apartment.lodgerCount}}</li>
          <li>Адрес: {{ apartment.address }}</li>
          <li>Геопозиция: {{apartment.location}}</li>
          <li>Цена: {{apartment.price}}</li>
        </ul>
        <router-link :to="{path: '/apartment/' + apartment.id }">Обзор</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import * as Utils from "@/js/utils";

export default {
  name: "Renter",
  props: {
    message: String
  },
  data() {
    return {
      isShow: true,
      maxPrice:undefined,
      users: [],
      apartments: [],
      isFiltred: false,
      rooms: undefined,
      lodgers: undefined,
      login: undefined
    }
  },
  methods: {
    update: function () {
      this.isShow = !this.isShow;
    },
    send: function () {
      if (this.maxPrice !== undefined ) {
        let renter = {
          max_price: Number(this.maxPrice),
          active: true,
          user: this.users[0].id

          // location: this.location
        }
        // console.log(renter)
        let json = JSON.stringify(renter);
        // console.log(json)
        // console.log(json)
        // Utils.getUserByLogin(this, sessionStorage.getItem("login"))
        Utils.postPenter(this, json)

      } else {
        alert("Введены не все данные")
      }
      this.isShow = false
      this.isFiltred = true
    },
    loadAparts: function () {
      Utils.getApartmentsFilter(this, this.rooms, this.lodgers, this.maxPrice)
      this.send()
    }
  },
  mounted() {
    this.login = sessionStorage.getItem("login")
    Utils.getUserByLogin(this, this.login)
  }
}
</script>

<style scoped>

</style>
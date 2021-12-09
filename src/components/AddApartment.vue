<template>
  <div id='AddApartment'>
    <span>Введите данные</span>
    <br>
    <input v-model="roomsCount" placeholder="Количество комнат">
    <br>
    <input v-model="lodgerCount" placeholder="Количество жильцов">
    <br>
    <input v-model="address" placeholder="Адрес">
    <br>
    <input v-model="price" placeholder="Цена">
    <br>
    <button v-on:click="send">Отправить</button>
    <br>
    <router-link :to="{path: '/user/'}">Назад</router-link>
  </div>
</template>

<script>
import * as Utils from "@/js/utils";

export default {
  name: "AddApartment",
  data() {
    return {
      roomsCount: undefined,
      lodgerCount: undefined,
      address: undefined,
      price: undefined,
      users: []
    }
  },
  methods: {
    send: function (){
      if (this.roomsCount !== undefined && this.lodgerCount !== undefined
          && this.address !== undefined && this.price !== undefined) {
        let apart = {
          roomsCount: Number(this.roomsCount),
          lodgerCount: Number(this.lodgerCount),
          address: this.address,
          price: Number(this.price),
          active: true

          // location: this.location
        }
        let json = JSON.stringify(apart);
        // console.log(json)
        // Utils.getUserByLogin(this, sessionStorage.getItem("login"))
        Utils.postApartment(this, json)

      } else {
        alert("Введены не все данные")
      }
    }
  }
}
</script>

<style scoped>

</style>
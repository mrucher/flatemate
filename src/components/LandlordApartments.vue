<template>
  <div id='LandlordApartments'>
    <h4>Мои квартиры</h4>
    <div>
      <div>
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
      <br>
      <router-link :to="{path: '/user/'}">Назад</router-link>

    </div>
  </div>
</template>

<script>

import * as Utils from "@/js/utils";

export default {
  name: "LandlordApartments",
  data() {
    return {
      roomsCount: undefined,
      lodgerCount: undefined,
      address: undefined,
      price: undefined,
      login: undefined,
      users: [],
      apartsId: [],
      apartments: []
    }
  },
  methods: {
    getLandlords: async function () {
      this.login = sessionStorage.getItem("login")
      Utils.getUserByLogin(this, this.login, true )
      // let u = this.users
      // console.log(u)
    },

  },
  mounted() {
    console.log(this.$route.params.login)
    this.getLandlords()
  },
}
</script>

<style scoped>

</style>
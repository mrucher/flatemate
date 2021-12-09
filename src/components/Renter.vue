<template>
  <div>
    <div v-if="isAdd">
      <span>Введите данные</span>
      <br>
      <input v-model="maxPrice" placeholder="Максимальная цена">
      <br>
      <button v-on:click="send">Отправить</button>
    </div>
    <div v-else>
      <div>
        <div v-for="renter in renters" v-bind:key="renter.id">
          <ul>
            <li>ID: {{renter.id}}</li>
            <li>Пользователь: {{renter.user}}</li>
            <li>Максимальная цена: {{renter.max_price}}</li>
          </ul>

        </div>
      </div>

    </div>


  </div>
</template>

<script>
import * as Utils from "@/js/utils";

export default {
  name: "Renter",
  props: {
    message: String,
  },
  data() {
    return {
      isShow: true,
      maxPrice:undefined,
      users: [],
      apartments: [],
      renters: [],
      isFiltred: false,
      rooms: undefined,
      lodgers: undefined,
      login: undefined,
      isAdd: undefined
    }
  },
  methods: {
    update: function () {
      this.isShow = !this.isShow;
    },
    send: function () {
      let renter = {
        max_price: this.maxPrice,
        user: this.users[0].id,
        active: true
      }
      // console.log(renter)
      renter = JSON.stringify(renter)
      Utils.postPenter(this, renter)
    },
    getRenters: function () {
      Utils.getRenters(this)
    }
  },
  mounted() {
    this.isAdd = this.$route.params.login !== undefined
    this.login = sessionStorage.getItem("login")
    this.getRenters()
    console.log(this.isAdd)
  }
}
</script>

<style scoped>

</style>
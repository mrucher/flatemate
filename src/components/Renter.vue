<template>
  <div>
    <div v-if="isAdd">
      <h4>Введите данные</h4>
      <br>
      <b-form-input v-model="maxPrice" placeholder="Максимальная цена"></b-form-input>
      <br>
      <b-button v-on:click="send">Отправить</b-button>
    </div>
    <div v-else>
      <div>
        <div v-for="renter in renters" v-bind:key="renter.id">
          <b-list-group>
            <b-list-group-item>Пользователь: {{renter.user}}</b-list-group-item>
            <b-list-group-item>Максимальная цена: {{renter.max_price}}</b-list-group-item>
          </b-list-group>

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
      rentersLogins: [],
      isFiltred: false,
      rooms: undefined,
      lodgers: undefined,
      login: undefined,
      loginTmp: undefined,
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
    if (this.isAdd) {
      Utils.getUserByLogin(this, this.login)
    }
    // let that = this
    Utils.getRenters(this)
    // this.$nextTick(function () {
    //   Utils.getRentersLogins(that)
    // })
  },
}
</script>

<style scoped>

</style>
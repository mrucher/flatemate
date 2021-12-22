<template>
  <div>
    <div class="content" v-if="isAdd">
      <div class="column">
        <h4>Введите данные</h4>
        <br>
        <b-form-input v-model="maxPrice" placeholder="Максимальная цена"></b-form-input>
        <br>
        <b-button v-on:click="send">Отправить</b-button>
      </div>
    </div>
    <div v-else>
      <div v-if="!isView" class="content">
        <div class="column" v-for="renter in renters" v-bind:key="renter.id">
          <b-list-group>
            <b-list-group-item>Пользователь: {{ renter.login }}</b-list-group-item>
            <b-list-group-item>Максимальная цена: {{ renter.maxPrice }}</b-list-group-item>

          </b-list-group>
          <b-button v-on:click="viewRent(renter.id)">Обзор</b-button>

        </div>
      </div>
      <div class="content-view" v-else>
        <b-list-group>
          <b-list-group-item>Пользователь: {{ viewRenter.login }}</b-list-group-item>
          <b-list-group-item>Максимальная цена: {{ viewRenter.maxPrice }}</b-list-group-item>
        </b-list-group>
        <RenterFeedback :id=viewRenter.id>

        </RenterFeedback>
        <div v-if="isAddFeedback">
          <b-form-select v-model="selected" :options="feedbacksRating"></b-form-select>
          <b-form-input v-model="feedbackText" placeholder="Отзыв"></b-form-input>
        </div>
        <b-button v-on:click="addFeedback">Добавить отзыв</b-button>
        <b-button v-on:click="closeRent">Назад</b-button>

      </div>

    </div>


  </div>
</template>

<script>
import * as Utils from "@/js/utils";
import RenterFeedback from "@/components/RenterFeedback";

export default {
  name: "Renter",
  components: {RenterFeedback},
  props: {
    message: String,
  },
  data() {
    return {
      selected: null,
      feedbackText: undefined,
      feedbacksRating: [
        { value: null, text: 'Пожалуйста выберете значение' },
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 }
      ],
      isShow: true,
      isView: false,
      maxPrice: undefined,
      users: [],
      apartments: [],
      renters: [],
      rentersTmp: [],
      viewRenter: undefined,
      viewUser: [],
      rentersLogins: [],
      isAddFeedback: false,
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
        maxPrice: this.maxPrice,
        userId: this.users[0].id,
        login: this.login,
        active: true
      }
      // console.log(renter)
      renter = JSON.stringify(renter)
      Utils.postPenter(this, renter)
    },
    getRenters: function () {
      Utils.getRenters(this)

    },
    viewRent: function (id) {
      this.isView = true
      this.rentersTmp = this.renters
      // this.viewApart = this.apartments.filter(this.apartments.id === id)
      this.viewRenter = this.renters.find(function(item) {
        return item.id === id
      });
      this.renters = []

    },
    closeRent:function () {
      this.isView = false
      this.renters = this.rentersTmp
      this.viewRenter = undefined
      this.rentersTmp = []
    },
    addFeedback: function () {
      if (this.isAddFeedback === false) {
        this.isAddFeedback = true
      } else {
        this.isAddFeedback = false
        Utils.sendRenterFeedback(this)
      }
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
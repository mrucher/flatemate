<template>
  <div id='Apartment'>
    <div v-if="isShow">
      <div class="content">
        <h4>Введите данные</h4>
        <br>
        <b-form-input v-model="maxPrice" placeholder="Максимальная цена"></b-form-input>
        <b-form-input v-model="rooms" placeholder="Количество комнат"></b-form-input>
        <b-form-input v-model="lodgers" placeholder="Количество жильцов"></b-form-input>
        <button v-on:click="loadAparts">Искать</button>
      </div>
    </div>
    <div v-else>
      <div v-if="isId">
        <h3>Квартира:</h3>
      </div>
      <div v-else>
        <h3>Квартиры:</h3>
      </div>
      <div class="content">

        <div v-for="apartment in apartments" v-bind:key="apartment.id">
          <b-card>
          <b-list-group>
            <b-list-group-item>Количество комнат: {{ apartment.roomsCount }}</b-list-group-item>
            <b-list-group-item>Количество жильцов: {{ apartment.lodgerCount }}</b-list-group-item>
            <b-list-group-item>Адрес: {{ apartment.address }}</b-list-group-item>
            <b-list-group-item>Цена: {{ apartment.price }}</b-list-group-item>

<!--            <router-link :to="{path: '/apartment/' + apartment.id }">Обзор</router-link>-->
          </b-list-group>
            <br>
          <b-button v-on:click="viewApart(apartment.id)">Обзор</b-button>
          </b-card>
        </div>

      </div>
<!--      <div v-if="isId">-->

<!--        <GoogleMap :locationProp=locat />-->
<!--        <ApartmentFeedback :id=id>-->

<!--        </ApartmentFeedback>-->
<!--        <router-link :to="{path: '/landlord/' + login}">Назад</router-link>-->
<!--      </div>-->
    </div>
    <div v-if="isView" class="content">
      <b-list-group>
        <b-list-group-item>Количество комнат: {{ viewApartment.roomsCount }}</b-list-group-item>
        <b-list-group-item>Количество жильцов: {{ viewApartment.lodgerCount }}</b-list-group-item>
        <b-list-group-item>Адрес: {{ viewApartment.address }}</b-list-group-item>
        <b-list-group-item>Цена: {{ viewApartment.price }}</b-list-group-item>
        <br>
        <b-img v-bind:src="'data:image/gif;base64,' + viewApartment.photos[0].photo" alt=""></b-img>

      </b-list-group>


      <GoogleMap :locationProp=viewApartment.location />
      <ApartmentFeedback :id=viewApartment.id>

      </ApartmentFeedback>
      <div v-if="isAddFeedback">
        <b-form-select v-model="selected" :options="feedbacksRating"></b-form-select>
        <b-form-input v-model="feedbackText" placeholder="Отзыв"></b-form-input>
      </div>
      <b-button v-on:click="addFeedback">Добавить отзыв</b-button>

      <b-button v-on:click="closeApart">Назад</b-button>

      <div v-if="login==='admin'">
        <b-button v-on:click="deleteAparts(viewApartment.id)">Удалить</b-button>
      </div>


    </div>


  </div>
</template>

<script>
import * as Utils from '../js/utils.js'
import ApartmentFeedback from "@/components/ApartmentFeedback";
import GoogleMap from './GoogleMap.vue'

export default {
  name: "Apartment",
  components: {
    ApartmentFeedback,
    GoogleMap
  },
  props: {
    message: String,
  },
  data() {
    return {
      isNotFullData: false,
      isShow: true,
      isView: false,
      roomsCount: undefined,
      lodgerCount: undefined,
      address: undefined,
      price: undefined,
      location: undefined,
      maxPrice: undefined,
      rooms: undefined,
      lodgers: undefined,
      isId: Boolean,
      apartments: [],
      apartmentsTmp: [],
      users: [],
      viewApartment: undefined,
      login: undefined,
      id: undefined,
      feedbacks: [],
      isAddFeedback: false,
      feedbackText: undefined,
      selected: null,
      feedbacksRating: [
        { value: null, text: 'Пожалуйста выберете значение' },
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 }
      ],
      locat: undefined //для передачи в карту
    }
  },
  methods: {
    viewApart: function (id) {
      this.isView = true
      this.apartmentsTmp = this.apartments
      // this.viewApart = this.apartments.filter(this.apartments.id === id)
      this.viewApartment = this.apartments.find(function(item) {
        return item.id === id
      });
      this.apartments = []
    },
    closeApart: function () {
      this.isView = false
      this.apartments = this.apartmentsTmp
      this.viewApartment = undefined
      this.apartmentsTmp = []
    },
    getApartments: function () {
      // console.log(this.$route.params.id)
      Utils.getApartments(this, this.$route.params.id)
    },
    getFeedbacks: function () {
      Utils.getFeedbacks(this, this.id)
    },
    update: function () {
      this.isShow = !this.isShow;
    },
    deleteAparts: function (id){
      Utils.deleteAparts(id)
    },
    loadAparts: function () {
      if (this.maxPrice !== undefined && this.lodgers !== undefined && this.rooms != undefined) {
        Utils.getApartmentsFilter(this, this.rooms, this.lodgers, this.maxPrice)
        this.isShow = false
      } else {
        alert("Введены не все данные")
      }
    },
    addFeedback: function () {
      if (this.isAddFeedback === false) {
        this.isAddFeedback = true
      } else {
        this.isAddFeedback = false
        Utils.sendFeedback(this)
      }

    }

  },
  mounted() {
    // this.isId = this.$route.params.id !== undefined
    // this.getApartments()
    this.login = this.$route.params.login
    // console.log(this.login)
    if (this.login !== undefined) {

      // this.getFeedbacks()
      Utils.getUserByLogin(this, this.login, true )
      this.isShow = false
    }
  },
}
</script>

<style scoped>
input {
  width: 100%;
}

h4 {
  margin-top: 2%;
}
select {
  width: 100%;
}

</style>
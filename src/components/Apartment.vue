<template>
  <div id='Apartment'>
    <div v-if="isId">
      <h4>Квартира:</h4>
    </div>
    <div v-else>
      <h4>Квартиры:</h4>
    </div>
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

      </div>
    </div>
    <div v-if="isId">
      <ApartmentFeedback :id=id>

      </ApartmentFeedback>
      <router-link :to="{path: '/landlord/' + login}">Назад</router-link>
    </div>

  </div>
</template>

<script>
import * as Utils from '../js/utils.js'
import ApartmentFeedback from "@/components/ApartmentFeedback";

export default {
  name: "Apartment",
  components: {ApartmentFeedback},
  props: {
    message: String,
  },
  data() {
    return {
      isNotFullData: false,
      isShow: true,
      roomsCount: undefined,
      lodgerCount: undefined,
      address: undefined,
      price: undefined,
      location: undefined,
      isId: Boolean,
      apartments: [],
      login: undefined,
      id: undefined,
      feedbacks: []
    }
  },
  methods: {
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

  },
  mounted() {
    this.isId = this.$route.params.id !== undefined
    this.getApartments()
    this.login = sessionStorage.getItem("login")
    if (this.isId) {

      // this.getFeedbacks()
      this.id = this.$route.params.id
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <div id = "ApartmentFeedback">
    <div v-if="isShow">
      <div>
        <h4>Отзывы на квартиру:</h4>
        <div v-for="feedback in feedbacks" v-bind:key="feedback.id">
          <b-list-group>
            <b-list-group-item>Отзыв: {{ feedback.feedback }}</b-list-group-item>
            <b-list-group-item>Рейтинг: {{ feedback.value }}</b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Utils from "@/js/utils";

export default {
  name: "ApartmentFeedback",

  props: {
    id: String
  },
  data() {
    return {
      isShow: true,
      feedbacks: []
    }
  },
  methods: {
    update: function () {
      this.isShow = !this.isShow;
    },
    send: function () {
      console.log(this.value);
    },
    getFeedbacks: function () {
      Utils.getFeedbacks(this, this.id)
    },
  },
  mounted() {
    // console.log("я здесь")
    this.getFeedbacks()
  },
}
</script>

<style scoped>

</style>
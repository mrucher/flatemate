<template>
  <div id = "ApartmentFeedback">
    <div v-if="isShow">
      <div>
        <h4>Отзывы на квартиру:</h4>
        <div v-for="feedback in feedbacks" v-bind:key="feedback.id">
          <ul>
            <li>ID {{ feedback.id }}</li>
            <li>Отзыв: {{ feedback.feedback }}</li>
            <li>Рейтинг: {{ feedback.value }}</li>
          </ul>
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
      Utils.getFeedbacks(this, this.$route.params.id)
    },
  },
  mounted() {
    // console.log("я здесь")
    this.getFeedbacks()
    console.log(this.id)
  },
}
</script>

<style scoped>

</style>
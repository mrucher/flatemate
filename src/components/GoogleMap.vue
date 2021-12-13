<template>
  <div>
    <div>
      <GmapAutocomplete

          @place_changed='setPlace'

      />
      <button @click='addMarker'>Add</button>
    </div>
    <br>
    <GmapMap
        :center='center'
        :zoom='12'
        ref="mapRef"
        @click="handleMapClick"
        style='width:100%;  height: 400px;'>

    <GmapMarker
        :position="marker.position"
        :clickable="true"
        :draggable="true"
        @drag="handleMarkerDrag"
        @click="panToMarker"/>
<!--        :key="index"-->
<!--        v-for="(m, index) in markers"-->
<!--        :position="m.position"-->
<!--        :clickable="true"-->
<!--        :draggable="true"-->
<!--        @drag="handleMarkerDrag"-->
<!--        @click="panToMarker"-->

    </GmapMap>
  </div>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
import Vue from 'vue'

export default {
  name: 'GoogleMap',
  computed: {
    google: gmapApi
  },
  props:{
    locationProp: undefined
  },
  data() {
    return {
      center: {lat: 45.508, lng: -73.587},
      markers: [],
      currentPlace: null,
      places: [],
      marker: { position: { lat: 10, lng: 10 } },
      address: undefined

    }
  },
  mounted() {
    if (this.locationProp === undefined) {
      this.geolocate();

    }
    else {

      console.log(this.locationProp)
      this.marker.position = {
        lat: this.locationProp.x,
        lng: this.locationProp.y
      }
      this.getAdress(this.marker.position)
      this.center = {
        lat: this.marker.position.lat,
        lng: this.marker.position.lng
      };
      // this.marker.position = this.locationProp
    }


  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    getAdress: function (location = undefined) {
      Vue.$geocoder.setDefaultMode('lat-lng');
      var latLngObj
      if (location === undefined) {
        latLngObj = {
          lat: this.marker.position.lat,
          lng: this.marker.position.lng
        }
      }else {
        latLngObj = {
          lat: location.lat,
          lng: location.lng
        }
      }
      Vue.$geocoder.send(latLngObj, response => {
        this.address = response.results[0].formatted_address
        this.$parent.address = this.address
        this.$parent.locat = this.marker.position
        // console.log(this.$parent.address)
        // localStorage.setItem("adress", this.adress)
        // console.log(this.adress);
      });

    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    addMarker() {
      if (this.currentPlace) {
        // const marker = {
        //   lat: this.currentPlace.geometry.location.lat(),
        //   lng: this.currentPlace.geometry.location.lng(),
        // };
        this.marker.position = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        // this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = this.marker;
        this.currentPlace = null;
      } else if (this.locationProp !== undefined) {
        this.center = this.marker;
      }
    },
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.getAdress();
      // console.log(e);
    },
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.getAdress();
    },
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      // this.$refs.mapRef.setZoom(18);
    },
  },
}
</script>
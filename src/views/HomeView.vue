<template>
  <div class="carousel">
    <v-carousel cycle hide-delimiters show-arrows="hover">
      <v-carousel-item
        v-for="carrousel in carrousels"
        :key="carrousel.id"
        :src="`/src/assets/carrousel/${carrousel.image}`"
        cover
        class="carousel-item"
      >
        <div class="carousel-text">
          <h1 class="carousel-date">{{ carrousel.date }}</h1>
          <h1 class="carousel-title">
            {{ carrousel.title }}
          </h1>
          <p class="carousel-desc">
            {{ carrousel.desc }}
          </p>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
  <div class="map-container">
    <div class="header-river">
      <h2>Status Ketinggian Air Sungai di Setiap Lokasi Pemantauan</h2>
    </div>
    <div class="search-bar" :class="{ blur: openHistory }">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5a4.49 4.49 0 0 1-4.5 4.5z"
        />
      </svg>
      <input type="text" placeholder="Masukkan Lokasi" v-model="search" />
      <button @click="searchRivers">Cari</button>
    </div>
    <div class="map" :class="{ blur: openHistory }">
      <div style="height: 80vh; width: 100%">
        <l-map
          ref="map"
          v-model:zoom="zoom"
          :center="center"
          :animate="true"
          class="leaflet"
        >
          <l-tile-layer
            url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=5103da353f1446208a040c5349ed4c51"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <l-marker
            v-for="marker in markersWithPopupContent"
            :key="marker.id"
            :lat-lng="[marker.latitude, marker.longitude]"
            :icon="getMarkerIcon(marker.status)"
            :draggable="false"
          >
            <l-popup :auto-pan="true">
              <div v-html="marker.popupContent"></div>
            </l-popup>
          </l-marker>
        </l-map>
        <div class="legend-box">
          <div class="legend-item">
            <div class="legend-color high-water"></div>
            <span>Status Bahaya</span>
          </div>
          <div class="legend-item">
            <div class="legend-color normal-water"></div>
            <span>Status Siaga</span>
          </div>
          <div class="legend-item">
            <div class="legend-color low-water"></div>
            <span>Status Aman</span>
          </div>
        </div>
        <div class="info-box">
          <div class="info-item">
            {{ infoMessage }}
          </div>
        </div>
        <div class="notes-header">Catatan:</div>
        <div class="notes-item">
          - Ketinggian air yang ditampilkan akan diperbarui secara langsung
          dalam interval waktu lima detik
        </div>
        <div class="notes-item">
          - Status ketinggian pada lokasi pemantauan dikatakan bahaya jika
          tinggi air lebih dari 3 meter
        </div>
        <div class="notes-item">
          - Status ketinggian pada lokasi pemantauan dikatakan siaga jika tinggi
          air berada direntang 1.5 meter - 3 meter
        </div>
        <div class="notes-item">
          - Status ketinggian pada lokasi pemantauan dikatakan aman jika tinggi
          air kurang dari 1.5 meter
        </div>
      </div>
    </div>
    <div v-if="openHistory">
      <history @close="openHistory = false" :riverId="id"></history>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
.leaflet-container {
  transition: transform 0.3s ease-in-out; /* Adjust duration and easing as needed */
}
.map.blur {
  pointer-events: none;
}

.leaflet {
  z-index: 100;
}

.search-bar.blur {
  pointer-events: none;
}

.carousel-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity as needed */
}
.carousel {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.carousel-text {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  color: white;
  margin-left: 15%;
  word-wrap: break-word;
  width: 800px;
}

.carousel-date {
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.875);
}

.carousel-title {
  font-size: 40px;
  margin-bottom: 10px;
  font-weight: bold;
}

.carousel-desc {
  font-size: 18px;
  text-align: justify;
  font-weight: 300;
}

.map-container {
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 100;
}

.header-river {
  background-color: #2d3e50;
  padding: 15px;
  color: white;
  text-align: center;
}

.header-river h2 {
  margin: 0;
  font-size: 22px; /* Adjust the value as needed */
  font-weight: 500;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px; /* Adjust the left position as needed */
  transform: translateY(-50%);
  fill: #0000007e; /* Adjust the color of the search icon */
  width: 18px; /* Adjust the width of the search icon */
  height: 18px; /* Adjust the height of the search icon */
}

.search-bar {
  margin-top: 4%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 180;
  text-align: center;
}

.search-bar input {
  padding: 10px 100px;
  margin-right: 20px;
  background-color: white;
  border-radius: 30px;
  padding-left: 35px; /* Adjust the value as needed */
  font-size: medium;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
}

.search-bar button {
  margin-left: -80px;
  padding: 10px 15px;
  background-color: #2d3e50;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 30px;
  font-size: medium;
  z-index: 180;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}

.search-bar button:hover {
  background-color: #1e2a36 !important;
  transition: 0.3s ease;
}

.history-button {
  padding: 1px 10px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  font-size: small;
  background-color: #00bfff;
}

.history-button:active {
  background-color: #0084ff !important;
}

.map {
  height: calc(
    100% - 60px
  ); /* Adjust the height to account for the header and search bar */
}

.marker-popup {
  display: flex;
  flex-direction: column;
}

.marker-info span {
  width: 50px;
  display: inline-block;
}

.info-box {
  position: absolute;
  bottom: 180px;
  left: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 180;
}

.info-item {
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: small;
}

.notes-item {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: small;
  font-weight: 300;
}

.notes-header {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: small;
  margin-top: 15px;
  font-weight: 600;
}

.legend-box {
  position: absolute;
  bottom: 150px;
  right: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 180;
}

/* Example legend item */
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-item span {
  margin-left: 5px;
  font-size: small;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
}

.high-water {
  background-color: red;
}

.normal-water {
  background-color: yellow;
}

.low-water {
  background-color: #06caf9;
}
</style>

<script>
import "leaflet/dist/leaflet.css";
import { defineComponent, onMounted, ref, computed } from "vue";
import {
  LMap,
  LTileLayer,
  LIcon,
  LMarker,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet";
import History from "@/components/History.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "Home",
  setup() {
    const zoom = ref(14);
    const center = ref([0.5071, 101.4478]);
    const markers = ref([]);
    const markerIcon = L.icon({
      iconUrl: "src/assets/air.png",
      iconSize: [80, 80],
    });
    const openHistory = ref(false);
    const carrousels = ref([""]);
    const count = ref();
    const search = ref("");
    const river = ref();
    const id = ref();

    const searchRivers = async () => {
      if (search.value !== "") {
        await fetch(
          `http://localhost:8080/river/search?location=${search.value}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            river.value = data;
            zoom.value = 20;
            center.value = [river.value.latitude, river.value.longitude];
            console.log(center.value);
            console.log(zoom.value);
            console.log(river.value);
          })
          .catch((error) => {
            Swal.fire({
              title: "Gagal!",
              text: "Lokasi tidak ditemukan!",
              icon: "error",
              confirmButtonColor: "#2d3e50",
            });
            console.error(error);
          });
      }
    };

    const ws = new WebSocket("ws://localhost:8080/river/ws");

    ws.onopen = function (event) {
      console.log("WebSocket connection opened", event);
    };

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      const index = markers.value.findIndex((marker) => marker.id === data.id);
      if (index !== -1) {
        const marker = markers.value[index];
        marker.height = data.height;
        marker.status = data.status;
        marker.popupContent = markerPopupContent(marker);
        markers.value.splice(index, 1, { ...marker }); // trigger reactivity
      }
    };

    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:8080/carrousel", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch carrousels");
        }

        const data = await response.json();
        carrousels.value = data;
      } catch (error) {
        console.error(error);
      }

      await fetch("http://localhost:8080/river", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          markers.value = data.map((marker) => ({
            ...marker,
            popupContent: markerPopupContent(marker),
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      await fetch("http://localhost:8080/river/total", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          count.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const markerPopupContent = (marker) => {
      return `
        <div class="marker-popup">
          <div class="marker-info">
            <span>Lokasi:</span> ${marker.location}<br>
            <span>Tinggi:</span> ${marker.height}<br>
            <span>Status:</span> ${marker.status}<br>
            <span>History:</span> <button class="history-button" onclick="openHistoryPopUp('${marker.id}')">Lihat</button>
          </div>
      </div>
        `;
    };

    window.openHistoryPopUp = (riverId) => {
      id.value = riverId;
      openHistory.value = true;
    };

    const markersWithPopupContent = computed(() => {
      if (markers.value.length > 0) {
        return markers.value.map((marker) => ({
          ...marker,
          popupContent: markerPopupContent(marker),
        }));
      }

      return [];
    });

    return {
      zoom,
      markers,
      openHistory,
      markerIcon,
      markersWithPopupContent,
      carrousels,
      count,
      search,
      searchRivers,
      river,
      center,
      id,
    };
  },
  computed: {
    infoMessage() {
      return `Dari ${this.count} lokasi pemantauan terdapat sebanyak ${this.countBahayaRivers} lokasi pantau yang airnya meluap`;
    },
    countBahayaRivers() {
      return this.markers.filter((marker) => marker.status === "Bahaya").length;
    },
    getMarkerIcon() {
      return function (status) {
        let iconUrl = "";
        let iconSize = [60, 60];

        switch (status) {
          case "Bahaya":
            iconUrl = "src/assets/red.png";
            break;
          case "Siaga":
            iconUrl = "src/assets/yel.png";
            break;
          case "Aman":
            iconUrl = "src/assets/blue.png";
            break;
        }

        return L.icon({
          iconUrl: iconUrl,
          iconSize: iconSize,
        });
      };
    },
  },
  components: {
    LMap,
    LTileLayer,
    LIcon,
    LMarker,
    LPopup,
    History,
  },
});
</script>

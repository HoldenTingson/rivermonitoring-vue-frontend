<template>
  <div class="river">
    <div class="river-header">
      <div class="text">
        <h2>Titik Air</h2>
        <h3>Lihat daftar lokasi pemantauan titik air di Kota Pekanbaru</h3>
      </div>
    </div>
    <div class="table-controls">
      <div class="search-bar-river">
        <svg
          class="search-icon-river"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5a4.49 4.49 0 0 1-4.5 4.5z"
          />
        </svg>
        <input type="text" placeholder="Masukkan lokasi" v-model="search" />
        <button>Cari</button>
      </div>
      <div class="filter-container">
        <span class="filter-label">Filter Status:</span>
        <select v-model="selectedStatus" class="river-filter">
          <option value="">Semua</option>
          <option value="Bahaya">Bahaya</option>
          <option value="Siaga">Siaga</option>
          <option value="Aman">Aman</option>
        </select>
      </div>
    </div>
    <table class="river-table">
      <thead>
        <tr>
          <th>
            Location
            <div class="sort-icons">
              <i class="fas fa-sort-up" @click="sortColumn('locationDesc')"></i>
              <i
                class="fas fa-sort-down"
                @click="sortColumn('locationAsc')"
              ></i>
            </div>
          </th>
          <th>
            Height
            <div class="sort-icons">
              <i class="fas fa-sort-up" @click="sortColumn('heightDesc')"></i>
              <i class="fas fa-sort-down" @click="sortColumn('heightAsc')"></i>
            </div>
          </th>
          <th>
            Status
            <div class="sort-icons">
              <i class="fas fa-sort-up" @click="sortColumn('statusDesc')"></i>
              <i class="fas fa-sort-down" @click="sortColumn('statusAsc')"></i>
            </div>
          </th>
          <th>
            Latitude
            <div class="sort-icons">
              <i class="fas fa-sort-up" @click="sortColumn('latitudeDesc')"></i>
              <i
                class="fas fa-sort-down"
                @click="sortColumn('latitudeAsc')"
              ></i>
            </div>
          </th>
          <th>
            Longitude
            <div class="sort-icons">
              <i
                class="fas fa-sort-up"
                @click="sortColumn('longitudeDesc')"
              ></i>
              <i
                class="fas fa-sort-down"
                @click="sortColumn('longitudeAsc')"
              ></i>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="river in filteredRivers" :key="river.id">
          <td>{{ river.location }}</td>
          <td>{{ river.height }}</td>
          <td>{{ river.status }}</td>
          <td>{{ river.latitude }}</td>
          <td>{{ river.longitude }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="pagination-container">
      <div class="pagination-info">Showing 3 out of 5 entries</div>
      <div class="pagination">
        <button
          class="buttons start"
          :disabled="startBtnDisabled"
          @click="startBtnClick"
          :class="{ 'disable-hover': disableHover }"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <button
          class="buttons prev"
          :disabled="prevBtnDisabled"
          @click="prevBtnClick"
          :class="{ 'disable-hover': disableHover }"
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <div class="links">
          <a
            v-for="(link, index) in links"
            :key="index"
            :class="{
              active: index === currentStep,
              'disable-hover': disableHover,
            }"
            href="#"
            class="link"
            @click="linkClick(index)"
          >
            {{ link }}
          </a>
        </div>
        <button
          class="buttons next"
          :disabled="nextBtnDisabled"
          @click="nextBtnClick"
          :class="{ 'disable-hover': disableHover }"
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button
          class="buttons end"
          :disabled="endBtnDisabled"
          @click="endBtnClick"
          :class="{ 'disable-hover': disableHover }"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from "vue";
export default {
  setup() {
    const startBtnDisabled = ref(true);
    const prevBtnDisabled = ref(true);
    const nextBtnDisabled = ref(false);
    const endBtnDisabled = ref(false);
    const currentStep = ref(0);
    const links = reactive([1, 2, 3, 4, 5]);
    const disableHover = ref(false);
    const rivers = ref([]);
    const search = ref();
    const selectedStatus = ref("");

    const linkClick = (index) => {
      currentStep.value = index;
      disableHover.value = true;
      updateBtn();
      setTimeout(() => {
        disableHover.value = false;
      }, 0);
    };

    const prevBtnClick = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
        disableHover.value = true;
        updateBtn();
        setTimeout(() => {
          disableHover.value = false;
        }, 0);
      }
    };

    const nextBtnClick = () => {
      if (currentStep.value < links.length - 1) {
        currentStep.value++;
        disableHover.value = true;
        updateBtn();
        setTimeout(() => {
          disableHover.value = false;
        }, 0);
      }
    };

    const startBtnClick = () => {
      currentStep.value = 0;
      disableHover.value = true;
      updateBtn();
      setTimeout(() => {
        disableHover.value = false;
      }, 0);
    };

    const endBtnClick = () => {
      currentStep.value = links.length - 1;
      disableHover.value = true;
      updateBtn();
      setTimeout(() => {
        disableHover.value = false;
      }, 0);
    };

    const updateBtn = () => {
      startBtnDisabled.value = currentStep.value === 0;
      prevBtnDisabled.value = currentStep.value === 0;
      nextBtnDisabled.value = currentStep.value === links.length - 1;
      endBtnDisabled.value = currentStep.value === links.length - 1;
    };

    const sortColumn = async (sortBy) => {
      const encodedSortBy = encodeURIComponent(sortBy);
      try {
        await fetch(
          `https://rivermonitoring-golang-backend-production.up.railway.app/river/sort?sortby=${encodedSortBy}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            rivers.value = data;
          });

        // Rest of the code
      } catch (error) {
        console.error(error);
      }
    };

    onBeforeMount(async () => {
      await fetch(
        "https://rivermonitoring-golang-backend-production.up.railway.app/river",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          rivers.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      startBtnDisabled,
      prevBtnDisabled,
      nextBtnDisabled,
      endBtnDisabled,
      currentStep,
      links,
      disableHover,
      linkClick,
      prevBtnClick,
      nextBtnClick,
      startBtnClick,
      endBtnClick,
      rivers,
      sortColumn,
      search,
      selectedStatus,
    };
  },

  computed: {
    filteredRivers() {
      let filtered = this.rivers;

      // Filter by search query
      if (this.search) {
        filtered = filtered.filter((river) => {
          const location = river.location.toLowerCase();
          return location.includes(this.search.toLowerCase());
        });
      }

      // Filter by status
      if (this.selectedStatus) {
        filtered = filtered.filter(
          (filtered) => filtered.status === this.selectedStatus
        );
      }

      return filtered;
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
@import "@fortawesome/fontawesome-free/css/all.css";
.pagination,
.buttons,
.links,
.link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.disable-hover {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.pagination-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.pagination-info {
  margin-left: 17.31%;
  font-size: 16px;
  font-weight: 400;
}

.pagination {
  position: absolute;
  padding: 8px;
  border-radius: 4px;
  column-gap: 12px;
  background: white;
  max-width: 430px;
  margin-left: 56.32%;
}

.buttons {
  border: none;
  transition: background-color 0.3s ease;
}

.buttons:disabled {
  color: #b3b3b3;
  pointer-events: none;
}

.buttons,
.link {
  height: 34px;
  width: 34px;
  font-size: 16px;
  color: #2d3e50;
  background-color: #f2f2f2;
  border-radius: 4px;
  cursor: pointer;
}

.links {
  column-gap: 12px;
}

.link {
  font-weight: 500;
  text-decoration: none;
}

.buttons:hover,
.link:hover {
  background: #2d3e50;
  color: white;
  transition: color 0.3s ease;
}

.link.active {
  background: #2d3e50;
  color: white;
}

.sort-icons {
  float: right;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fas.fa-sort-up {
  cursor: pointer;
}

.fas.fa-sort-down {
  margin-top: -8px;
  margin-bottom: -25px;
  cursor: pointer;
}

.river-header {
  background-color: #24262b;
  padding: 60px;
  margin-bottom: 50px;
  color: white;
}

.text {
  margin-left: 15%;
}

.river-header h2 {
  margin: 0;
  font-size: 50px; /* Adjust the value as needed */
  font-weight: 700;
  margin-bottom: 15px;
}

.river-header h3 {
  margin: 0;
  font-size: 16px; /* Adjust the value as needed */
  font-weight: 300;
}

.table-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
}

.filter-label {
  grid-column: 1; /* Place the label in the first column */
  margin-right: 10px;
  font-size: 16px;
  font-weight: 400;
  margin-left: 8px;
}

.table-info {
  margin-top: 10px;
  margin-left: 264px;
  font-size: 16px;
  font-weight: 300;
}

.arrow {
  width: 20px;
  height: 20px;
  background-size: cover;
  background-position: center;
  position: absolute;
  display: inline-block;
  margin-left: 173px;
  margin-top: 4px;
}

.river-filter {
  grid-column: 2; /* Place the select box in the second column */
  margin-right: 7px; /* Reset margin for the select box */
  box-shadow: 0 0 0 0.8px #00000090;
  padding: 5px 22px;
  border-radius: 4px;
  background-image: url("/src/assets/down.png");
  background-position: right 6px;
  background-size: 25px;
}

select.river-filter {
  font-size: medium;
  text-align: left;
  padding-left: 10px;
}

.filter-container {
  display: flex;
  align-items: center;
  margin-bottom: 17px;
  margin-right: 818px;
}

.river-table {
  margin-left: 265px;
  width: 1000px;
  border-collapse: collapse;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
}

.river-table th {
  font-size: 16px;
  font-weight: 600 !important;
  background-color: #2d3e50;
  color: white;
  padding: 8px;
  text-align: left;
  border-right: 1px solid #ddd;
}
.river-table td {
  font-size: 16px;
  font-weight: 300 !important;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.river-table td:nth-child(2) {
  width: 100px; /* Set a fixed width for the status column */
}
.river-table td:nth-child(3) {
  width: 160px; /* Set a fixed width for the status column */
}

.river-table td:nth-child(4) {
  width: 180px; /* Set a fixed width for the status column */
}

.river-table td:nth-child(5) {
  width: 180px; /* Set a fixed width for the status column */
}

.river-table th {
  font-weight: bold;
}

.river-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.search-icon-river {
  position: absolute;
  top: 50%;
  left: 10px; /* Adjust the left position as needed */
  transform: translateY(-50%);
  fill: #0000007e; /* Adjust the color of the search icon */
  width: 18px; /* Adjust the width of the search icon */
  height: 18px; /* Adjust the height of the search icon */
}

.search-bar-river {
  position: absolute;
  margin-left: 983px;
  transform: translate(-50%, -50%);
  z-index: 100;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: -16.9px;
}

.search-bar-river input {
  padding: 5px 100px;
  margin-right: 20px;
  background-color: white;
  border-radius: 4px;
  padding-left: 35px; /* Adjust the value as needed */
  font-size: medium;
  box-shadow: 0 0 0 0.8px #00000090;
}

.search-bar-river button {
  padding: 5.6px 15px;
  background-color: #2d3e50;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  font-size: medium;
}

.search-bar-river button:hover {
  background-color: #1e2a36 !important;
  transition: 0.3s ease;
}
</style>

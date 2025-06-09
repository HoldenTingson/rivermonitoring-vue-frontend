<template>
  <div class="history-chart">
    <div class="history-header">
      <div class="history-text">Histori Ketinggian Titik Air</div>
      <span v-if="dataInfo.count > 0" class="data-info">
        ({{ dataInfo.duration }} yang lalu - {{ dataInfo.count }} titik data)
      </span>
      <i class="uil uil-times history-close" @click="closeHistory"></i>
    </div>

    <div class="chart-box">
      <div id="chartContainer">
        <Line
          v-if="dataLoaded && chartData.labels.length > 0"
          id="myChart"
          :options="chartOptions"
          :data="chartData"
        ></Line>
        <div
          v-else-if="dataLoaded && chartData.labels.length === 0"
          class="no-data"
        >
          Tidak ada data tersedia
        </div>
        <div v-else class="loading">Loading data...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import { ref, watch, onMounted, onUnmounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "History",
  components: {
    Line,
  },
  props: ["riverId"],
  setup(props) {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: "Ketinggian Titik Air (cm)",
          data: [],
          fill: false,
          borderColor: "#00bfff",
          backgroundColor: "#00bfff",
          tension: 0.1,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    });
    const dataLoaded = ref(false);
    const dataInfo = ref({ count: 0, duration: "", intervalDescription: "" });
    let refreshInterval = null;

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleColor: "white",
          bodyColor: "white",
          borderColor: "#00bfff",
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              return `Ketinggian: ${context.parsed.y} cm`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: 8,
            callback: function (value) {
              return value + " cm";
            },
          },
          title: {
            display: true,
            text: "Ketinggian (cm)",
          },
        },
        x: {
          ticks: {
            maxTicksLimit: 15,
            maxRotation: 45,
          },
          title: {
            display: true,
            text: "Waktu (Interval 5 detik)",
          },
        },
      },
    };

    const formatTimeForDisplay = (timestamp) => {
      let date;

      if (typeof timestamp === "string") {
        if (timestamp.includes("T")) {
          date = new Date(timestamp);
        } else if (timestamp.includes("-") && timestamp.includes(" ")) {
          date = new Date(timestamp);
        } else if (timestamp.match(/^\d{2}:\d{2}:\d{2}$/)) {
          return timestamp;
        } else {
          date = new Date(timestamp);
        }
      } else {
        date = new Date(timestamp);
      }

      if (isNaN(date.getTime())) {
        console.error("Invalid timestamp:", timestamp);
        return "Invalid Time";
      }

      return date.toLocaleTimeString("id-ID", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    const calculateDurationInfo = (dataPoints) => {
      if (!dataPoints || dataPoints.length === 0) {
        return { duration: "0 Detik", intervalDescription: "" };
      }

      if (dataPoints.length === 1) {
        return {
          duration: "0 Detik",
          intervalDescription: "1 titik data",
        };
      }

      const totalIntervals = dataPoints.length - 1;
      const totalSeconds = totalIntervals * 5;

      let duration;
      if (totalSeconds < 60) {
        duration = `${totalSeconds} Detik`;
      } else {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        duration = seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes} Menit`;
      }

      const intervalDescription = `${dataPoints.length} titik (interval 5s)`;

      return { duration, intervalDescription };
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rivermonitoring-golang-backend-production.up.railway.app/history/time/${props.riverId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();

        console.log("Received raw data:", rawData);
        console.log(
          "Data sample:",
          rawData.length > 0 ? rawData[0] : "No data"
        );

        const processedData =
          rawData.length > 13 ? rawData.slice(-13) : rawData;

        if (!processedData || processedData.length === 0) {
          console.log("No data available");
          chartData.value = {
            labels: [],
            datasets: [
              {
                label: "Ketinggian Titik Air (cm)",
                data: [],
                fill: false,
                borderColor: "#00bfff",
                backgroundColor: "#00bfff",
                tension: 0.1,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          };
          dataInfo.value = {
            count: 0,
            duration: "0 Detik",
            intervalDescription: "",
          };
          dataLoaded.value = true;
          return;
        }

        const labels = processedData.map((item) =>
          formatTimeForDisplay(item.timestamp)
        );
        const heights = processedData.map((item) => item.height);
        const durationInfo = calculateDurationInfo(processedData);

        chartData.value = {
          labels: labels,
          datasets: [
            {
              label: "Ketinggian Titik Air (cm)",
              data: heights,
              fill: false,
              borderColor: "#00bfff",
              backgroundColor: "#00bfff",
              tension: 0.1,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        };

        dataInfo.value = {
          count: processedData.length,
          duration: durationInfo.duration,
          intervalDescription: durationInfo.intervalDescription,
        };

        dataLoaded.value = true;
      } catch (error) {
        console.error("Error fetching data:", error);
        dataLoaded.value = true;
        dataInfo.value = {
          count: 0,
          duration: "Error",
          intervalDescription: "",
        };
      }
    };

    const startAutoRefresh = () => {
      refreshInterval = setInterval(() => {
        fetchData();
      }, 5000);
    };

    const stopAutoRefresh = () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
      }
    };

    watch(
      () => props.riverId,
      (newId) => {
        if (newId) {
          stopAutoRefresh();
          fetchData();
          startAutoRefresh();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      if (props.riverId) {
        fetchData();
        startAutoRefresh();
      }
    });

    onUnmounted(() => {
      stopAutoRefresh();
    });

    return {
      chartData,
      chartOptions,
      dataLoaded,
      dataInfo,
    };
  },
  methods: {
    closeHistory() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.history-header {
  text-align: center;
  background-color: #2d3e50;
  color: white;
  padding: 12px;
  font-weight: 500;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
}

.history-text {
  font-size: 16px;
  font-weight: 600;
}

.data-info {
  font-size: 12px;
  font-weight: 400;
  color: #bdc3c7;
  display: block;
  margin-top: 4px;
}

.history-close {
  position: absolute;
  top: 12px;
  right: 15px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s;

  border-radius: 2px;
}

.history-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.history-close:active {
  background-color: #293137;
}

.history-chart {
  position: absolute;
  background-color: white;
  align-items: center;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 95vw;
  max-height: 90vh;
}

#chartContainer {
  padding: 15px;
  width: 950px;
  height: 350px;
  max-width: 90vw;
}

.chart-box {
  background-color: #f8fbfc;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.loading,
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
  color: #7f8c8d;
}

.no-data {
  color: #e74c3c;
  font-weight: 500;
}

@media (max-width: 1000px) {
  #chartContainer {
    width: 85vw;
    height: 300px;
  }
}

@media (max-width: 600px) {
  #chartContainer {
    width: 90vw;
    height: 250px;
  }

  .history-text {
    font-size: 14px;
  }

  .data-info {
    font-size: 11px;
  }
}
</style>

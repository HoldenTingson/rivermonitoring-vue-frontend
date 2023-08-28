<template>
  <div class="history-chart">
    <div class="history-header">
      <div class="history-text">History Ketinggian Sungai</div>
      <i class="uil uil-times history-close" @click="closeHistory"></i>
    </div>

    <div class="chart-box">
      <div id="chartContainer">
        <Line id="myChart" :options="chartOptions" :data="chartData"></Line>
      </div>
    </div>
  </div>
</template>

<style>
.history-header {
  text-align: center;
  background-color: #2d3e50;
  color: white;
  padding: 10px;
  font-weight: 500;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.history-close {
  margin-top: -23px;
  float: right;
  cursor: pointer;
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
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 1);
}

#chartContainer {
  margin-left: 10px;
  margin-right: 10px;
  width: 950px;
  height: 300px;
}

.chart-box {
  margin-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: #e9f5f9;
}
</style>

<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
let heightData = [];
let timestampLabel = [];

export default {
  name: "History",
  setup(props) {
    onMounted(async () => {
      await fetch(`http://localhost:8080/history/time/${props.riverId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          for (var i = 0; i < data.length; i++) {
            if (timestampLabel.length >= 10) {
              timestampLabel.shift();
              heightData.shift();
            }
            heightData.push(data[i].height);
            timestampLabel.push(data[i].timestamp);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const chartData = {
      labels: timestampLabel,
      datasets: [
        {
          label: "Ketinggian Sungai",
          data: heightData,
          fill: false,
          borderColor: "#00bfff",
          tension: 0,
        },
      ],
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            maxTicksLimit: 8,
          },
        },
      },
    };

    return {
      chartData,
      chartOptions,
    };
  },
  props: ["riverId"],
  methods: {
    closeHistory() {
      this.$emit("close");
    },
  },
  components: {
    Line,
  },
};
</script>

<template>
  <div class="news">
    <div class="news-header">
      <div class="text">
        <h2>Berita</h2>
        <h3>Lihat berita seputar informasi banjir di Kota Pekanbaru</h3>
      </div>
    </div>
    <div class="news-section">
      <div class="container main-news section up">
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-xs-12 col-lg-6"
            v-for="news in main"
            :key="news.id"
          >
            <img
              class="thumb-main mb-1"
              :src="`http://localhost:5173/src/assets/news/${news.image}`"
            />
            <div>
              <h4 class="mt-0 mb-0">
                <RouterLink class="title" :to="`/newsDetail/${news.id}`">
                  {{ news.title }}
                </RouterLink>
              </h4>
              <div class="date">
                <small class="date">{{ news.created_at }}</small>
              </div>
              <p class="summary-primary pt-2" style="text-align: justify">
                {{ truncatedContent(news.content) }}
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xs-12 col-lg-6">
            <div class="row news-right">
              <div
                class="col-md-6 col-sm-12 col-xs-12 col-lg-6"
                v-for="news in other"
                :key="news.id"
              >
                <div class="image image-sm">
                  <img
                    class="thumb"
                    :src="`http://localhost:5173/src/assets/news/${news.image}`"
                  />
                </div>
                <h5 class="mb-7">
                  <RouterLink
                    class="title-right"
                    :newsId="news.id"
                    :to="`/newsDetail/${news.id}`"
                  >
                    {{ news.title }}
                  </RouterLink>
                  <div class="date" style="font-weight: 400">
                    <small class="date">{{ news.created_at }}</small>
                  </div>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container section down">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="mb-4 mt-4">
              <div class="section-title">
                <span>Berita Terbaru</span>
              </div>
              <div
                class="row mb-3 bb-1 pt-0"
                v-for="news in latest"
                :key="news.id"
              >
                <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                  <img
                    class="thumb-new"
                    :src="`http://localhost:5173/src/assets/news/${news.image}`"
                  />
                </div>
                <div class="new col-md-8 col-lg-8 col-sm-12 col-xs-12">
                  <h5 style="margin-top: 15px">
                    <RouterLink
                      class="title"
                      :newsId="news.id"
                      :to="`/newsDetail/${news.id}`"
                    >
                      {{ news.title }}
                    </RouterLink>
                  </h5>
                  <div class="date-baru">
                    <small>{{ news.created_at }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Trending -->
          <div class="trend col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div class="trending mt-4">
              <div class="section-title">
                <span>Trending</span>
              </div>
              <div class="row" v-for="news in trend" :key="news.id">
                <div class="no-pad col-md-4 col-lg-4 col-sm-12 col-xs-12">
                  <img
                    class="thumb"
                    :src="`http://localhost:5173/src/assets/news/${news.image}`"
                  />
                </div>
                <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                  <h6>
                    <RouterLink
                      class="trending"
                      :newsId="news.id"
                      :to="`/newsDetail/${news.id}`"
                    >
                      {{ news.title }}
                    </RouterLink>
                  </h6>
                  <div class="date-trending">
                    <small>{{ news.created_at }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";

export default {
  name: "News",
  setup() {
    const main = ref([]);
    const trend = ref([]);
    const other = ref([]);
    const latest = ref([]);

    const truncatedContent = (content) => {
      if (content) {
        const truncated = content.split(".")[0];
        return truncated + ".";
      }
      return "";
    };

    onMounted(async () => {
      await fetch("http://localhost:8080/news/category?type=main", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          main.value = data;
        })
        .catch((error) => {
          console.error(error);
        });

      await fetch("http://localhost:8080/news/category?type=trending", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          trend.value = data;
        })
        .catch((error) => {
          console.error(error);
        });

      await fetch("http://localhost:8080/news/category?type=other", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          other.value = data.slice(0, 4); // Limit to a maximum of 4 news items
        })
        .catch((error) => {
          console.error(error);
        });

      await fetch("http://localhost:8080/news/category?type=latest", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          latest.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      main,
      trend,
      other,
      latest,
      truncatedContent,
      RouterLink,
    };
  },
};
</script>

<style scoped>
.new.col-md-8.col-lg-8.col-sm-12.col-xs-12 {
  margin-top: -5px;
}
.news-section img {
  border-radius: 6px;
}
.news-right small {
  font-size: 12px;
}

.new a {
  font-size: 18px;
}

.trend a {
  font-size: 12px;
}

.title-right {
  color: #2d3e50;
  text-decoration: none;
  font-size: 15px;
  margin-top: -5px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  max-height: 32px;
  font-weight: 500;
  -webkit-line-clamp: 2;
}

.container.main-news.section {
  max-width: 1010px;
}

.container.section {
  max-width: 1010px;
}

.mini-story {
  color: #7f8893;
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
  font-style: italic;
}
.title {
  color: #2d3e50;
  text-decoration: none;
  font-size: 22px;
  margin-top: -5px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 10px !important;
  max-height: 32px;
  font-weight: 500;
  -webkit-line-clamp: 2;
}
.title-bawah {
  color: #2d3e50;
  text-decoration: none;
  font-size: 10px;
  margin-top: -5px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  max-height: 32px;
  -webkit-line-clamp: 2;
}
.trending {
  color: #2d3e50;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 0px;
  font-weight: 500;
}
.date {
  color: #7f8893;
  font-size: 12px;
  margin-top: 3px;
}
.date-trending {
  color: #7f8893;
  font-size: 11px;
  margin-top: -7px;
}
.date-baru {
  color: #7f8893;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: -1px;
}
a:hover {
  color: #519ac5fc;
}
.logo-wrapper {
  text-transform: uppercase;
  padding: 30px 0px;
}
.menu {
  padding-left: 0px;
  background: #2d3e50;
}
.menu .container {
  padding-left: 0px;
}
.menu-items .active {
  background: #2d3e50;
}
.menu .menu-items a {
  text-decoration: none;
  color: #fff;
  padding: 10px 30px;
  display: block;
}
.menu .menu-items a:hover {
  background: #519ac5fc;
}
.thumb-main,
.thumb-new {
  width: 100%;
}

.thumb {
  width: 100%;
  height: 80px;
}

.main-news {
  margin-top: 20px;
}
.main-news h3 {
  line-height: 0.75;
}
.main-news h3 a {
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
}
.image {
  overflow: hidden;
}
.image-sm {
  max-height: 150px;
}
.image-sm img {
  height: 130px;
}
.image-xs {
  max-height: 140px;
}
.image-xxs {
  max-height: 100px;
}
.image img {
  object-fit: cover;
}
.font-large {
  font-size: 0.9em;
  font-weight: 600;
  color: #2d3e50;
}
.section-title {
  position: relative;
  margin-top: -1px;
  margin-bottom: 20px;
  color: #2d3e50;
}
.section-title span {
  font-weight: 500;
  font-size: 17px;
  color: #2d3e50;
}
.section-title span:after {
  content: "";
  position: absolute;
  background: #2d3e50;
  width: 50px;
  height: 3px;
  left: 0;
  bottom: 0;
}
.bb-1 {
  padding: 0px 0px;
}
.section {
  padding-bottom: 20px;
}
small {
  color: #999;
}
.summary {
  color: #2d3e50;
  font-size: 13px;
}

.summary-primary {
  color: #2d3e50;
  font-size: 14px;
}

.trending .row {
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.no-pad {
  padding-right: 0px !important;
}

.news-header {
  background-color: #24262b;
  padding: 60px;
  margin-bottom: 80px;
  color: white;
}

.text {
  margin-left: 15%;
}

.news-header h2 {
  margin: 0;
  font-size: 50px; /* Adjust the value as needed */
  font-weight: 700;
  margin-bottom: 15px;
}

.news-header h3 {
  margin: 0;
  font-size: 16px; /* Adjust the value as needed */
  font-weight: 300;
}
</style>

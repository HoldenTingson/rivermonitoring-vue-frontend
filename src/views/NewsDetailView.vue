<template>
  <div class="news-header">
    <div class="text">
      <h2>Berita</h2>
      <h3>Lihat berita seputar informasi banjir di Kota Pekanbaru</h3>
    </div>
  </div>
  <div class="news-section">
    <div class="container main-news">
      <div class="row">
        <div class="col-8 mt-3">
          <h2 class="news-title mb-1">{{ detailNews.title }}</h2>
          <small class="date">{{ detailNews.createdAt }}</small>
          <img
            :src="`http://localhost:5173/src/assets/news/${detailNews.image}`"
            class="mt-3 thumb-main"
          />
          <div class="mini-story">
            <p>{{ detailNews.description }}</p>
          </div>
          <div class="story mt-4" style="white-space: pre-line">
            {{ detailNews.content }}
          </div>

          <div class="container section mt-4 no-pad">
            <div class="section-title">
              <span>Lainnya</span>
            </div>
            <div class="row">
              <div
                class="col-sm-12 col-xs-12 col-md-3 col-lg-3"
                v-for="news in other"
                :key="news.id"
              >
                <div class="mb-2 image image-xs">
                  <img
                    class="thumb-lain"
                    :src="`http://localhost:5173/src/assets/news/${news.image}`"
                  />
                </div>
                <RouterLink
                  class="title-bawah"
                  href="berita1.html"
                  style="font-size: 13px"
                  :to="`/newsDetail/${news.id}`"
                  @click="refresh"
                >
                  {{ news.title }}
                </RouterLink>
                <div class="date-lain">
                  <small>{{ news.created_at }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Trending -->
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="trending mt-4">
            <div class="section-title">
              <span>Trending</span>
            </div>
            <div class="row" v-for="news in trend">
              <div class="no-pad col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <img
                  class="thumb"
                  :src="`http://localhost:5173/src/assets/news/${news.image}`"
                />
              </div>
              <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                <RouterLink class="trending" :to="`/newsDetail/${news.id}`">
                  {{ news.title }}
                </RouterLink>
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
</template>

<script>
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "NewsDetail",
  setup() {
    const detailNews = reactive({
      id: "",
      title: "",
      content: "",
      description: "",
      image: "",
      createdAt: "",
    });
    const trend = ref([]);
    const other = ref([]);
    const route = useRoute();

    const fetchNewsDetail = async (newsId) => {
      await fetch(`http://localhost:8080/news/${newsId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          Object.assign(detailNews, {
            id: data.id,
            title: data.title,
            content: data.content,
            description: data.description,
            image: data.image,
            createdAt: data.created_at,
          });
        })
        .catch((error) => {
          console.error(error);
        });

      await fetch("http://localhost:8080/news/category?type=trending", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          trend.value = data.filter((news) => news.id !== detailNews.id);
        })
        .catch((error) => {
          console.error(error);
        });

      // Fetch other news
      await fetch("http://localhost:8080/news/category?type=other", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter((news) => news.id !== detailNews.id);
          other.value = filteredData.slice(0, 4);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    watch(
      () => route.params.newsId,
      (newNewsId) => {
        fetchNewsDetail(newNewsId);
      },
      { immediate: true } // Call the watcher immediately on component mount
    );

    // Call the API on component mount
    onMounted(() => {
      fetchNewsDetail(route.params.newsId);
    });

    onMounted(async () => {
      // Fetch detailNews
      await fetchNewsDetail(detailNews.id);

      // Fetch trend news
    });

    return {
      detailNews,
      trend,
      other,
    };
  },
};
</script>

<style scoped>
.news-title {
  margin-left: -2px;
}
.news-section img {
  border-radius: 6px;
}
.container.main-news {
  max-width: 1010px;
}

.container.section {
  padding-left: 0px;
  margin-top: 30px !important;
}

.story {
  font-size: 15px;
  text-align: justify;
}
.mini-story {
  color: #7f8893;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  font-style: italic;
}
.title {
  color: #2d3e50;
  text-decoration: none;
  font-size: 25px;
  margin-top: -5px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  max-height: 32px;
  -webkit-line-clamp: 2;
}
.title-bawah {
  color: #2d3e50;
  text-decoration: none;
  font-size: 14px;
  margin-top: -5px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  max-height: 32px;
  font-weight: 500;
  -webkit-line-clamp: 2;
}
.trending {
  color: #2d3e50;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 0px;
  margin-top: 125px !important;
  font-weight: 500;
}
.date {
  color: #7f8893;
  font-size: 13px;
  margin-top: 3px;
}
.date-trending {
  color: #7f8893;
  font-size: 13px;
  margin-top: -3px;
}

.date-lain {
  color: #7f8893;
  font-size: 12px;
  margin-top: -3px;
}
.date-baru {
  color: #7f8893;
  font-size: 15px;
  margin-top: -5px;
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
.thumb-main {
  width: 100%;
}

.thumb-lain {
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
  font-size: 17px;
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
  height: 2.5px;
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

.news-header {
  background-color: #24262b;
  padding: 60px;
  margin-bottom: 40px;
  color: white;
}
</style>

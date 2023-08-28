<template>
  <div class="wrapper">
    <div class="container-fluid">
      <nav
        class="navbar navbar-expand-md navbar-light fixed-top"
        :class="{ scrolled: isScrolled }"
      >
        <div class="logo">
          <img src="/src/assets/pekanbaru.png" alt="Flood Logo" />
          <span class="logo-text">Go Banjir</span>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-center align-item-center"
          id="navbarNav"
        >
          <ul class="navbar-nav" :class="{ logout: auth }">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/river">River</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/news">News</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/report">Report</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/faq">FAQ</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/gallery">Gallery</RouterLink>
            </li>
          </ul>
        </div>
        <div class="navbar-right">
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!auth">
              <button
                class="btn login-button no-hover-effect"
                @click="openLoginForm"
              >
                Login
              </button>
            </li>
            <li class="nav-item" v-if="!auth">
              <button
                class="btn register-button no-hover-effect"
                @click="openRegisterForm"
              >
                Register
              </button>
            </li>
            <li class="nav-item" v-if="auth">
              <div class="profile" @click="toggleProfile">
                <img
                  :src="`http://localhost:5173/src/assets/profile/${user.profile}`"
                  class="user-pic"
                />
                <span class="username">{{ user.username }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="sub-menu-wrap" :class="{ open: openProfile }">
          <div class="sub-menu">
            <div class="user-info">
              <img
                :src="`http://localhost:5173/src/assets/profile/${user.profile}`"
              />
              <h3>{{ user.username }}</h3>
            </div>
            <hr />
            <RouterLink
              class="sub-menu-link"
              to="/profile"
              @click="toggleProfile"
            >
              <i class="fa-solid fa-user"></i>
              <p>Profile Information</p>
              <span>></span>
            </RouterLink>
            <a class="sub-menu-link" @click="logout">
              <i class="fa fa-sign-out"></i>
              <p>Logout</p>
              <span>></span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
.profile {
  display: flex;
  align-items: center;
  border-radius: 50px;
  cursor: pointer;
}
.user-pic {
  width: 40px;
  border-radius: 50%;
  margin-left: -10px;
  height: 40px;
}

.user-info img {
  height: 60px !important;
  width: 60px !important;
}
.user-info {
  display: flex;
  align-items: center;
}

.user-info h3 {
  font-weight: 500;
  margin-bottom: 0px;
  color: #000000;
  font-size: 20px;
}

.user-info img {
  width: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.username {
  margin-left: 10px;
}
.sub-menu-wrap {
  position: absolute;
  top: 120px;
  right: 0.5%;
  width: 320px;
  opacity: 0;
  overflow: hidden;
  transition: 0.5s;
  visibility: hidden;
}

.sub-menu-wrap.open {
  top: 80px;
  opacity: 1;
  max-height: 400px;
  visibility: visible;
}

.sub-menu {
  background-color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.sub-menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  margin: 12px 0;
  font-weight: 350;
}

.sub-menu-link:last-child {
  margin: 0px;
}

.sub-menu-link p {
  width: 100%;
  margin-bottom: 0px;
}

.sub-menu-link i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 18px;
  background-color: #2d3e50;
  border-radius: 50%;
  padding: 12px;
  margin-right: 15px;
  color: white;
}

.sub-menu-link span {
  font-size: 22px;
  transition: transform 0.3s;
}

.sub-menu-link:hover span {
  transform: translate(5px);
}

.sub-menu-link:hover p {
  font-weight: 400;
}
.sub-menu hr {
  border: 0;
  height: 0.5px;
  width: 100%;
  background: #2d3e50;
  margin: 15px 0 10px;
}

.navbar {
  position: relative;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
  height: 70px;
  padding-left: 7px;
}

.navbar.scrolled {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); /* Box shadow */
}

.navbar_container {
  display: flex;
}

.wrapper {
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
}

.logo-text {
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  color: black;
  font-weight: bold;
}

.navbar-nav {
  text-align: center;
  margin-right: -10px;
}

.navbar-nav.logout {
  margin-right: 84px;
}

.navbar-nav li {
  margin-right: 10px;
  display: inline-block;
}

.navbar-nav li:last-child {
  margin-right: 0;
}

.navbar-nav li a {
  color: #2d3e50 !important;
  text-decoration: none;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  transition: color 0.3s ease, text-decoration 0.3s ease;
  padding: 8px;
}

.navbar-nav li a:hover {
  background-color: rgba(0, 0, 0, 0.07);
  transition: 0.3s ease;
  border-radius: 4px;
}

.navbar-right {
  margin-left: auto;
  border-color: #2d3e50;
  margin-right: 10px;
}

.register-button {
  background-color: #2d3e50 !important;
  color: white !important;
  width: 90px;
  padding: 8px;
}

.login-button {
  background-color: white;
  border-color: #2d3e50;
  width: 90px;
  padding: 8px;
}

.login-button:hover {
  background-color: #2d3e50 !important;
  color: white !important;
  transition: 0.3s ease;
}

.register-button:hover {
  background-color: #1e2a36 !important;
  transition: 0.3s ease;
}
.navbar-nav li .no-hover-effect:hover {
  background-color: transparent;
  transition: none;
}

.btn {
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  border-radius: 4px;
}

.btn:focus {
  outline: none;
}

.swal2-confirm:focus {
  box-shadow: none !important;
  outline: none !important;
}

.btn:focus {
  box-shadow: none !important;
  outline: none !important;
}
</style>

<script>
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "Nav",
  data() {
    return {
      isScrolled: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.pageYOffset > 0;
    },
    openLoginForm() {
      this.$emit("openLoginForm");
    },
    openRegisterForm() {
      this.$emit("openRegisterForm");
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const auth = computed(() => store.state.authenticated);
    const user = reactive({
      id: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      language: "",
      profile: "",
    });

    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const res = await response.json();

        Object.assign(user, {
          id: res.id,
          username: res.username,
          password: res.password,
          email: res.email,
          phone: res.phone,
          language: res.language,
          profile: res.profile,
        });

        await store.dispatch("setAuth", true);
      } catch (error) {
        await store.dispatch("setAuth", false);
      }
    });

    const toggleProfile = () => {
      openProfile.value = !openProfile.value;
    };

    const logout = async () => {
      Swal.fire({
        title: "Apakah anda yakin ingin logout?",
        text: "Anda akan keluar dari akun anda!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2d3e50",
        cancelButtonColor: "#d33",
        cancelButtonText: "Tidak",
        confirmButtonText: "Ya",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch("http://localhost:8080/user/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          toggleProfile();
          await router.push("/");
          await store.dispatch("setAuth", false);
        }
      });
    };

    const openProfile = ref(false);

    const handleClickOutside = (event) => {
      if (openProfile.value && !event.target.closest(".sub-menu-wrap")) {
        openProfile.value = false;
      }
    };

    return {
      openProfile,
      auth,
      logout,
      user,
      router,
      toggleProfile,
      handleClickOutside,
    };
  },
};
</script>

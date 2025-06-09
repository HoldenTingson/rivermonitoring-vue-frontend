<template>
  <div class="wrapper">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light fixed-top">
        <div class="logo">
          <img src="/assets/bpbdriau.png" alt="Flood Logo" />
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
              <RouterLink class="nav-link" to="/">Beranda</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/river">Titik Air</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/report">Laporan</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/faq">FAQ</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/gallery">Galeri</RouterLink>
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
                  :src="`https://rivermonitoring-golang-backend-production.up.railway.app/uploads/profile/${user.profile}`"
                  class="user-pic"
                />
                <span class="username">{{ user.username }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="sub-menu-wrap" :class="{ open: openProfile }" ref="modal">
          <div class="sub-menu">
            <div class="user-info">
              <img
                :src="`https://rivermonitoring-golang-backend-production.up.railway.app/uploads/profile/${user.profile}`"
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
              <p>Profil User</p>
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
  cursor: pointer;
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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.navbar.scrolled {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
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
  padding: 10px;
}

.logo img {
  height: 50px;
}

.logo-text {
  margin-left: 10px;
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
import Swal from "sweetalert2";

export default {
  name: "Nav",
  data() {
    return {
      isScrolled: false,
      openProfile: false,
      user: {
        id: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        language: "",
        profile: "",
      },
    };
  },
  computed: {
    auth() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    openLoginForm() {
      this.$emit("openLoginForm");
    },
    openRegisterForm() {
      this.$emit("openRegisterForm");
    },
    async fetchUserData() {
      try {
        const response = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/user",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const res = await response.json();
        this.user = { ...res };
        await this.$store.dispatch("setAuth", true);
      } catch (error) {
        await this.$store.dispatch("setAuth", false);
      }
    },
    toggleProfile() {
      this.openProfile = !this.openProfile;
    },
    async logout() {
      this.toggleProfile();
      Swal.fire({
        title: "Apakah anda yakin ingin logout?",
        text: "Anda akan keluar dari akun anda!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2d3e50",
        cancelButtonColor: "#d33",
        cancelButtonText: "<div style='color:white'>" + "Tidak" + "</div>",
        confirmButtonText: "<div style='color:white'>" + "Ya" + "</div>",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(
            "https://rivermonitoring-golang-backend-production.up.railway.app/user/logout",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );

          await this.$router.push("/");
          await this.$store.dispatch("setAuth", false);
        }
      });
    },
    handleClickOutside(event) {
      if (this.$refs.modal && !this.$refs.modal.contains(event.target)) {
        this.openProfile = false;
      }
    },
  },
  mounted() {
    this.fetchUserData();
    document.addEventListener("click", this.handleClickOutside, true);
  },

  unmounted() {
    document.removeEventListener("click", this.handleClickOutside, true);
  },
};
</script>

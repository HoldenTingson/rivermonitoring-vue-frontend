<template>
  <footer class="footer">
    <div class="containers">
      <div class="row">
        <div class="footer-col">
          <h4>alamat</h4>
          <div class="contact-info">
            <div>
              <i class="fas fa-envelope"></i>
              <span>bpbd_riau@yahoo.co.id</span>
            </div>
            <div>
              <i class="fas fa-phone"></i>
              <span>0811-7612-000</span>
            </div>
            <div>
              <i class="fas fa-map-marker-alt"></i>
              <span>Jalan Jendral Sudirman No.438, Pekanbaru, Riau</span>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <h4>Discover</h4>
          <ul>
            <li>
              <RouterLink to="/"><a>beranda</a></RouterLink>
            </li>
            <li>
              <RouterLink to="/river"><a>titik air</a></RouterLink>
            </li>
            <li>
              <RouterLink to="/report"> <a>laporan</a></RouterLink>
            </li>
            <li>
              <RouterLink to="/faq"><a>FAQ</a></RouterLink>
            </li>
            <li>
              <RouterLink to="/gallery"><a>galeri</a></RouterLink>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Bantuan</h4>
          <ul>
            <li><a href="" @click.prevent>tentang kami</a></li>
            <li><a href="" @click.prevent>kebijakan privasi</a></li>
            <li><a href="" @click.prevent>syarat dan ketentuan</a></li>
          </ul>
        </div>
        <div class="footer-col follow-us">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="" @click.prevent
              ><font-awesome-icon :icon="['fab', 'facebook-f']"
            /></a>
            <a href="" @click.prevent
              ><font-awesome-icon :icon="['fab', 'twitter']"
            /></a>
            <a href="https://www.instagram.com/holdentgsn"
              ><font-awesome-icon :icon="['fab', 'instagram']"
            /></a>
            <a href="" @click.prevent
              ><font-awesome-icon :icon="['fab', 'youtube']"
            /></a>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="col-12 text-center">
          <div class="copyright mt-5 pt-5">
            <p><small>&copy; 2024-2025 All Rights Reserved.</small></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

export default {
  name: "PageFooter",
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import "@fortawesome/fontawesome-free/css/all.min.css";
body {
  line-height: 1.5;
  font-family: "Poppins", sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.containers {
  max-width: 1170px;
  margin: auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}
ul {
  list-style: none;
}
.footer {
  background-color: #24262b;
  padding: 70px;
}

.follow-us {
  max-width: 230px;
}

.footer-col {
  width: 25%;
  padding: 0 15px;
}

.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}

.footer-col h4::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #00bfff;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}
.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}
.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}

.footer-col p {
  color: #bbbbbb;
  font-weight: 300;
}
.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 10px;
}
.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}
.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}
.bottom-row {
  border-top: 1px solid #404040;
  color: #868686;
  margin-top: 50px; /* Adjust the value as needed */
  margin-bottom: -40px;
}

.contact-info {
  color: #bbbbbb;
  font-weight: 300;
}

.footer-col .contact-info {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.footer-col .contact-info > div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.footer-col .contact-info > div i {
  margin-right: 10px;
}

/*responsive*/
@media (max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}
@media (max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}
</style>

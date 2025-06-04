<template>
  <div class="report">
    <div class="report-header">
      <div class="report-header-text">
        <h2>Laporan</h2>
        <h3>
          Kirim laporan seputar masalah yang berhubungan dengan banjir di Kota
          Pekanbaru
        </h3>
      </div>
    </div>
    <div class="report-container">
      <div class="report-form">
        <div class="contact-info">
          <h3 class="title">Go Banjir</h3>
          <p class="text">
            Kami bertujuan untuk memberikan informasi yang akurat dan terkini
            mengenai ketinggian air kepada masyarakat.
          </p>

          <div class="info">
            <div class="information">
              <img src="/assets/location.png" class="icon" alt="" />
              <p>BPBD Provinsi Riau</p>
            </div>
            <div class="information">
              <img src="/assets/email.png" class="icon" alt="" />
              <p>bpbd_riau@yahoo.co.id</p>
            </div>
            <div class="information">
              <img src="/assets/phone.png" class="icon" alt="" />
              <p>0811-7612-000</p>
            </div>
          </div>

          <div class="social-media">
            <p>Terhubung Dengan Kami</p>
            <div class="social-icons">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <span class="circle one"></span>
          <span class="circle two"></span>

          <form @submit.prevent="submit" autocomplete="off" class="form-report">
            <h3 class="title">Hubungi Kami</h3>
            <div class="input-container">
              <input
                v-model="data.phone"
                type="tel"
                name="phone"
                class="input"
                @focus="focusFunc"
                @blur="blurFunc"
                @input="data.phone = data.phone.replace(/\D/g, '')"
                required
              />
              <label for="">Nomor Ponsel</label>
              <span>Nomor Ponsel</span>
            </div>
            <div v-if="phoneNumberError" class="error_message">
              {{ phoneNumberError }}
            </div>
            <div class="input-container textarea">
              <textarea
                v-model="data.content"
                name="message"
                class="input"
                @focus="focusFunc"
                @blur="blurFunc"
                required
              ></textarea>
              <label for="">Pesan</label>
              <span>Pesan</span>
            </div>
            <div v-if="messageError" class="error_message">
              {{ messageError }}
            </div>
            <div class="input-container">
              <input
                type="file"
                class="file form-control"
                accept="image/*"
                required
                @change="handleFileChange"
              />
            </div>
            <div v-if="attachmentError" class="error_message">
              {{ attachmentError }}
            </div>
            <button type="submit" class="btn btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "Report",
  setup() {
    const router = useRouter();

    const attachmentError = ref("");

    const data = reactive({
      name: "",
      email: "",
      phone: "",
      content: "",
      attachment: "",
      user_id: 0,
    });

    const image = reactive({
      blob: "",
      path: "/assets/report",
      filename: "",
    });

    const phoneNumberError = ref("");
    const messageError = ref("");

    const computedPhoneError = computed(() => phoneNumberError.value);
    const computedMessageError = computed(() => messageError.value);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      attachmentError.value = "";
      if (!file) return;

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        attachmentError.value = "Attachment file size cannot exceed 5MB";
        event.target.value = "";
        return;
      }
      const timestamp = Date.now();
      const reader = new FileReader();

      reader.onload = () => {
        image.blob = reader.result;
        image.filename = `${timestamp}_${file.name}`;
        data.attachment = `${timestamp}_${file.name}`;
      };

      reader.readAsDataURL(file);
    };

    const validatePhoneNumber = () => {
      phoneNumberError.value = "";

      if (!data.phone) {
        phoneNumberError.value = "Phone number is required";
        return false;
      }

      if (data.phone.length < 12) {
        phoneNumberError.value = "Phone number must be at least 12 digits long";
        return false;
      }

      if (data.phone.length > 15) {
        phoneNumberError.value = "Phone number cannot exceed 15 digits long";
        return false;
      }

      return true;
    };

    const validateMessage = () => {
      messageError.value = "";

      if (!data.content) {
        messageError.value = "Message is required";
        return false;
      }

      if (data.content.length > 255) {
        messageError.value = "Message cannot exceed 255 characters long";
        return false;
      }

      return true;
    };

    const clearErrors = () => {
      phoneNumberError.value = "";
      messageError.value = "";
    };

    const focusFunc = (event) => {
      const parent = event.target.parentNode;
      parent.classList.add("focus");
    };

    const blurFunc = (event) => {
      const parent = event.target.parentNode;
      if (event.target.value === "") {
        parent.classList.remove("focus");
      }
    };

    const submit = async () => {
      clearErrors();

      const isPhoneValid = validatePhoneNumber();
      const isMessageValid = validateMessage();

      if (!isPhoneValid || !isMessageValid) {
        return;
      }

      try {
        // Get user data
        const userResponse = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/user",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to get user data");
        }

        const userData = await userResponse.json();
        Object.assign(data, {
          user_id: userData.id,
          name: userData.username,
          email: userData.email,
        });

        // Upload image
        const uploadResponse = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/admin/upload",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
            credentials: "include",
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        // Submit report
        const reportResponse = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/report",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );

        if (!reportResponse.ok) {
          throw new Error("Failed to submit report");
        }

        await Swal.fire({
          title: "Berhasil!",
          text: "Report anda berhasil terkirim",
          icon: "success",
          confirmButtonColor: "#2d3e50",
          confirmButtonText: "<div style='color: white'>OK</div>",
        });

        router.go(0);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Silahkan login terlebih dahulu!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
          confirmButtonText: "<div style='color: white'>OK</div>",
        });
      }
    };

    return {
      data,
      image,
      phoneNumberError: computedPhoneError,
      messageError: computedMessageError,
      attachmentError,
      handleFileChange,
      submit,
      focusFunc,
      blurFunc,
      validatePhoneNumber,
      validateMessage,
      clearErrors,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input,
textarea {
  font-family: "Poppins", sans-serif;
}

.file {
  height: 40.74px;
  border-radius: 0.25rem;
  background-color: #2d3e50;
  color: white;
  border: 2px solid #fafafa;
}

.report-header {
  background-color: #24262b;
  padding: 60px;
  color: white;
}

.report-header-text {
  margin-left: 15%;
}

.report-header h2 {
  margin: 0;
  font-size: 50px; /* Adjust the value as needed */
  font-weight: 700;
  margin-bottom: 15px;
}

.report-header h3 {
  margin: 0;
  font-size: 16px; /* Adjust the value as needed */
  font-weight: 300;
}
.report-container {
  position: relative;
  width: 100%;
  padding: 2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: -20px;
}

.report-form {
  width: 100%;
  max-width: 985px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 100;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.contact-form {
  background-color: #2d3e50;
  position: relative;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

form {
  padding: 2.3rem 2.2rem;
  z-index: 10;
  overflow: hidden;
  position: relative;
}

.title {
  color: #fff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 0.7rem;
}

.input-container {
  position: relative;
  margin: 1rem 0;
}

.input {
  width: 100%;
  outline: none;
  border: 2px solid #fafafa;
  background: none;
  padding: 0.6rem 1.2rem;
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  border-radius: 5px;
  transition: 0.3s;
}

textarea.input {
  padding: 0.8rem 1.2rem;
  min-height: 130px;
  border-radius: 5px;
  resize: none;
  overflow-y: auto;
}

.input-container label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  padding: 0 0.4rem;
  color: #fafafa;
  font-size: 0.9rem;
  font-weight: 400;
  pointer-events: none;
  z-index: 1000;
  transition: 0.5s;
}

.input-container.textarea label {
  top: 1rem;
  transform: translateY(0);
}

.btn-submit {
  background-color: #2d3e50 !important;
  font-size: 0.95rem;
  color: #fff !important;
  border-radius: 0.25rem;
  border: 2px solid #fafafa;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  margin: 1rem 0;
  height: 40.74px;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #ffffff !important;
  color: #2d3e50 !important;
}

.input-container span {
  position: absolute;
  top: 0;
  left: 25px;
  transform: translateY(-50%);
  font-size: 0.8rem;
  padding: 0 0.4rem;
  color: transparent;
  pointer-events: none;
  z-index: 500;
}

.input-container span:before,
.input-container span:after {
  content: "";
  position: absolute;
  width: 10%;
  opacity: 0;
  transition: 0.3s;
  height: 5px;
  background-color: #2d3e50;
  top: 50%;
  transform: translateY(-50%);
}

.input-container span:before {
  left: 50%;
}

.input-container span:after {
  right: 50%;
}

.input-container.focus label {
  top: 0;
  transform: translateY(-50%);
  left: 25px;
  font-size: 0.8rem;
}

.input-container.focus span:before,
.input-container.focus span:after {
  width: 50%;
  opacity: 1;
}

.contact-info {
  padding: 2.3rem 2.2rem;
  position: relative;
}

.contact-info .title {
  color: #2d3e50;
}

.text {
  color: #333;
  margin: 1.5rem 0 2rem 0;
}

.information {
  display: flex;
  color: #555;
  margin: 0.7rem 0;
  align-items: center;
  font-size: 0.95rem;
}

.icon {
  width: 28px;
  margin-right: 0.7rem;
}

.social-media {
  padding: 2rem 0 0 0;
}

.social-media p {
  color: #333;
}

.social-icons {
  display: flex;
  margin-top: 0.5rem;
}

.error_message {
  color: #e74c3c;
  font-size: 11px;
  margin-top: 5px;
}

.social-icons a {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: linear-gradient(45deg, #2d3e50, #2d3e50);
  color: #fff;
  text-align: center;
  line-height: 35px;
  margin-right: 0.5rem;
  transition: 0.3s;
}

.swal2-confirm {
  margin-right: 10px;
}

.swal2-confirm:focus {
  margin-right: 10px;
  box-shadow: none !important;
  outline: none !important;
}

.btn:focus,
.file:active {
  box-shadow: none !important;
  outline: none !important;
}
.social-icons a:hover {
  transform: scale(1.05);
}

@media (max-width: 850px) {
  .form {
    grid-template-columns: 1fr;
  }

  .contact-form:before {
    top: -13px;
    left: initial;
    right: 70px;
  }

  .square {
    transform: translate(140%, 43%);
    height: 350px;
  }

  .text {
    margin: 1rem 0 1.5rem 0;
  }

  .social-media {
    padding: 1.5rem 0 0 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1.5rem;
  }

  .contact-info:before {
    display: none;
  }

  .square,
  .big-circle {
    display: none;
  }

  form,
  .contact-info {
    padding: 1.7rem 1.6rem;
  }

  .text,
  .information,
  .social-media p {
    font-size: 0.8rem;
  }

  .title {
    font-size: 1.15rem;
  }

  .social-icons a {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }

  .icon {
    width: 23px;
  }

  .input {
    padding: 0.45rem 1.2rem;
  }

  .btn {
    padding: 0.45rem 1.2rem;
  }
}
</style>

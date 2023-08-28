<template>
  <div class="modal">
    <div class="form_container">
      <i class="uil uil-times form_close" @click="closeRegisterForm"></i>
      <div class="form signup_form">
        <form @submit.prevent="submit">
          <h2>Signup</h2>
          <div class="input_box">
            <input
              v-model="data.email"
              type="email"
              placeholder="Enter your email"
              oninvalid="Eror data"
              required
            />
            <i class="uil uil-envelope-alt email"></i>
          </div>
          <div class="input_box">
            <input
              v-model="data.username"
              placeholder="Enter your username"
              required
            />
            <i class="uil uil-user user"></i>
          </div>
          <div class="input_box">
            <input
              v-model="data.password"
              type="password"
              placeholder="Create password"
              required
            />
            <i class="uil uil-lock password"></i>
            <i
              class="uil uil-eye-slash pw_hide"
              @click="togglePasswordVisibility"
            ></i>
          </div>
          <div class="input_box">
            <input
              v-model="confirm"
              type="password"
              placeholder="Confirm password"
              required
            />
            <i class="uil uil-lock password"></i>
            <i
              class="uil uil-eye-slash pw_hide"
              @click="togglePasswordVisibility"
            ></i>
          </div>
          <button type="submit" class="button">Signup Now</button>
          <div class="login_signup">
            Already have an account? <a href="#" id="login">Login</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { routerKey, useRouter } from "vue-router";
import Swal from "sweetalert2";
export default {
  name: "RegisterForm",
  setup() {
    const data = reactive({
      username: "",
      password: "",
      email: "",
    });

    const router = useRouter();

    const confirm = ref();
    const validatePassword = () => {
      return data.password === confirm.value;
    };

    const submit = async () => {
      if (validatePassword()) {
        try {
          const res = await fetch("http://localhost:8080/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) {
            throw new Error();
          } else {
            await Swal.fire({
              title: "Berhasil!",
              text: "Berhasil melakukan register",
              icon: "success",
              confirmButtonColor: "#2d3e50",
            });
            router.go();
          }
        } catch (error) {
          Swal.fire({
            title: "Gagal!",
            text: "Email atau username sudah terdaftar!",
            icon: "error",
            confirmButtonColor: "#2d3e50",
          });
          console.error("Error fetching data:", error);
        }
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Masukkan password dengan benar!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
      }
    };

    const togglePasswordVisibility = (event) => {
      const getPwInput = event.target.parentElement.querySelector("input");
      if (getPwInput.type === "password") {
        getPwInput.type = "text";
        event.target.classList.replace("uil-eye-slash", "uil-eye");
      } else {
        getPwInput.type = "password";
        event.target.classList.replace("uil-eye", "uil-eye-slash");
      }
    };

    return {
      data,
      submit,
      togglePasswordVisibility,
      confirm,
      router,
    };
  },
  methods: {
    closeRegisterForm() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
a {
  text-decoration: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: table;
  transition: all 0.5s ease-out;
  z-index: 200;
}

.sign_up {
  color: #008cff;
}
.button {
  padding: 6px 24px;
  border: 2px solid #fff;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}
.button:active {
  transform: scale(0.98);
}
.form_container {
  position: fixed;
  max-width: 320px;
  width: 100%;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.1);
  z-index: 200;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  transition: all 0.4s ease-out;
}

.form_container h2 {
  font-size: 22px;
  color: #0b0217;
  text-align: center;
}
.input_box {
  position: relative;
  margin-top: 30px;
  width: 100%;
  height: 40px;
}
.input_box input {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  padding: 0 30px;
  color: #333;
  transition: all 0.2s ease;
  border-bottom: 1.5px solid #aaaaaa;
}
.input_box input:focus {
  border-color: #008cff;
}
.input_box i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #707070;
}
.input_box i.email,
.input_box i.password,
.input_box i.user {
  left: 0;
}
.input_box input:focus ~ i.email,
.input_box input:focus ~ i.password,
.input_box input:focus ~ i.user {
  color: #008cff;
}
.input_box i.pw_hide {
  right: 0;
  font-size: 18px;
  cursor: pointer;
}
.option_field {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form_close {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #0b0217;
  font-size: 22px;
  opacity: 0.7;
  cursor: pointer;
}

.form_container a {
  color: #008cff;
  font-size: 12px;
}
.form_container a:hover {
  text-decoration: underline;
}
.checkbox {
  display: flex;
  column-gap: 8px;
  white-space: nowrap;
}
.checkbox input {
  accent-color: #008cff;
}
.checkbox label {
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  color: #0b0217;
}
.form_container .button {
  background: #2d3e50;
  margin-top: 30px;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
}
.login_signup {
  font-size: 12px;
  text-align: center;
  margin-top: 15px;
}
</style>

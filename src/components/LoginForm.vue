<template>
  <div class="modal">
    <div class="form_container" ref="modal">
      <i class="uil uil-times form_close" @click="closeLoginForm"></i>
      <div class="form login_form">
        <form @submit.prevent="submit">
          <h2>Login</h2>
          <div class="input_box">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <i class="uil uil-envelope-alt email"></i>
          </div>
          <div class="input_box">
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <i class="uil uil-lock password"></i>
            <i
              class="uil uil-eye-slash pw_hide"
              @click="togglePasswordVisibility"
            ></i>
          </div>
          <div v-if="passwordError" class="error_message">
            {{ passwordError }}
          </div>
          <div class="option_field">
            <div class="forgot_pw_wrapper">
              <RouterLink
                class="forgot_pw"
                to="/forgotPassword"
                @click="closeLoginForm"
                >Forgot password?</RouterLink
              >
            </div>
          </div>
          <button type="submit" class="button">Login Now</button>
          <div class="login_signup">
            Don't have an account?
            <a href="" @click.prevent="moveToRegister">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  emits: ["close", "openRegisterForm"],
  name: "LoginForm",
  data() {
    return {
      password: "",
      email: "",
      passwordError: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    validatePassword() {
      let isValid = true;

      // Check password length
      if (!this.password) {
        this.passwordError = "Password is required";
        isValid = false;
      } else if (this.password.length < 8) {
        this.passwordError = "Password must be at least 8 characters long";
        isValid = false;
      } else if (this.password.length > 30) {
        this.passwordError = "Password cannot exceed 30 characters long";
        isValid = false;
      }

      return isValid;
    },
    clearErrors() {
      this.passwordError = "";
    },
    async submit() {
      this.clearErrors();

      if (!this.validatePassword()) {
        return;
      }
      try {
        const res = await fetch("http://localhost:8080/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error();
        } else {
          await Swal.fire({
            title: "Berhasil!",
            text: "Berhasil melakukan login",
            icon: "success",
            confirmButtonColor: "#2d3e50",
            confirmButtonText: "<div style='color: white'>" + "OK" + "</div>",
          });
          this.router.go();
        }
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Email dengan password tidak sesuai!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
          confirmButtonText: "<div style='color: white'>" + "OK" + "</div>",
        });
        console.error("Error fetching data:", error);
      }
    },
    togglePasswordVisibility(event) {
      const getPwInput = event.target.parentElement.querySelector("input");
      if (getPwInput.type === "password") {
        getPwInput.type = "text";
        event.target.classList.replace("uil-eye-slash", "uil-eye");
      } else {
        getPwInput.type = "password";
        event.target.classList.replace("uil-eye", "uil-eye-slash");
      }
    },
    closeLoginForm() {
      this.$emit("close");
    },
    moveToRegister() {
      this.$emit("close");
      this.$emit("openRegisterForm");
    },
    closeOnEscape(event) {
      if (event.key === "Escape") {
        this.closeLoginForm();
        const loginButton = document.querySelector(
          ".btn.login-button.no-hover-effect"
        );
        if (loginButton) {
          loginButton.blur();
        }
      }
    },
    handleClickOutside(event) {
      const sweetAlertContainer = document.querySelector(".swal2-container");
      if (
        this.$refs.modal &&
        !this.$refs.modal.contains(event.target) &&
        !sweetAlertContainer
      ) {
        this.closeLoginForm();
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.closeOnEscape);
    document.addEventListener("click", this.handleClickOutside, true);
  },
  unmounted() {
    document.removeEventListener("keydown", this.closeOnEscape);
    document.removeEventListener("click", this.handleClickOutside, true);
  },
};
</script>

<style scoped>
@import url("https://unicons.iconscout.com/release/v4.0.0/css/line.css");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.1);
  z-index: 200;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  transition: all 0.4s;
}
.form_container h2 {
  font-size: 22px;
  color: #0b0217;
  text-align: center;
  font-weight: 600;
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
  font-size: 20px;
  color: #707070;
}
.input_box i.email,
.input_box i.password {
  left: 0;
}
.input_box input:focus ~ i.email,
.input_box input:focus ~ i.password {
  color: #008cff;
}
.input_box i.pw_hide {
  right: 0;
  font-size: 18px;
  cursor: pointer;
}
.option_field {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot_pw_wrapper {
  text-align: right;
  width: 100%;
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
  margin-top: 20px;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
}
.login_signup {
  font-size: 12px;
  text-align: center;
  margin-top: 15px;
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s ease;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active,
.modal-animation-inner-leave-active {
  transition: all 0.3s ease;
}

.modal-animation-inner-enter-from,
.modal-animation-inner-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.error_message {
  color: #e74c3c;
  font-size: 11px;
  margin-top: 5px;
}
</style>

<template>
  <div class="forgot-password-container">
    <div class="form-card">
      <h1 class="title">Forgot Password</h1>
      <p class="subtitle">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            :class="{ 'input-error': emailError }"
            @input="clearErrors"
            placeholder="Enter your email address"
            required
          />
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>

        <button type="submit" class="submit-button" :disabled="isLoading">
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Reset Email</span>
        </button>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="generalError" class="error-message">{{ generalError }}</p>
      </form>

      <div class="links">
        <router-link to="/">Back to Home Page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      emailError: "",
      generalError: "",
      successMessage: "",
      isLoading: false,
    };
  },
  methods: {
    clearErrors() {
      this.emailError = "";
      this.generalError = "";
      this.successMessage = "";
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "Email is required";
        return false;
      } else if (!emailRegex.test(this.email)) {
        this.emailError = "Please enter a valid email address";
        return false;
      }
      return true;
    },
    async handleSubmit() {
      this.clearErrors();

      if (!this.validateEmail()) {
        return;
      }

      this.isLoading = true;

      try {
        const res = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/user/sendEmail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.email }),
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error();
        }

        this.successMessage = `Password reset instructions have been sent to ${this.email}`;
        this.email = "";
      } catch (error) {
        this.generalError =
          "Failed to send reset email. Please try again later.";
        console.error("Password reset error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.form-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 450px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  margin-bottom: 30px;
  color: #666;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.input-error {
  border-color: #e74c3c;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #2d3e50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:active {
  transform: scale(0.98);
}

.submit-button:disabled {
  background-color: #414e5e;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.success-message {
  color: #2ecc71;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
}

.links {
  margin-top: 20px;
  text-align: center;
}

.links a {
  color: #4a90e2;
  text-decoration: none;
  font-size: 14px;
}

.links a:hover {
  text-decoration: underline;
}
</style>

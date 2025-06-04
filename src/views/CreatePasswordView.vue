<template>
  <div class="forgot-password-container">
    <div class="form-card">
      <h1 class="title">Create New Password</h1>
      <p class="subtitle">
        Enter your new password below to update your password.
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            :class="{ 'input-error': passwordError }"
            @input="clearErrors"
            placeholder="Enter your new password"
            required
          />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            :class="{ 'input-error': confirmPasswordError }"
            @input="clearErrors"
            placeholder="Confirm your new password"
            required
          />
          <p v-if="confirmPasswordError" class="error-message">
            {{ confirmPasswordError }}
          </p>
        </div>

        <button type="submit" class="submit-button" :disabled="isLoading">
          <span v-if="isLoading">Updating...</span>
          <span v-else>Submit</span>
        </button>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
        <p v-if="generalError" class="error-message">{{ generalError }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateNewPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      passwordError: "",
      confirmPasswordError: "",
      generalError: "",
      successMessage: "",
      isLoading: false,
      redirectTimer: null,
      username: "",
      emailVerPassword: "",
    };
  },
  methods: {
    clearErrors() {
      this.passwordError = "";
      this.confirmPasswordError = "";
      this.generalError = "";
      this.successMessage = "";
    },
    validatePasswords() {
      let isValid = true;

      // Check password length
      if (!this.password) {
        this.passwordError = "Password is required";
        isValid = false;
      } else if (this.password.length < 8) {
        this.passwordError = "Password must be at least 8 characters long";
        isValid = false;
      }

      // Check if passwords match
      if (!this.confirmPassword) {
        this.confirmPasswordError = "Please confirm your password";
        isValid = false;
      } else if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Passwords do not match";
        isValid = false;
      }

      return isValid;
    },
    async handleSubmit() {
      this.clearErrors();

      if (!this.validatePasswords()) {
        return;
      }

      this.isLoading = true;

      const urlParams = new URLSearchParams(window.location.search);
      this.username = urlParams.get("u");
      this.emailVerPassword = urlParams.get("evpw");

      try {
        const res = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/user/resetPassword",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
              emailVerPassword: this.emailVerPassword,
            }),
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error();
        }

        this.successMessage =
          "Password updated successfully! Redirecting to home page...";
        this.password = "";
        this.confirmPassword = "";

        // Redirect to login page after 2 seconds
        this.redirectTimer = setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (error) {
        this.generalError =
          "Failed to update password. Please try again later.";
        console.error("Password update error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  beforeUnmount() {
    // Clear any pending timers when component is destroyed
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
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
  transition: background-color 0.3s ease, transform 0.1s ease;
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

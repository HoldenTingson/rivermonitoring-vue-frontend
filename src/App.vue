<template>
  <main>
    <div class="page">
      <PageHeader
        class="header"
        @openLoginForm="isLoginFormOpen = true"
        @openRegisterForm="isRegisterFormOpen = true"
      ></PageHeader>
      <div class="content">
        <RouterView />
      </div>
      <PageFooter
        class="footer"
        :style="{ 'margin-top': footerBottom + 'px' }"
      ></PageFooter>
      <LoginForm
        v-if="isLoginFormOpen"
        @close="isLoginFormOpen = false"
        @openRegisterForm="isRegisterFormOpen = true"
      />
      <RegisterForm
        v-if="isRegisterFormOpen"
        @close="isRegisterFormOpen = false"
        @openLoginForm="isLoginFormOpen = true"
      />
    </div>
  </main>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import PageFooter from "@/components/Footer.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isLoginFormOpen: false,
      isRegisterFormOpen: false,
      footerBottom: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.footerBottom = 0;
    }, 1000);
  },
};
</script>

<style>
.content {
  padding-top: 70px;
  padding-bottom: 60px;
}
</style>

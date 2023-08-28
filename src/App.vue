<script>
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
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
  setup() {
    const isLoginFormOpen = ref(false);
    const isRegisterFormOpen = ref(false);
    const footerBottom = ref();

    onMounted(async () => {
      await fetch("http://localhost:8080/river/update", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    });

    onMounted(() => {
      setTimeout(() => {
        footerBottom.value = 0;
      }, 1000);
    });

    return {
      isLoginFormOpen,
      isRegisterFormOpen,
      footerBottom,
    };
  },
};
</script>

<template>
  <main>
    <div
      class="page"
      :class="{ 'no-scroll': isLoginFormOpen || isRegisterFormOpen }"
    >
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
      <div v-if="isLoginFormOpen">
        <LoginForm @close="isLoginFormOpen = false" />
      </div>
      <div v-if="isRegisterFormOpen">
        <RegisterForm @close="isRegisterFormOpen = false" />
      </div>
    </div>
  </main>
</template>

<style>
.content {
  padding-top: 70px;
  padding-bottom: 60px;
}

.page.no-scroll {
  overflow: hidden;
}
</style>

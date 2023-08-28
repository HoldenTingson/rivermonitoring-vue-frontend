import { createStore } from "vuex";

export default createStore({
  state: {
    authenticated: localStorage.getItem("authenticated") === "true" || false,
  },
  mutations: {
    SET_AUTH: (state, auth) => {
      console.log("Setting authenticated to", auth);
      state.authenticated = auth;
      localStorage.setItem("authenticated", auth);
    },
  },
  actions: {
    setAuth({ commit }, auth) {
      commit("SET_AUTH", auth);
    },
  },
  modules: {},
});

import Axios from "axios";

const loginUrl = "http://localhost:3500/login";

export default {
  state: {
    authenticated: false,
    jwt: null
  },
  getters: {
    authenticatedAxios(state) {
      return Axios.create({
        headers: {
          "Authorization": `Bearer<${state.jwt}>`
        }
      });
    }
  },
  mutations: {
    setAuthenticated(state, tokenValue) {
      state.authenticated = true;
      state.jwt = tokenValue;
    }
  },
  actions: {
    async authenticate(context, payload) {
      let response = await Axios.post(loginUrl, { name: payload.username, password: payload.password });
      if (response.data.success === true) {
        context.commit('setAuthenticated', response.data.token);
      }
    }
  }
}

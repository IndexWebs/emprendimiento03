// store/modules/products.js

import { db, firebase } from "@/plugins/firebase";

const state = {
  loading: false,
};

const mutations = {
  SET_LOADING(state, value) {
    state.loading = value;
  },
};

const actions = {
  async createProduct({ commit }, productData) {
    commit("SET_LOADING", true);

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`products/${productData.name}/${productData.image.name}`);
    const snapshot = await imageRef.put(productData.image);
    const downloadURL = await snapshot.ref.getDownloadURL();
    productData.image = downloadURL;

    await db.collection("products").add(productData);

    commit("SET_LOADING", false);
    // Puedes devolver algún valor si es necesario
  },
};

export default {
  state,
  mutations,
  actions,
};

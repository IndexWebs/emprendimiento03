// store/index.js

import Vuex from "vuex";
import { db } from "@/plugins/firebase";

const createStore = () => {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      filteredProducts: [],
      cart: {
        items: [],
      },
    },
    mutations: {
      setProducts(state, products) {
        state.products = products;
      },
      setFilteredProducts(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
      },
      setCategories(state, categories) {
        // Mutación para establecer las categorías
        state.categories = categories;
      },
      addItem(state, payload) {
        // Agregamos un item al carrito
        state.cart.items.push(payload);
      },
      removeItem(state, payload) {
        // Removemos un item del carrito
        const index = state.cart.items.findIndex(
          (item) => item.id === payload.id
        );
      },
    },
    actions: {
      async fetchProducts({ commit }) {
        try {
          const response = await db.collection("products").get();
          const products = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("setProducts", products);
          commit("setFilteredProducts", products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      async fetchCategories({ commit }) {
        // Acción para obtener las categorías
        try {
          const response = await db.collection("categories").get();
          const categories = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("setCategories", categories);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
      filterProducts({ state, commit }, category) {
        console.log("Filtering products by category:", category);
        if (category === "") {
          commit("setFilteredProducts", state.products);
        } else {
          const filteredProducts = state.products.filter((product) =>
            product.category.includes(category)
          );
          commit("setFilteredProducts", filteredProducts);
        }
      },
    },
  });
};

export default createStore;

import Vuex from "vuex";
import { db, firebase } from "@/plugins/firebase";

const createStore = () => {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      filteredProducts: [],
      product: {},
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
        state.categories = categories;
      },
      setProduct(state, product) {
        state.product = product;
      },
      addItem(state, payload) {
        state.cart.items.push(payload);
      },
      removeItem(state, payload) {
        const index = state.cart.items.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.cart.items.splice(index, 1);
        }
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
      async fetchProductBySlug({ commit }, slug) {
        try {
          const ref = db.collection("products").where("handle", "==", slug);
          const snapshot = await ref.get();
          const product = snapshot.docs.shift().data();
          commit("setProduct", product);
        } catch (error) {
          console.error("Error fetching product:", error);
          commit("setProduct", {});
        }
      },
      filterProducts({ state, commit }, category) {
        if (category === "") {
          commit("setFilteredProducts", state.products);
        } else {
          const filteredProducts = state.products.filter((product) =>
            product.category.includes(category)
          );
          commit("setFilteredProducts", filteredProducts);
        }
      },
      async addProduct({ commit }, product) {
        try {
          // Subir la imagen a Firebase Storage
          const storageRef = firebase.storage().ref();
          const imageRef = storageRef.child(`products/${product.name}/${product.image.name}`);
          const snapshot = await imageRef.put(product.image);
          const downloadURL = await snapshot.ref.getDownloadURL();

          // Actualizar el producto con la URL de la imagen
          product.image = downloadURL;

          // Guardar el producto en Firestore
          await db.collection("products").add(product);

          // (Opcional) Fetch de nuevo los productos después de agregar uno nuevo
          const response = await db.collection("products").get();
          const products = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("setProducts", products);
        } catch (error) {
          console.error("Error adding product:", error);
        }
      },

      async deleteProduct({ dispatch }, id) {
        try {
          const ref = db.collection("products").doc(id);
          const doc = await ref.get();

          if (doc.exists) {
            const data = doc.data();
            const imageUrl = data.image;

            // Eliminar el documento
            await ref.delete();

            // Eliminar la imagen de Firebase Storage
            const storageRef = firebase.storage().refFromURL(imageUrl);
            await storageRef.delete();

            console.log("Producto y su imagen eliminados correctamente.");

            // Refetch los productos después de eliminar
            await dispatch("fetchProducts");
          } else {
            console.log("No se encontró el documento.");
          }
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      },
    },
  });
};

export default createStore;

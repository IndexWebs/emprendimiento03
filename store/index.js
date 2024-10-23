import Vuex from "vuex";
import { db, firebase } from "@/plugins/firebase";
import "firebase/storage";
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
      async filterProducts({ commit }, category) {
        try {
          let query = db.collection("products");
          
          // Si se ha seleccionado una categoría específica, hacer la consulta filtrada
          if (category !== "") {
            query = query.where("category", "==", category);
          }
      
          const snapshot = await query.get();
          const filteredProducts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          commit("setFilteredProducts", filteredProducts);
        } catch (error) {
          console.error("Error filtering products:", error);
        }
      },
      async updateProduct({ commit }, product) {
        try {
          const productQuery = await db
            .collection("products")
            .where("handle", "==", product.handle)
            .get();

          if (productQuery.empty) {
            throw new Error("Producto no encontrado");
          }

          const productId = productQuery.docs[0].id;
          const productRef = db.collection("products").doc(productId);

          await productRef.update({
            name: product.name,
            handle: product.handle,
            category: product.category,
            price: product.price,
            description: product.description,
          });

          console.log("Producto actualizado correctamente");

          // Vuelve a obtener los productos si es necesario
          const response = await db.collection("products").get();
          const products = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("setProducts", products);
        } catch (error) {
          console.error("Error al actualizar el producto:", error);
          throw error;
        }
      },
      async uploadImage({ commit }, file) {
        try {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(`products/${file.name}`);
          const snapshot = await fileRef.put(file);
          const downloadURL = await snapshot.ref.getDownloadURL();
          return downloadURL;
        } catch (error) {
          console.error("Error al subir el archivo:", error);
          throw error;
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
      async deleteProduct({ commit, dispatch }, id) {
        try {
          const ref = db.collection("products").doc(id);
          const doc = await ref.get();

          if (!doc.exists) {
            throw new Error("Producto no encontrado");
          }

          const data = doc.data();
          const imageUrl = data.image;

          await ref.delete();
          console.log("Documento eliminado correctamente");

          if (imageUrl) {
            const storageRef = firebase.storage().refFromURL(imageUrl);
            await storageRef.delete();
            console.log("Imagen eliminada de Firebase Storage.");
          }

          // Refresca los productos después de eliminar uno
          await dispatch("fetchProducts");
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          throw error;
        }
      },
    },
  });
};

export default createStore;

import Vuex from "vuex";
import { db, firebase } from "@/plugins/firebase";
import "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";


const createStore = () => {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      talles: [],
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
      setTalles(state, talles) {
        state.talles = talles;
      },
      setProduct(state, product) {
        state.product = product;
      },
      addItemToCart(state, item) {
        const newItem = {
          ...item,
          uid: Date.now() + Math.random(), // UID único por si querés identificarlo luego
        };

        state.cart.items.push(newItem);
      },
      removeItem(state, payload) {
        const index = state.cart.items.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.cart.items.splice(index, 1);
        }
      },
      vaciarCarrito(state) {
        state.cart.items = [];
      },
      UPDATE_PRODUCT_IMAGE(state, { productId, imageIndex, newImageUrl }) {
        const product = state.products.find((p) => p.id === productId);
        if (product) {
          product.images[imageIndex] = newImageUrl;
        }
      },
    },
    getters: {
      cartItems(state) {
        return state.cart.items;
      },
      cartSubtotal(state) {
        return state.cart.items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
      },
      cartDiscount(state, getters) {
        const cantidad = getters.cartItems.length;
        if (cantidad === 1) return 0;
        if (cantidad === 2) return 2000 * cantidad;
        if (cantidad >= 3) return 3000 * cantidad;
        return 0;
      },
      cartTotalWithDiscount(state, getters) {
        return getters.cartSubtotal - getters.cartDiscount;
      },
      cartTotal(state, getters) {
        // Para compatibilidad, cartTotal será igual a cartTotalWithDiscount
        return getters.cartTotalWithDiscount;
      },
    },
    actions: {
      async crearPedidoContraEntrega({ state, commit, getters }, datosCliente) {
        try {
          const pedido = {
            ...datosCliente,
            productos: state.cart.items,
            subtotal: getters.cartSubtotal,
            descuento: getters.cartDiscount,
            total: getters.cartTotalWithDiscount,
            estado: "pendiente",
            metodoPago: "contraentrega",
            fecha: Date.now()
          };

          const docRef = await db.collection("pedidos").add(pedido);
          const pedidoId = docRef.id;

          // Actualizar el documento con su propio ID
          await db.collection("pedidos").doc(pedidoId).update({ id: pedidoId });
          
          // Vaciar el carrito después de crear el pedido
          commit("vaciarCarrito");

          // Guardar el pedido en localStorage para la página de gracias
          localStorage.setItem('ultimoPedido', JSON.stringify(pedido));

          // Enviar notificación por correo
          const productosTexto = pedido.productos.map(p => `- ${p.name} (${p.qty} unidades)`).join('\n');
          const mensaje = `¡Nuevo Pedido #${pedidoId}!\n\nCliente: ${pedido.nombre}\nTeléfono: ${pedido.telefono}\nDirección: ${pedido.direccion}\n\nProductos:\n${productosTexto}\n\nSubtotal: $${pedido.subtotal}\nDescuento: $${pedido.descuento}\nTotal: $${pedido.total}`;
          
          // Llamar a la función de Netlify para enviar el correo
          await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: 'mugnestoficial@gmail.com', // Tu correo electrónico
              subject: `Nuevo Pedido #${pedidoId}`,
              text: mensaje,
              html: `
                <h2>¡Nuevo Pedido #${pedidoId}!</h2>
                <p><strong>Cliente:</strong> ${pedido.nombres} ${pedido.apellidos}</p>
                <p><strong>Teléfono:</strong> ${pedido.telefono}</p>
                <p><strong>Dirección:</strong> ${pedido.direccion}</p>
                <h3>Productos:</h3>
                <ul>
                  ${pedido.productos.map(p => `<li>${p.name} (${p.qty} unidades)</li>`).join('')}
                </ul>
                <p><strong>Subtotal:</strong> $${pedido.subtotal}</p>
                <p><strong>Descuento:</strong> $${pedido.descuento}</p>
                <p><strong>Total:</strong> $${pedido.total}</p>
              `
            })
          });

        } catch (error) {
          console.error("Error al crear pedido contra entrega:", error);
          throw error;
        }
      },
      async crearPedidoWompi({ state, commit, getters }, datosCliente) {
        try {
          const pedido = {
            ...datosCliente,
            productos: state.cart.items.length ? state.cart.items : datosCliente.productos,
            subtotal: datosCliente.subtotal || getters.cartSubtotal,
            descuento: datosCliente.descuento || getters.cartDiscount,
            total: datosCliente.total || getters.cartTotalWithDiscount,
            estado: datosCliente.estado || "pagado",
            metodoPago: "Wompi",
            fecha: Date.now(),
          };
      
          const docRef = await db.collection("pedidos").add(pedido);
          const pedidoId = docRef.id;
      
          await db.collection("pedidos").doc(pedidoId).update({ id: pedidoId });
          
          // Vaciar el carrito después de crear el pedido solo si ya está pagado
          if (pedido.estado === "pagado") {
            commit("vaciarCarrito");
          }

          // Guardar el pedido en localStorage para la página de gracias
          localStorage.setItem('ultimoPedido', JSON.stringify({ ...pedido, id: pedidoId }));

          // Enviar notificación por correo
          const productosTexto = pedido.productos.map(p => `- ${p.name} (${p.qty} unidades)`).join('\n');
          const mensaje = `¡Nuevo Pedido #${pedidoId}!\n\nCliente: ${pedido.nombre}\nTeléfono: ${pedido.telefono}\nDirección: ${pedido.direccion}\n\nProductos:\n${productosTexto}\n\nSubtotal: $${pedido.subtotal}\nDescuento: $${pedido.descuento}\nTotal: $${pedido.total}`;
          
          // Llamar a la función de Netlify para enviar el correo
          await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: 'tu-email@ejemplo.com', // Tu correo electrónico
              subject: `Nuevo Pedido #${pedidoId}`,
              text: mensaje,
              html: `
                <h2>¡Nuevo Pedido #${pedidoId}!</h2>
                <p><strong>Cliente:</strong> ${pedido.nombre}</p>
                <p><strong>Teléfono:</strong> ${pedido.telefono}</p>
                <p><strong>Dirección:</strong> ${pedido.direccion}</p>
                <h3>Productos:</h3>
                <ul>
                  ${pedido.productos.map(p => `<li>${p.name} (${p.qty} unidades)</li>`).join('')}
                </ul>
                <p><strong>Subtotal:</strong> $${pedido.subtotal}</p>
                <p><strong>Descuento:</strong> $${pedido.descuento}</p>
                <p><strong>Total:</strong> $${pedido.total}</p>
              `
            })
          });
      
          return pedidoId;
        } catch (error) {
          console.error("Error al crear pedido con Wompi:", error);
          throw error;
        }
      },
      
      enviarOrden({ getters }) {
        const number = "+573150361379";
        const pedido = getters.cartItems
          .map((item) => `x${item.qty} ${item.name}`)
          .join(" || ");
        const total = getters.cartTotal;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
          `Pedido: ${pedido}. **SUBTOTAL: ${total}**`
        )}`;
        window.open(whatsappUrl);
      },

      addToCart({ commit }, { product, quantity, color }) {
        // Asegurarse de que el precio sea un número
        const priceNumber = Number(product.price);
        commit("addItemToCart", {
          id: product.id,
          name: product.name,
          image: product.images[0],
          qty: quantity,
          category: product.category,
          price: priceNumber,
          color: color
        });
      },
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
      async fetchTalles({ commit }) {
        try {
          const response = await db.collection("talles").get();
          const talles = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("setTalles", talles);
        } catch (error) {
          console.error("Error fetching talles:", error);
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

          // Asegúrate de incluir todas las propiedades que quieres actualizar, incluyendo 'images'
          await productRef.update({
            name: product.name,
            handle: product.handle,
            category: product.category,
            price: product.price,
            description: product.description,
            images: product.images, // Agregar el array de imágenes actualizado
            talle: product.talle,
            stock: product.stock
          });

          console.log("Producto actualizado correctamente");

          // Opcional: Vuelve a obtener los productos y actualiza el estado del store
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

      async uploadImage({ commit }, { file, oldImageUrl, productName }) {
        try {
          const storageRef = firebase.storage().ref();

          // Ruta específica para la imagen del producto
          const fileRef = storageRef.child(`products/${productName}/${file.name}`);

          // Subir la nueva imagen
          const snapshot = await fileRef.put(file);
          const downloadURL = await snapshot.ref.getDownloadURL();

          // Eliminar la imagen anterior si existe
          if (oldImageUrl) {
            const oldFileRef = storageRef.storage.refFromURL(oldImageUrl);
            await oldFileRef.delete();
          }

          return downloadURL;
        } catch (error) {
          console.error("Error al manejar la imagen:", error);
          throw error;
        }
      },
      async updateProductImage({ commit }, { productId, imageIndex, newImageUrl }) {
        try {
          const productRef = firebase.firestore().collection("products").doc(productId);

          // Obtener el producto actual
          const productDoc = await productRef.get();
          if (!productDoc.exists) throw new Error("Producto no encontrado");

          const productData = productDoc.data();
          const updatedImages = [...productData.images];
          updatedImages[imageIndex] = newImageUrl;

          // Actualizar el array de imágenes en Firestore
          await productRef.update({ images: updatedImages });

          // Opcional: actualizar el store localmente
          commit("UPDATE_PRODUCT_IMAGE", { productId, imageIndex, newImageUrl });
        } catch (error) {
          console.error("Error al actualizar la imagen en el producto:", error);
          throw error;
        }
      },

      async addProduct({ commit }, product) {
        try {
          const storageRef = firebase.storage().ref();
          const imageUrls = [];

          // Subir todas las imágenes seleccionadas
          for (const image of product.images) {
            const imageRef = storageRef.child(`products/${product.name}/${image.name}`);
            const snapshot = await imageRef.put(image);
            const downloadURL = await snapshot.ref.getDownloadURL();
            imageUrls.push(downloadURL);
          }

          // Agregar las URLs de las imágenes al producto
          product.images = imageUrls;

          // Crear el documento en Firestore y obtener el ID
          const docRef = await db.collection("products").add(product);
          const productId = docRef.id;

          // Actualizar el producto en Firestore con su ID
          await db.collection("products").doc(productId).update({ id: productId });

          // Refrescar productos después de agregar uno nuevo
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

      async actualizarEstadoPedido({ }, { id, estado }) {
        try {
          const pedidoRef = db.collection("pedidos").doc(id);
          await pedidoRef.update({ estado });
        } catch (error) {
          console.error("Error al actualizar el estado del pedido:", error);
          throw error;
        }
      },
    },
  });
};

export default createStore;

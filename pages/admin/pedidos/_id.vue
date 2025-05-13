<template>
  <div v-if="pedido">
    <h1 class="text-2xl font-bold mb-4">Pedido: {{ pedido.referencia }}</h1>
    <p><b>Cliente:</b> {{ pedido.nombres }} {{ pedido.apellidos }}</p>
    <p><b>Dirección:</b> {{ pedido.direccion }}</p>
    <p><b>Estado:</b>
      <select v-model="pedido.estado">
        <option value="pendiente">Pendiente</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </select>
      <button @click="guardarEstado" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Guardar</button>
    </p>
    <h2 class="mt-4 font-bold">Productos</h2>
    <ul>
      <li v-for="prod in pedido.productos" :key="prod.uid">
        {{ prod.nombre || prod.uid }} - Cantidad: {{ prod.qty }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase' // Ajusta la ruta si es necesario
export default {
  data() {
    return {
      pedido: null
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const doc = await db.collection('pedidos').doc(id).get()
    this.pedido = { id: doc.id, ...doc.data() }
  },
  methods: {
    async guardarEstado() {
      await db.collection('pedidos').doc(this.pedido.id).update({
        estado: this.pedido.estado
      })
      alert('Estado actualizado')
    }
  }
}
</script> 
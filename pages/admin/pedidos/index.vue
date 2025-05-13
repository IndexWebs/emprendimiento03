<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Pedidos</h1>
    <table class="w-full text-sm text-left text-gray-500">
      <thead>
        <tr>
          <th>Referencia</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.referencia }}</td>
          <td>{{ pedido.nombres }} {{ pedido.apellidos }}</td>
          <td>{{ pedido.estado }}</td>
          <td>{{ formatFecha(pedido.fecha) }}</td>
          <td>
            <nuxt-link :to="`/admin/pedidos/${pedido.id}`" class="text-blue-600 underline">Ver/Editar</nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase' // Ajusta la ruta si es necesario
export default {
  data() {
    return {
      pedidos: []
    }
  },
  async mounted() {
    const snapshot = await db.collection('pedidos').get()
    this.pedidos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },
  methods: {
    formatFecha(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script> 
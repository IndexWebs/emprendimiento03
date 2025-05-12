<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div class="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div v-if="procesando" class="flex flex-col items-center justify-center min-h-[300px]">
                <div class="loader mb-4"></div>
                <p class="text-gray-600">Procesando tu pedido...</p>
            </div>
            <div v-else>
                <!-- Ícono de éxito -->
                <div class="mb-6">
                    <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>

                <!-- Mensaje principal -->
                <h1 class="text-3xl font-bold text-gray-900 mb-4">
                    ¡Gracias por tu compra!
                </h1>

                <!-- Mensaje secundario -->
                <p class="text-gray-600 mb-8">
                    Tu pedido ha sido recibido y está siendo procesado. Te enviaremos un mensaje por WhatsApp con los detalles de tu compra.
                </p>

                <!-- Resumen del pedido -->
                <div class="bg-gray-50 rounded-xl p-6 mb-8">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        Resumen de tu pedido
                    </h2>
                    
                    <!-- Productos -->
                    <div class="space-y-4 mb-6">
                        <div v-for="item in pedido.productos" :key="item.uid" class="flex items-center justify-between text-sm">
                            <div class="flex items-center">
                                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg mr-4">
                                <div class="text-left">
                                    <p class="font-medium text-gray-900">{{ item.name }}</p>
                                    <p class="text-gray-500">Cantidad: {{ item.qty }}</p>
                                    <p class="text-gray-500">Color: {{ item.color }}</p>
                                </div>
                            </div>
                            <p class="font-medium text-gray-900">${{ item.price }}</p>
                        </div>
                    </div>

                    <!-- Totales -->
                    <div class="border-t pt-4 space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Subtotal</span>
                            <span class="font-medium">{{ subtotalFormateado }}</span>
                        </div>
                        <div v-if="pedido.descuento && pedido.descuento > 0" class="flex justify-between">
                            <span class="text-gray-600">Descuento</span>
                            <span class="font-medium">{{ descuentoFormateado }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Envío</span>
                            <span class="font-medium">GRATIS</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total</span>
                            <span class="font-medium">{{ totalFormateado }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Método de pago</span>
                            <span class="font-medium">{{ pedido.metodoPago }}</span>
                        </div>
                    </div>
                </div>

                <!-- Información adicional -->
                <div class="bg-gray-50 rounded-xl p-6 mb-8">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        ¿Qué sigue?
                    </h2>
                    <ul class="text-left space-y-3 text-gray-600">
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Recibirás un mensaje de confirmación por WhatsApp con los detalles de tu pedido
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Te mantendremos informado sobre el estado de tu envío
                        </li>
                        <li class="flex items-start">
                            <svg class="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Si tienes alguna pregunta, no dudes en contactarnos
                        </li>
                    </ul>
                </div>

                <!-- Botones de acción -->
                <div class="space-y-4">
                    <button 
                        @click="$router.push('/')" 
                        class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                    >
                        Volver a la tienda
                    </button>
                    <button 
                        @click="$router.push('/contact')" 
                        class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                    >
                        Contactar soporte
                    </button>
                </div>

                <!-- Información de contacto -->
                <div class="mt-8 text-sm text-gray-500">
                    <p>¿Necesitas ayuda? Contáctanos al:</p>
                    <p class="font-semibold mt-1">+57 315 036 1379</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatPrice } from '@/utils/formatPrice';

export default {
    name: 'ThanksPage',
    data() {
        return {
            pedido: {
                productos: [],
                total: 0,
                metodoPago: '',
                fecha: null
            },
            procesando: false
        }
    },
    computed: {
        subtotalFormateado() {
            return formatPrice(this.pedido.subtotal || 0);
        },
        descuentoFormateado() {
            return formatPrice(this.pedido.descuento || 0);
        },
        totalFormateado() {
            return formatPrice(this.pedido.total || 0);
        }
    },
    async mounted() {
        // Detectar si viene de Wompi por el parámetro 'id'
        const urlParams = new URLSearchParams(window.location.search);
        const wompiId = urlParams.get('id');
        console.log('wompiId:', wompiId);
        if (wompiId) {
            this.procesando = true;
            try {
                const form = JSON.parse(localStorage.getItem('checkoutData')) || {};
                const carrito = JSON.parse(localStorage.getItem('carritoData')) || [];
                // Calcular subtotal y descuento directamente
                const subtotal = carrito.reduce((acc, item) => acc + Number(item.price) * (item.qty || 1), 0);
                let descuento = 0;
                if (carrito.length === 2) descuento = 2000 * carrito.length;
                if (carrito.length >= 3) descuento = 3000 * carrito.length;
                const total = subtotal - descuento;
                const pedido = {
                    ...form,
                    productos: carrito,
                    subtotal,
                    descuento,
                    total,
                    estado: "pagado",
                    metodoPago: "Wompi",
                    referencia: wompiId,
                    fecha: Date.now(),
                };
                // LOGS DE DEPURACIÓN
                console.log('Form data:', form);
                console.log('Carrito data:', carrito);
                console.log('Pedido a guardar en thanks:', pedido);
                // Guardar en Firebase y en localStorage
                await this.$store.dispatch('crearPedidoWompi', pedido);
                localStorage.setItem('ultimoPedido', JSON.stringify(pedido));
                this.pedido = pedido;
                // Limpiar datos después de crear el pedido
                localStorage.removeItem('checkoutData');
                localStorage.removeItem('carritoData');
                this.$store.commit('vaciarCarrito');
            } catch (e) {
                console.error('Error al crear el pedido con Wompi en thanks:', e);
            } finally {
                this.procesando = false;
            }
        } else {
            // Flujo contraentrega (o fallback)
            try {
                const pedido = localStorage.getItem('ultimoPedido');
                if (pedido) {
                    this.pedido = JSON.parse(pedido);
                }
            } catch (e) {
                console.error('Error al leer el pedido de localStorage:', e);
                this.pedido = {
                    productos: [],
                    total: 0,
                    metodoPago: '',
                    fecha: null
                };
            }
        }
    },
    head() {
        return {
            title: '¡Gracias por tu compra!',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.'
                }
            ]
        }
    }
}
</script>

<style>
.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
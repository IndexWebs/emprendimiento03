<template>
  <form v-if="firma && expirationDate && referencia && monto">
    <script class="w-full" src="https://checkout.wompi.co/widget.js" data-render="button" v-bind="{
      'data-public-key': publicKey,
      'data-currency': 'COP',
      'data-amount-in-cents': monto,
      'data-reference': referencia,
      'data-redirect-url': redirectUrl,
      'data-expiration-time': expirationDate,
      'data-signature:integrity': firma
    }" />
  </form>
</template>

<script>
export default {
  props: {
    monto: Number,
    referencia: String,
  },
  data() {
    return {
      firma: null,
      expirationDate: null,
      publicKey: "pub_test_KaWx4OD7zBxnvln3aUpbDx9RhkfddyFh",
      redirectUrl: "https://tastytumbler.shop/products/vaso-palomitero",
    };
  },

  async mounted() {
    window.addEventListener("payment_accepted", () => {
      this.$emit("pago-aceptado")
    })
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const expirationISO = oneHourLater.toISOString(); // Wompi requiere formato ISO completo
    this.expirationDate = expirationISO;

    try {
      const res = await fetch("/.netlify/functions/generate-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: this.referencia,
          amount_in_cents: this.monto,
          currency: "COP",
          expiration_time: expirationISO,
        }),
      });

      const data = await res.json();
      this.firma = data.signature;
    } catch (err) {
      console.error("Error generando firma:", err);
    }
  },
};
</script>
<style>
.waybox-button {
  width: 100% !important;
}
</style>
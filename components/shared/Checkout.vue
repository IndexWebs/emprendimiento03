<template>
    <form v-if="firma">
      <script
        src="https://checkout.wompi.co/widget.js"
        data-render="button"
        :data-public-key="publicKey"
        data-currency="COP"
        :data-amount-in-cents="monto"
        :data-reference="referencia"
        :data-redirect-url="redirectUrl"
        :data-expiration-time="expirationTime"
        :data-signature:integrity="firma"
      ></script>
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
        expirationTime: null,
        publicKey: "pub_test_KaWx4OD7zBxnvln3aUpbDx9RhkfddyFh", // Cambialo en producción
        redirectUrl: "https://tusitio.netlify.app/thanks",
      };
    },
    async mounted() {
      // Expira en 1 hora
      const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
      this.expirationTime = expiration;
  
      const res = await fetch("/.netlify/functions/generate-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: this.referencia,
          amountInCents: this.monto,
          currency: "COP",
          expirationTime: expiration,
        }),
      });
  
      const data = await res.json();
      this.firma = data.signature;
    },
  };
  </script>
  
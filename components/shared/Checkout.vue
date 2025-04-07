<template>
    <form v-if="firma && expirationDate && referencia && monto">
      <script
        src="https://checkout.wompi.co/widget.js"
        data-render="button"
        :data-public-key="publicKey"
        data-currency="COP"
        :data-amount-in-cents="monto"
        :data-reference="referencia"
        :data-redirect-url="redirectUrl"
        :data-expiration-time="expirationDate"
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
        expirationDate: null,
        publicKey: "pub_test_KaWx4OD7zBxnvln3aUpbDx9RhkfddyFh", // Cambiar en prod
        redirectUrl: "https://tusitio.netlify.app/thanks",
      };
    },
    async mounted() {
      // Generar fecha de expiración para dentro de 1 hora
      const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
      this.expirationDate = expiration;
  
      const res = await fetch("/.netlify/functions/generate-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: this.referencia,
          amountInCents: this.monto,
          currency: "COP",
          expirationTime: expiration, // OJO: la función sigue esperando este nombre
        }),
      });
  
      const data = await res.json();
      this.firma = data.signature;
    },
  };
  </script>
  
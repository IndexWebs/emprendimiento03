<template>
    <form v-if="firma && expirationDate && referencia && monto">
        <script src="https://checkout.wompi.co/widget.js" data-render="button" v-bind="{
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
            publicKey: "pub_prod_ljfcuLuIeXJEyeuZYLzrYj0414c65Itv", // cambia por la prod cuando toque
            redirectUrl: "https://tastytumbler.shop/products/vaso-palomitero", // cambia por tu dominio
        };
    },
    async mounted() {
        const expiration = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hora
        this.expirationDate = expiration;

        try {
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
        } catch (err) {
            console.error("Error generando firma:", err);
        }
    },
};
</script>
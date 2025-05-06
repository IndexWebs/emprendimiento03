const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { reference, amount_in_cents, currency, expiration_time } = body;

    const secret = process.env.WOMPI_INTEGRITY_SECRET;

    const cadena = `${reference}${amount_in_cents}${currency}${expiration_time}${secret}`;
    const hash = crypto.createHash("sha256").update(cadena).digest("hex");

    return {
      statusCode: 200,
      body: JSON.stringify({ signature: hash }),
    };
  } catch (err) {
    console.error("Error generando la firma:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generando firma" }),
    };
  }
};

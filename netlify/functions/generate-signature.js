const crypto = require("crypto");

exports.handler = async function (event) {
  try {
    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    console.log("Secreto:", secret);

    const { reference, amountInCents, currency, expirationTime } = JSON.parse(event.body);
    console.log("Datos recibidos:", { reference, amountInCents, currency, expirationTime });

    const stringToSign = `${reference}${amountInCents}${currency}${expirationTime}${secret}`;
    console.log("Cadena a firmar:", stringToSign);

    const signature = crypto.createHash("sha256").update(stringToSign).digest("hex");

    return {
      statusCode: 200,
      body: JSON.stringify({ signature }),
    };
  } catch (error) {
    console.error("Error en la función:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "INTERNAL_SERVER_ERROR", details: error.message }),
    };
  }
};

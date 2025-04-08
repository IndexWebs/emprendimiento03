const crypto = require('crypto');

const generateSignature = (reference, amountInCents, currency, expirationTime) => {
  const secret = process.env.WOMPI_INTEGRITY_SECRET;
  const payload = `${amountInCents}${currency}${reference}${expirationTime}`;
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
};

exports.handler = async (event) => {
  try {
    const { reference, amountInCents, currency, expirationTime } = JSON.parse(event.body);

    if (!reference || !amountInCents || !currency || !expirationTime) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const signature = generateSignature(reference, amountInCents, currency, expirationTime);
    return {
      statusCode: 200,
      body: JSON.stringify({ signature })
    };
  } catch (error) {
    console.error("ERROR en generate-signature:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'INTERNAL_SERVER_ERROR', details: error.message })
    };
  }
};

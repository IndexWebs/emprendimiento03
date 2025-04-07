exports.handler = async (event) => {
    try {
      const { reference, amountInCents, currency } = JSON.parse(event.body);
  
      if (!reference || !amountInCents || !currency) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing required fields' })
        };
      }
  
      const signature = generateSignature(reference, amountInCents, currency);
      return {
        statusCode: 200,
        body: JSON.stringify({ signature })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'INTERNAL_SERVER_ERROR', details: error.message })
      };
    }
  };
  
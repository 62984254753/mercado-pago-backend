export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://62984254753.github.io");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
if (req.method === "OPTIONS") {
  return res.status(200).end();
}
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nome, email, whatsapp, perfil } = req.body;
  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer APP_USR-3923066422704879-032313-9d0c187a4d4219f82bf7250408db5471-3281487449"
      },
      body: JSON.stringify({
        items: [
          {
            title: "Imersão Advogado de Sucesso",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 97
          }
        ],
        payer: {
          email: email
        },
       external_reference: `${nome}|${email}|${whatsapp}|${perfil}`,
        notification_url: "https://hook.eu1.make.com/jpxz28gwlijsxmrkybfmmhiw7u1liek9",
        back_urls: {
          success: "https://62984254753.github.io/site-advogado/obrigado.html",
          pending: "https://62984254753.github.io/site-advogado/confirmacao.html",
          failure: "https://62984254753.github.io/site-advogado/confirmacao.html"
        },
        auto_return: "approved"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
}

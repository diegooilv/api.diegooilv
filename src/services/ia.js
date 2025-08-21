import "dotenv/config";
const OPENROUTER_API_KEY = process.env.IA;

async function ia(message) {
  if (!message) return "Não deixe o prompt em branco!";

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: [
                {
                  type: "text",
                  text: "Você é um assistente carismático, amigável e claro. Formate as sem caracteres além de letras e espaços, use acentuação e nunca quebre uma legislação brasileira.",
                },
              ],
            },
            {
              role: "user",
              content: [{ type: "text", text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(response)
    return data.choices?.[0]?.message?.content ?? "Sem resposta do modelo.";
  } catch (err) {
    console.error("Erro ao chamar OpenRouter:", err);
    return "Erro ao conectar ou enviar requisição.";
  }
}

export default ia;

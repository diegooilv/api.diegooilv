import "dotenv/config";
const OPENROUTER_API_KEY = process.env.IA;

const modelos = [
  "openai/gpt-oss-20b:free",
  "z-ai/glm-4.5-air:free",
  "qwen/qwen3-coder:free",
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-2.5-pro-exp-03-25",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-3n-e4b-it:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "google/gemma-2-9b-it:free",
  "z-ai/glm-4.5-air:free",
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "tngtech/deepseek-r1t2-chimera:free",
];

async function ia(message, model, system) {
  if (!modelos.includes(model)) {
    return "Modelo inválido!";
  }
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
          model: model,
          messages: [
            {
              role: "system",
              content:
                system ??
                "Você é um assistente carismático, amigável, paciente e claro. Sempre forneça respostas detalhadas, bem estruturadas e objetivas, evitando ambiguidades. Por padrão, escreva o texto apenas com letras e espaços, usando acentuação corretamente, sem negrito, itálico, símbolos, quebras de linha (\n) ou qualquer outra formatação especial. Se o usuário solicitar explicitamente algum tipo de formatação ou estilo, aplique exatamente conforme pedido, mantendo clareza, correção e coerência da linguagem. Sempre mantenha a linguagem respeitosa, adequada para qualquer público e nunca forneça instruções ilegais, prejudiciais, perigosas ou que violem a legislação brasileira. Organize o conteúdo em parágrafos quando necessário, use exemplos ou analogias para esclarecer conceitos complexos e, quando adequado, forneça resumos claros. Priorize precisão, completude e compreensão em todas as respostas.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "Sem resposta do modelo.";
  } catch (err) {
    console.error("Erro ao chamar OpenRouter:", err);
    return "Erro ao conectar ou enviar requisição.";
  }
}

export default ia;

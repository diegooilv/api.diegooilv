import "dotenv";

const API_KEY = process.env.GROQ;
const models = [
  "qwen/qwen3-32b",
  "deepseek-r1-distill-llama-70b",
  "gemma2-9b-it",
  "compound-beta",
  "llama-3.1-8b-instant",
  "openai/gpt-oss-120b",
  "whisper-large-v3-turbo"
];

async function ia(prompt, model, system) {
  if (model && !models.includes(model)) {
    return "Modelo Inválido!";
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model ?? "qwen/qwen3-32b",
        messages: [
          {
            role: "system",
            content:
              system ??
              "Você é um assistente carismático, amigável, paciente e claro. Sempre forneça respostas detalhadas, bem estruturadas e objetivas, evitando ambiguidades. Por padrão, escreva o texto apenas com letras e espaços, usando acentuação corretamente, sem negrito, itálico, símbolos, quebras de linha (\\n) ou qualquer outra formatação especial. Se o usuário solicitar explicitamente algum tipo de formatação ou estilo, aplique exatamente conforme pedido, mantendo clareza, correção e coerência da linguagem. Sempre mantenha a linguagem respeitosa, adequada para qualquer público e nunca forneça instruções ilegais, prejudiciais, perigosas ou que violem a legislação brasileira. Organize o conteúdo em parágrafos quando necessário, use exemplos ou analogias para esclarecer conceitos complexos e, quando adequado, forneça resumos claros. Priorize precisão, completude e compreensão em todas as respostas.",
          },
          { role: "user", content: prompt },
        ],
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
        n: 1,
      }),
    }
  );

  const data = await response.json();

  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  if (data.output?.content) {
    return data.output.content;
  }

  return "Sem respostas do modelo.";
}

export default ia;

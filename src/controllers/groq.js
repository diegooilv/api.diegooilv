import ia from "../services/iaGroq.js";

export const iaGroqController = async (req, res, nest) => {
  const response = await ia(
    req.body.prompt,
    req.body.model ?? null,
    req.body.system ?? null
  );

  return res.status(200).json({ output: response });
};

export const modelsGroqController = async (req, res, next) => {
  const json = {
    models: [
      {
        id: "qwen/qwen3-32b",
        developer: "Alibaba Cloud",
        context_window: 131072,
        max_completion_tokens: 40960,
        description:
          "Qwen3 é uma série de modelos de linguagem desenvolvidos pela Alibaba Cloud, projetados para melhorar o desempenho, eficiência e capacidades multilíngues. A versão 3.0 introduz um mecanismo de 'thinking mode' para raciocínio complexo e 'non-thinking mode' para respostas rápidas, além de suporte a 119 idiomas e dialetos.",
        documentation: "https://arxiv.org/abs/2505.09388",
      },
      {
        id: "deepseek-r1-distill-llama-70b",
        developer: "DeepSeek / Meta",
        context_window: 131072,
        max_completion_tokens: 131072,
        description:
          "DeepSeek-R1 é um modelo de linguagem que incorpora dados de inicialização antes do aprendizado por reforço, alcançando desempenho comparável ao OpenAI-o1 em tarefas de matemática, código e raciocínio.",
        documentation: "https://huggingface.co/deepseek-ai/DeepSeek-R1",
      },
      {
        id: "gemma2-9b-it",
        developer: "Google",
        context_window: 8192,
        max_completion_tokens: 8192,
        description:
          "Gemma 2 é uma adição à família de modelos Gemma da Google, oferecendo modelos de linguagem abertos e leves, com desempenho competitivo para seu tamanho. A versão 2.0 foi treinada com distilação de conhecimento, melhorando a eficiência.",
        documentation: "https://arxiv.org/abs/2408.00118",
      },
      {
        id: "compound-beta",
        developer: "Groq",
        context_window: 131072,
        max_completion_tokens: 8192,
        description:
          "Compound-Beta é um sistema de IA desenvolvido pela Groq que utiliza ferramentas externas para fornecer respostas mais precisas e atualizadas do que modelos tradicionais de linguagem.",
        documentation: "https://console.groq.com/llms-full.txt",
      },
      {
        id: "llama-3.1-8b-instant",
        developer: "Meta",
        context_window: 131072,
        max_completion_tokens: 131072,
        description:
          "Llama 3.1 é um modelo de linguagem desenvolvido pela Meta, projetado para oferecer desempenho robusto em tarefas de compreensão e geração de linguagem natural.",
        documentation: "https://console.groq.com/docs/models",
      },
      {
        id: "openai/gpt-oss-120b",
        developer: "OpenAI",
        context_window: 131072,
        max_completion_tokens: 65536,
        description:
          "GPT-OSS-120B é um modelo de linguagem de código aberto desenvolvido pela OpenAI, utilizando uma arquitetura de transformador eficiente com mistura de especialistas, otimizado para capacidades de agente e raciocínio.",
        documentation: "https://arxiv.org/abs/2508.10925",
      },
      {
        id: "whisper-large-v3-turbo",
        developer: "OpenAI",
        context_window: 448,
        max_completion_tokens: 448,
        description:
          "Whisper-Large-V3-Turbo é um modelo de transcrição de áudio desenvolvido pela OpenAI, projetado para converter fala em texto com alta precisão e eficiência.",
        documentation: "https://console.groq.com/docs/models",
      },
    ],
  };

  return res.status(200).json(json);
};

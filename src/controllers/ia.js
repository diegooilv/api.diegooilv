import ia from "../services/ia.js";

export const iaController = async (req, res, next) => {
  const response = await ia(
    req.body.prompt,
    req.body.model,
    req.body.system ?? null
  );
  return res.status(200).json({ res: response });
};

export const modelsController = async (req, res, next) => {
  const json = {
    "openai/gpt-oss-20b:free": {
      nome: "GPT-OSS-20B",
      desenvolvedor: "OpenAI",
      arquitetura: "Mixture-of-Experts (MoE)",
      parâmetros: {
        total: "21B",
        ativos_por_passagem: "3.6B",
      },
      contexto_maximo: "131.072 tokens",
      requisitos_hardware: "16 GB de VRAM",
      licença: "Apache 2.0",
      características: [
        "Raciocínio em cadeia (Chain-of-Thought)",
        "Execução local em dispositivos de baixo custo",
        "Suporte a funções, chamadas de ferramentas e saídas estruturadas",
      ],
    },
    "z-ai/glm-4.5-air:free": {
      nome: "GLM-4.5-Air",
      desenvolvedor: "Z.ai",
      arquitetura: "Mixture-of-Experts (MoE)",
      parâmetros: {
        total: "106B",
        ativos_por_passagem: "12B",
      },
      contexto_maximo: "128K tokens",
      características: [
        "Modo de raciocínio controlável",
        "Modo de interação em tempo real",
        "Otimizado para aplicações centradas em agentes",
      ],
    },
    "qwen/qwen3-coder:free": {
      nome: "Qwen3 Coder",
      desenvolvedor: "QwenLM",
      arquitetura: "Mixture-of-Experts (MoE)",
      parâmetros: {
        total: "480B",
        ativos_por_passagem: "35B",
      },
      contexto_maximo: "262.144 tokens",
      características: [
        "Especializado em código e tarefas de agente",
        "Suporte a código, instruções complexas e chamadas de funções",
        "Versão mais poderosa: Qwen3-Coder-480B-A3B-Instruct",
      ],
    },
    "google/gemini-2.0-flash-exp:free": {
      nome: "Gemini 2.0 Flash Experimental",
      desenvolvedor: "Google DeepMind",
      características: [
        "Baixa latência",
        "Suporte a entradas multimodais (texto, código, imagens, vídeo, áudio)",
        "Capacidade de seguir instruções complexas e chamadas de funções",
      ],
    },
    "google/gemini-2.5-pro-exp-03-25": {
      nome: "Gemini 2.5 Pro Experimental",
      desenvolvedor: "Google DeepMind",
      características: [
        "Desempenho superior em tarefas complexas",
        "Lidera benchmarks de código, matemática e ciência",
        "Suporte a entradas multimodais e saídas de texto",
      ],
    },
    "meta-llama/llama-3.2-3b-instruct:free": {
      nome: "Llama 3.2 3B Instruct",
      desenvolvedor: "Meta",
      parâmetros: {
        total: "3B",
      },
      contexto_maximo: "128K tokens",
      características: [
        "Otimizado para tarefas de processamento de linguagem natural",
        "Suporte a várias línguas, incluindo inglês, espanhol e hindi",
      ],
    },
    "google/gemma-3n-e4b-it:free": {
      nome: "Gemma 3n E4B IT",
      desenvolvedor: "Google",
      características: [
        "Otimizado para execução em dispositivos de baixo recurso",
        "Entrada multimodal (texto, imagem, vídeo, áudio)",
        "Pesos abertos para variantes pré-treinadas e ajustadas por instruções",
      ],
    },
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free": {
      nome: "Dolphin Mistral 24B Venice Edition",
      desenvolvedor: "dphn.ai em colaboração com Venice.ai",
      características: [
        "Modelo 'sem censura' ajustado por instruções",
        "Controle do usuário sobre alinhamento, prompts do sistema e comportamento",
        "Destinado a casos de uso avançados e irrestritos",
      ],
    },
    "google/gemma-2-9b-it:free": {
      nome: "Gemma 2.9B IT",
      desenvolvedor: "Google",
      características: [
        "Modelo multimodal",
        "Suporte a entradas de texto e imagem",
        "Otimizado para tarefas de tradução e análise de imagens",
      ],
    },
    "deepseek/deepseek-r1-0528-qwen3-8b:free": {
      nome: "DeepSeek R1-0528 Qwen3 8B",
      desenvolvedor: "DeepSeek",
      arquitetura: "Mixture-of-Experts (MoE)",
      parâmetros: {
        total: "8B",
        ativos_por_passagem: "1B",
      },
      contexto_maximo: "64K tokens",
      características: [
        "Otimizado para tarefas de diálogo e raciocínio",
        "Suporte a instruções complexas e chamadas de funções",
      ],
    },
    "tngtech/deepseek-r1t2-chimera:free": {
      nome: "DeepSeek R1T2 Chimera",
      desenvolvedor: "TNGTech",
      arquitetura: "Mixture-of-Experts (MoE)",
      parâmetros: {
        total: "12B",
        ativos_por_passagem: "2B",
      },
      contexto_maximo: "128K tokens",
      características: [
        "Modelo híbrido para tarefas de diálogo e análise de dados",
        "Suporte a entradas multimodais e chamadas de funções",
      ],
    },
  };

  res.status(200).json(json);
};

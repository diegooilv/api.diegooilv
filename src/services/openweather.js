import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.APICLIMA;

// formata timestamp UNIX (segundos) para string pt-BR
function formatarData(ts) {
  return new Date(ts * 1000).toLocaleString("pt-BR", { hour12: false });
}

export async function getClima(cidade) {
  if (!cidade) {
    return null;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const res = await axios.get(url);
    const d = res.data;

    const jsonTraduzido = {
      cidade: d.name,
      temperatura: d.main.temp,
      descrição: d.weather[0].description,
      coordenadas: {
        lon: d.coord.lon,
        lat: d.coord.lat,
      },
      base: d.base,
      principal: {
        temperatura: d.main.temp,
        sensacao_termica: d.main.feels_like,
        temperatura_minima: d.main.temp_min,
        temperatura_maxima: d.main.temp_max,
        pressao: d.main.pressure,
        umidade: d.main.humidity,
        nivel_do_mar: d.main.sea_level,
        nivel_do_solo: d.main.grnd_level,
      },
      visibilidade: d.visibility,
      vento: {
        velocidade: d.wind.speed,
        direcao: d.wind.deg,
        rajada: d.wind.gust,
      },
      nuvens: {
        cobertura: d.clouds.all,
      },
      data_consulta: formatarData(d.dt),
      sistema: {
        tipo: d.sys.type,
        id: d.sys.id,
        pais: d.sys.country,
        nascer_do_sol: formatarData(d.sys.sunrise),
        por_do_sol: formatarData(d.sys.sunset),
      },
      fuso_horario: d.timezone,
      id: d.id,
      codigo: d.cod,
    };

    return jsonTraduzido;
  } catch (err) {
    console.error("Erro ao buscar clima:", err.response?.data || err.message);
  }
}

export async function getPrevisao(cidade) {
  if (!cidade) {
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const res = await axios.get(url);
    const d = res.data;

    const previsoes = d.list.map((item) => ({
      data_hora: item.dt_txt,
      temperatura: item.main.temp,
      sensacao_termica: item.main.feels_like,
      minima: item.main.temp_min,
      maxima: item.main.temp_max,
      pressao: item.main.pressure,
      umidade: item.main.humidity,
      clima: item.weather[0].description,
      nuvens: item.clouds.all,
      vento: {
        velocidade: item.wind.speed,
        direcao: item.wind.deg,
        rajada: item.wind.gust,
      },
      visibilidade: item.visibility,
    }));

    return {
      cidade: d.city.name,
      pais: d.city.country,
      coordenadas: d.city.coord,
      fuso_horario: d.city.timezone,
      nascer_do_sol: formatarData(d.city.sunrise),
      por_do_sol: formatarData(d.city.sunset),
      previsoes: previsoes,
    };
  } catch (err) {
    console.error(
      "Erro ao buscar previsão:",
      err.response?.data || err.message
    );
  }
}

export async function getPrevisao12h(cidade) {
  if (!cidade) {
    return null;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const res = await axios.get(url);
    const d = res.data;

    // Filtra previsões para as 12:00 de cada dia
    const previsoes12h = d.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    const previsoesFormatadas = previsoes12h.map((item) => ({
      data: item.dt_txt.split(" ")[0],
      temperatura: item.main.temp,
      sensacao_termica: item.main.feels_like,
      minima: item.main.temp_min,
      maxima: item.main.temp_max,
      pressao: item.main.pressure,
      umidade: item.main.humidity,
      clima: item.weather[0].description,
      nuvens: item.clouds.all,
      vento: {
        velocidade: item.wind.speed,
        direcao: item.wind.deg,
        rajada: item.wind.gust,
      },
      visibilidade: item.visibility,
    }));

    return {
      cidade: d.city.name,
      pais: d.city.country,
      coordenadas: d.city.coord,
      fuso_horario: d.city.timezone,
      nascer_do_sol: formatarData(d.city.sunrise),
      por_do_sol: formatarData(d.city.sunset),
      previsoes: previsoesFormatadas,
    };
  } catch (err) {
    console.error(
      "Erro ao buscar previsão:",
      err.response?.data || err.message
    );
  }
}

export async function getLatLon(cidade) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${API_KEY}`;
  try {
    const res = await axios.get(url);
    const dados = res.data[0];

    return {
      cidade: dados.name,
      estado: dados.state,
      pais: dados.country,
      lat: dados.lat,
      lon: dados.lon,
    };
  } catch (err) {
    console.error(err);
  }
}

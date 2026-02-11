
import { GoogleGenAI } from "@google/genai";
import { Ocorrencia, Viatura } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAiInsights(ocorrencias: Ocorrencia[], viaturas: Viatura[]) {
  try {
    const prompt = `
      Analise os seguintes dados operacionais do Corpo de Bombeiros de Guaxupé e forneça um resumo executivo de 3 frases com insights de eficiência ou alertas.
      
      Ocorrências Recentes: ${JSON.stringify(ocorrencias.map(o => ({ n: o.natureza, s: o.siadStatus })))}
      Viaturas: ${JSON.stringify(viaturas.map(v => ({ p: v.prefixo, s: v.status, c: v.combustivel })))}
      
      Responda em Português de forma profissional e direta.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao obter insights do Gemini:", error);
    return "Não foi possível gerar insights automáticos no momento. Verifique a conexão.";
  }
}

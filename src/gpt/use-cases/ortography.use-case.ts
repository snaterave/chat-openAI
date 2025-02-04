import OpenAI from 'openai';

interface Options {
  prompt: string;
}
export const ortographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 150,
    messages: [
      {
        role: 'system',
        content: `
          Te será proveídos textos en español con posibles errores ortográficos y gramaticales,
          Las palabras deben existir en el diccionario de la real academia española,
          Debes responder en formato JSON,
          tu tarea es corregirlos y retornar información con soluciones,
          tambien debes dar un porcentaje de acierto por el usuario,

          Si no hay errores, deber retornar un mensaje de felicitaciones

          ejemplo de salida:
          {
            userScore: number,
            errors: string[], // ['error -> solución]
            message: string // Usa emojis y texto para feliitar al usuario
          }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    store: true,
  });

  // console.log('completion = ', completion);
  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;

  // return {
  //   prompt: prompt,
  //   apikey: process.env.OPENIA_API_KEY,
  // };
};

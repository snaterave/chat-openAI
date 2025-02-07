import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';
import { Buffer } from 'buffer';
import { Options } from '@nestjs/common';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, audioFile } = options;
  
  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt,
    language: 'es',
    // response_format: 'vtt',
    response_format: 'verbose_json',
  });


  return response;

  // const voices = {
  //   nova: 'nova',
  //   alloy: 'alloy',
  //   echo: 'echo',
  //   fable: 'fable',
  //   onyx: 'onyx',
  //   shimmer: 'shimmer',
  // };

  // // tipo de voz a utilizar
  // const selectedVoice = voices[voice] ?? 'nova';

  // const folderPath = path.resolve(__dirname, '../../../generated/audios');
  // const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  // fs.mkdirSync(folderPath, { recursive: true });

  // const mp3 = await openai.audio.speech.create({
  //   model: 'tts-1',
  //   voice: selectedVoice,
  //   input: prompt,
  //   response_format: 'mp3',
  // });

  // const buffer = Buffer.from(await mp3.arrayBuffer());
  // fs.writeFileSync(speechFile, buffer);

  // return speechFile;
};

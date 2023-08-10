import {HfInference} from '@huggingface/inference';
import 'dotenv/config';

class Helper {
  static instance: Helper;
  private model: any;
  private inference: any;

  constructor(huggingFaceToken?: string) {
    this.inference = new HfInference(huggingFaceToken);
  }

  static getInstance(huggingFaceToken: string): Helper {
    if (!this.instance) {
      this.instance = new Helper(huggingFaceToken);
    }
    return this.instance;
  }

  async summarizeMessage(message: string): Promise<string> {
    const summary = await this.generateSummary(message);

    return await summary.summary_text; // Return the summary_text from the output
  }

  async generateSummary(inputText: string): Promise<any> {
    //const output = await this.model(inputText);
    if (inputText === '') {
      return;
    }
    const output = await this.inference.summarization({
      inputs: inputText,
      parameters: {
        max_length: 100,
        min_length: 1,
        early_stopping: true,
      },
    });

    return output;
  }
}
export {Helper};

import {HfInference} from '@huggingface/inference';

class Helper {
  static instance: Helper;
  private inference: any;

  constructor(huggingFaceToken?: string) {
    try {
      this.inference = new HfInference(huggingFaceToken);
    } catch (e) {
      console.trace('Failed to login into HuggingFace');
    }
    //this.inference = new HfInference(huggingFaceToken);
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

    try {
      return await this.inference.summarization({
        inputs: inputText,
        parameters: {
          max_length: 100,
          min_length: 1,
          early_stopping: true,
        },
      });
    } catch (e) {
      return new Promise((resolve, reject) => {
        resolve({
          summary_text: 'HuggingFace API is not available at the moment.',
        });
        reject(e);
      });
    }
  }

  async suggestSolution(message: string): Promise<string> {
    const suggestion = await this.generateSolution(message);

    return await suggestion.suggestions[0].value; // Return the summary_text from the output
  }

  async generateSolution(message: string): Promise<any> {
    //const output = await this.model(inputText);
    if (message === '') {
      return;
    }

    try {
      return await this.inference.fillMask({
        inputs: message,
        parameters: {
          top_k: 1,
        },
      });
    } catch (e) {
      return new Promise((resolve, reject) => {
        resolve({
          suggestions: [
            {
              value: 'HuggingFace API is not available at the moment.',
            },
          ],
        });
        reject(e);
      });
    }
  }
}
export {Helper};

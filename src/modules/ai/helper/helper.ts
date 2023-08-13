import {HfInference} from '@huggingface/inference';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-layers';

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

/**
 * @deprecated
 */
class HelperBeta {
  static instance: Helper;
  private model: Promise<tf.LayersModel>;
  wordEmbeddings: {
    Uncaught: number[]; // Embedding vector for 'Uncaught'
    'ReferenceError:': number[]; // Embedding vector for 'ReferenceError:'
    ms: number[];
  };

  constructor() {
    this.wordEmbeddings = {
      Uncaught: [0.1, 0.2, 0.3], // Embedding vector for 'Uncaught'
      'ReferenceError:': [0.4, 0.5, 0.6], // Embedding vector for 'ReferenceError:'
      ms: [0.7, 0.8, 0.9], // Embedding vector for 'ms'
    };
    try {
      this.model = this.loadModel();
    } catch (e) {
      console.trace('Failed to load the model.');
    }
    //this.inference = new HfInference(huggingFaceToken);
  }

  private async loadModel() {
    /*const model = await tf.loadLayersModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json'
    );*/
    const curLoc =
      typeof module !== 'undefined' && module.exports ? __dirname : '';
    const model = await tf.loadLayersModel(
      'file://' + curLoc + '../models/bart-large-cnn/tfjs_model/model.json'
    );
    return model;
  }

  static getInstance(huggingFaceToken: string): Helper {
    if (!this.instance) {
      this.instance = new Helper(huggingFaceToken);
    }
    return this.instance;
  }

  async summarizeMessage(message: string): Promise<string> {
    const summary = await this.generateSummary(message);
    console.log(summary);
    return await summary; // Return the summary_text from the output
  }

  async generateSummary(inputText: string): Promise<any> {
    if (inputText === '') {
      return;
    }

    const processedInput = await this.preprocessInput(inputText);
    const predictTensor = (await this.model).predict(
      tf.expandDims(processedInput, 0) // Add an additional dimension for batch size
    ) as tf.Tensor;
    const output = await this.postProcessPrediction(predictTensor);
    return output;
  }

  async preprocessInput(inputText) {
    // Tokenize and preprocess the input text
    // You might need to adjust this based on the specifics of your model
    const tokens = inputText.split(' '); // Split text into tokens
    // Convert tokens to token embeddings (embeddings can be obtained using word embeddings models)
    const embeddings = await this.getEmbeddingsForTokens(tokens);
    const inputTensor = tf.tensor(embeddings); // Convert embeddings to tensor
    return inputTensor;
  }

  async postProcessPrediction(predictionTensor) {
    // Convert the prediction tensor to human-readable output
    // You might need to adjust this based on your model's output format
    const prediction = await predictionTensor.array();
    const outputText = prediction[0].join(' '); // Convert tokens to text
    return outputText;
  }

  async getEmbeddingsForTokens(tokens) {
    const embeddings = [];

    for (const token of tokens) {
      const embedding = this.wordEmbeddings[token] || [0, 0, 0];
      embeddings.push(embedding);
    }

    return embeddings;
  }
}
export {Helper};

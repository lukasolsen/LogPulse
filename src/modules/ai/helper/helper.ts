import {WordTokenizer} from 'natural';

class Helper {
  private wordTokenizer: WordTokenizer;

  constructor() {
    this.wordTokenizer = new WordTokenizer();
  }

  public summarizeMessage(message: string, maxTokens = 5): string {
    const tokens = this.wordTokenizer.tokenize(message);
    const summary = tokens.slice(0, maxTokens).join(' ');
    return summary;
  }
}

export {Helper};

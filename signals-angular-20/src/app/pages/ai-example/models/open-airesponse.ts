export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    }
  }>;
}

// Tipos
export type Role = 'USER' | 'ASSISTANT';

export interface Chat {
  id: number;
  role: Role;
  text: string;
  timestamp: string;
}

export interface AssistantResponse {
  response: string;
  examples: string[];
  codeSnippets: CodeSnippet[];
}

export interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
}

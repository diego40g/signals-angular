import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { OpenAIResponse } from '../models/open-airesponse';

@Injectable({
  providedIn: 'root'
})
export class GenAIService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = 'your-api-key-here'; // En producción usar environment variables

  // Signals para estado reactivo
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string): Observable<string> {
    this.isLoading.set(true);
    this.error.set(null);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente especializado en Angular y desarrollo web. Responde de forma concisa y práctica.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    return this.http.post<OpenAIResponse>(this.apiUrl, body, { headers })
      .pipe(
        map(response => response.choices[0]?.message?.content || 'No se pudo generar respuesta'),
        catchError((error: any) => {
          console.error('Error en la API de OpenAI:', error);
          this.error.set('Error al conectar con la API de OpenAI');
          return of('Error: No se pudo generar la respuesta');
        }),
        finalize(() => this.isLoading.set(false))
      );
  }

  // Método alternativo usando Gemini API (Google)
  generateWithGemini(prompt: string): Observable<any> {
    // Implementación para Google Gemini
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    return this.http.post(geminiUrl, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    });
  }
}

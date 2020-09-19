import fetch, { Headers } from 'node-fetch';

export class Fetch {
  private baseUrl: string;
  private headers: Headers;

  constructor(baseUrl: string, bearerToken: string) {
    this.baseUrl = baseUrl;
    this.headers = new Headers({
      Authorization: `Bearer ${bearerToken}`,
    });
  }

  async get(path: string) {
    const options = {
      method: 'GET',
      headers: this.headers,
    };
    const url = `${this.baseUrl}/${path}`;
    return await fetch(url, options);
  }

  async post<T>(path: string, payload?: T) {
    const headers = new Headers(this.headers);
    headers.set('Content-Type', 'application/json');
    const options = {
      method: 'POST',
      body: JSON.stringify({
        data: payload,
      }),
      headers,
    };
    const url = `${this.baseUrl}/${path}`;
    return await fetch(url, options);
  }

  async delete<T>(path: string, payload?: T) {
    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        data: payload,
      }),
      headers: this.headers,
    };
    const url = `${this.baseUrl}/${path}`;
    return await fetch(url, options);
  }
}

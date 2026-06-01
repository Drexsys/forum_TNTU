const API_BASE_URL = 'http://localhost:8000';

export interface User {
  id: number;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
}

// User endpoints
export const userApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/users?username=${username}&password=${password}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(await response.text());
    return response;
  },

  register: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response;
  },

  getCount: async () => {
    const response = await fetch(`${API_BASE_URL}/users/count`);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// Posts endpoints
export const postsApi = {
  list: async (page = 0, pageSize = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/posts?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  create: async (userId: number, title: string, text: string) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, title, text }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

// Comments endpoints
export const commentsApi = {
  list: async (parentId?: number, parentCommentId?: number) => {
    const params = new URLSearchParams();
    if (parentId) params.append('parentId', parentId.toString());
    if (parentCommentId) params.append('parentCommentId', parentCommentId.toString());
    
    const response = await fetch(
      `${API_BASE_URL}/comments?${params.toString()}`
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  create: async (userId: number, text: string, parent?: number, parentComment?: number) => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        text,
        ...(parent && { parent }),
        ...(parentComment && { parent_comment: parentComment }),
      }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};

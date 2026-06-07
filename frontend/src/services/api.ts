const API_BASE_URL = '/api';

export interface User {
  id: number;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  author: User;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: User;
}

// User endpoints
export const userApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  register: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/posts?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    // Spring Data pageable responses include a `content` array
    if (data && typeof data === 'object' && Array.isArray(data.content)) return data.content;
    return data;
  },

  create: async (userId: number, title: string, text: string) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, title, text }),
    });
    if (!response.ok) throw new Error(await response.text());
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) return response.json();
    return response.text();
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
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) return response.json();
    return response.text();
  },
};

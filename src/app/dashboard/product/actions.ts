'use server';

import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { redirect } from 'next/navigation';

export async function registerProduct(formData: FormData) {
  const categoryId = formData.get('category');
  const name = formData.get('name');
  const price = formData.get('price');
  const description = formData.get('description');
  const image = formData.get('image') as File | null;

  if (!categoryId || !name || !price || !description || !image) {
    return;
  }

  const data = new FormData();
  data.append('name', String(name));
  // Mantém price como string (backend espera string); normaliza apenas espaços
  const priceStr = String(price).trim();
  data.append('price', priceStr);
  data.append('description', String(description));
  data.append('category_id', String(categoryId));


  // Backend espera campo 'file' para o upload
  data.append('file', image);

  const token = await getCookieServer();

  try {
    const res = await api.post('/products', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Cadastro de produto OK:', res.status);
  } catch (err: any) {
    const status = err?.response?.status;
    const respData = err?.response?.data;
    console.error('Erro ao cadastrar produto:', status, respData);
    throw err;
  }

  redirect('/dashboard');
}

import styles from './page.module.scss';
import logoImg from '../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import {cookies} from 'next/headers';

export default function Page() {

  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return;
    }

    try {
      const response =  await api.post('/session', {
        email,
        password
      });

      // console.log('Login successful:', response.data);

      if (!response.data.token) {
        return;
      }

      // Set cookie
      const expressTime = 60 * 60 * 24 * 30 * 1000; // 30 days
      const cookieStore = await cookies();
      cookieStore.set('session', response.data.token, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expressTime,
      });

    } catch (error) {
      console.error('Error during login:', error);
      return;
    }


    redirect('/dashboard');
  }

  return (
    <>
      <div className={styles.containerCenter}>

        <Image src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              name="email"
              required
              placeholder="Digite seu e-mail"
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="******"
              required
              className={styles.input}
            />

            <button type="submit">
              Acessar
            </button>

          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </section>

      </div>
    </>
  );
}

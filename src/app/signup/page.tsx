import styles from '../page.module.scss';
import logoImg from '../../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';

export default function Signup() {

  async function handleRegister(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return;
    }

    try {
      await api.post('/users', {
        name,
        email,
        password
      });

    } catch (error) {
      console.error('Error during registration:', error);
    }

    redirect('/');
    
  }

    return (
        <>
            <div className={styles.containerCenter}>

                <Image src={logoImg} alt="Logo" />

                <section className={styles.login}>
                    <h1>Criando uma conta</h1>

                    <form action={handleRegister}>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Digite seu nome"
                            className={styles.input}
                        />

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
                            Cadastrar
                        </button>

                    </form>

                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Acesse
                    </Link>

                </section>

            </div>
        </>
    );
}
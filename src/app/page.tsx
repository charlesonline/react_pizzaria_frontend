import styles from './page.module.scss';
import logoImg from '../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className={styles.containerCenter}>

        <Image src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <form>
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

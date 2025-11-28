import styles from '../page.module.scss';
import logoImg from '../../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
    return (
        <>
            <div className={styles.containerCenter}>

                <Image src={logoImg} alt="Logo" />

                <section className={styles.login}>
                    <h1>Criando uma conta</h1>

                    <form>
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
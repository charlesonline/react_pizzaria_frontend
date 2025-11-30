import style from './styles.module.scss';
import { Button } from '@/app/dashboard/components/button';
import { api } from '@/services/api';
import { getCookieServer} from '@/lib/cookieServer';
import { redirect } from 'next/navigation';

export default function Category() {

    async function handleRegisterCategory(formData: FormData){
        'use server';

        const name = formData.get('name')?.toString().trim();

        if(!name) return;

        const data = {
            name: name
        }

        const token = await getCookieServer();

        await api.post('/categories', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error)=>{
            console.error('Erro ao cadastrar categoria: ', error);
            return;
        });

        redirect('/dashboard');
    }

    return(
        <main className={style.container}>
            <h1>Nova Categoria</h1>

            <form
                className={style.form}
                action={handleRegisterCategory}
            >
                <input
                    type="text"
                    placeholder="Nome da categoria. Ex: Pizzas"
                    className={style.input}
                    name='name'
                    required
                />

                <Button name="Cadastrar" />

            </form>
        </main>
    );
}
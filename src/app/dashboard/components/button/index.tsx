"use client";
import style from './styles.module.scss';
import { useFormStatus } from 'react-dom';

interface Props{
    name?: string;
}

export function Button({name}: Props){
    const { pending } = useFormStatus();//somente em form com action e a partir do react 18.2

    return (
        <button type="submit" className={style.button} disabled={pending}>
            {pending ? 'Aguarde...' : name}
        </button>
    )
}
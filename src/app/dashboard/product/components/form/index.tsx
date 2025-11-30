'use client';

import { ChangeEvent, useState } from 'react';
import style from './styles.module.scss';
import { Button } from '@/app/dashboard/components/button';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { registerProduct } from '@/app/dashboard/product/actions';
import { toast } from 'sonner';

interface caregoryProps{
    id: string;
    name: string;
}

interface formProps{
    categories: caregoryProps[];
}

export function Form({ categories }: formProps){
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleFile(event: ChangeEvent<HTMLInputElement>){

        if(event.target.files && event.target.files?.[0]){
            const file = event.target.files?.[0];

            if (file.type != 'image/png' && file.type != 'image/jpeg'){
                toast.error('Envie uma imagem do tipo PNG ou JPEG');
                return;
            }

            setImage(file);
            setPreviewImage(URL.createObjectURL(file));

        }

    }

    return (
        <main className={style.container}>
            <h1>Novo Produto</h1>

            <form
                className={style.form}
                action={registerProduct}
            >

                <label className={style.labelImage}>
                    <span>
                        <UploadCloud size={40} color='#fff'/>
                    </span>
                    <input
                        type="file"
                        accept='image/png, image/jpeg'
                        name='image'
                        required
                        onChange={handleFile}
                    />

                    { previewImage && (
                        <Image
                            src={previewImage}
                            alt='Imagem do produto'
                            className={style.previewImage}
                            fill={true}
                            quality={75}
                            priority={true}
                        />
                    ) }
                </label>

                <select name='category'>
                    { categories.map( (category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    )) }
                </select>

                <input
                    type="text"
                    placeholder="Nome do produto. Ex: Pizza Calabresa"
                    className={style.input}
                    name='name'
                    required
                />

                <input
                    type="text"
                    placeholder="Preço do produto. Ex: 29.90"
                    className={style.input}
                    name='price'
                    required
                />

                <textarea
                    placeholder="Descrição do produto. Ex: Pizza de calabresa com borda recheada"
                    className={style.input}
                    name='description'
                    required
                >

                </textarea>

                <Button name="Cadastrar" />

            </form>
        </main>
    );
}
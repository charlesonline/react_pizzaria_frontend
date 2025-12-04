"use client"

import { createContext, ReactNode, useState } from "react";
import {api} from "@/services/api";
import {getCookieClient} from "@/lib/cookieClient";
import { toast } from "sonner";
import {useRouter} from 'next/navigation';

interface OrderItemProps{
    id: string;
    orderId: string;
    productId: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        categoryId: string;
        createdAt: string;
        updatedAt: string;
    };
    order: {
        id: string;
        table: string;
        status: boolean;
        draft: boolean;
        name: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

type OrderContextData = {
    isOpen: boolean;
    onRequestClose: () => void;
    onRequestOpen: (orderId: string) => Promise<void>;
    order: OrderItemProps[];
    finishOrder: (orderId: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);
    const router = useRouter();

    async function onRequestOpen(orderId: string) {

        const token = await getCookieClient();

        const response = await api.get('order/details',{
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { orderId:orderId }
        });

        setOrder(response.data);
        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    async function finishOrder(orderId: string) {
        const token = await getCookieClient();

        const data = {
            orderId: orderId
        }

        try {
            await api.put('/order/finish', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            toast.error("Erro ao finalizar o pedido");
            // console.log("Erro ao finalizar o pedido", error);
        }

        toast.success("Pedido finalizado com sucesso!");
        router.refresh();
        setIsOpen(false);
    }

    return (
        <OrderContext.Provider value={{ isOpen, onRequestClose, onRequestOpen, order, finishOrder }}>
            {children}
        </OrderContext.Provider>
    );
}
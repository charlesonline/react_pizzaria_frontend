"use client";
import {use} from "react";
import styles from "./styles.module.scss";
import { RefreshCcw} from "lucide-react"
import { OrderProps } from "@/lib/order.type";
import {Modalorder} from "@/app/dashboard/components/modal"
import { OrderContext } from '@/providers/order';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OrdersProps {
    orders: OrderProps[];
}

export function Orders({ orders }: OrdersProps) {
    const { isOpen, onRequestOpen } = use(OrderContext);
    const router = useRouter();

    async function handleDetailOrder(orderId: string) {
        await onRequestOpen(orderId);
        // alert("Funcionalidade em desenvolvimento!");
    }

    function handleRefreshPage() {
        router.refresh();
        toast.success("Página atualizada!");
    }

    return (
        <>
            <main className={styles.container}>
                
                <section className={styles.containerHeader}>
                    <h1>Pedidos</h1>
                    <button className={styles.buttonRefresh} onClick={handleRefreshPage}>
                        <RefreshCcw size={24} color="#3fffa3" />
                    </button>
                </section>

                <section className={styles.listOrders}>

                    {orders.length === 0 && (
                        <span className={styles.emptyOrders}>Nenhum pedido aberto</span>
                    )}

                    {orders.map(order => (
                        <button
                            key={order.id}
                            className={styles.orderItem}
                            type="button"
                            onClick={() => handleDetailOrder(order.id)}
                        >
                            <div className={styles.tag}></div>
                            <span>Mesa {order.table}</span>
                        </button>
                    ))}

                </section>

            </main>

            {isOpen && <Modalorder/>}
        </>
    )
}
"use client";
import {use} from "react";
import styles from "./styles.module.scss";
import { RefreshCcw} from "lucide-react"
import { OrderProps } from "@/lib/order.type";
import {Modalorder} from "@/app/dashboard/components/modal"
import { OrderContext } from '@/providers/order';

interface OrdersProps {
    orders: OrderProps[];
}

export function Orders({ orders }: OrdersProps) {
    const { isOpen, onRequestOpen } = use(OrderContext);

    function handleDetailOrder() {
        onRequestOpen();
        // alert("Funcionalidade em desenvolvimento!");
    }

    return (
        <>
            <main className={styles.container}>
                
                <section className={styles.containerHeader}>
                    <h1>Pedidos</h1>
                    <button>
                        <RefreshCcw size={24} color="#3fffa3" />
                    </button>
                </section>

                <section className={styles.listOrders}>

                    {orders.map(order => (
                        <button
                            key={order.id}
                            className={styles.orderItem}
                            type="button"
                            onClick={handleDetailOrder}
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
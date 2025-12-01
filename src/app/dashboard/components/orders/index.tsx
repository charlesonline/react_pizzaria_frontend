import styles from "./styles.module.scss";
import { RefreshCcw} from "lucide-react"
import { OrderProps } from "@/lib/order.type";

interface OrdersProps {
    orders: OrderProps[];
}

export function Orders({ orders }: OrdersProps) {
    return (
        <main className={styles.container}>
            
            <section className={styles.containerHeader}>
                <h1>Pedidos</h1>
                <button>
                    <RefreshCcw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.listOrders}>

                {orders.map(order => (
                    <button key={order.id} className={styles.orderItem} type="button">
                        <div className={styles.tag}></div>
                        <span>Mesa {order.table}</span>
                    </button>
                ))}

            </section>

        </main>
    )
}
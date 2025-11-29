import styles from "./styles.module.scss";
import { RefreshCcw} from "lucide-react"

export function Orders() {
    return (
        <main className={styles.container}>
            
            <section className={styles.containerHeader}>
                <h1>Pedidos</h1>
                <button>
                    <RefreshCcw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className={styles.listOrders}>

                <button className={styles.orderItem} type="button">
                    <div className={styles.tag}></div>
                    <span>Mesa 01</span>
                </button>

                <button className={styles.orderItem} type="button">
                    <div className={styles.tag}></div>
                    <span>Mesa 02</span>
                </button>

            </section>

        </main>
    )
}
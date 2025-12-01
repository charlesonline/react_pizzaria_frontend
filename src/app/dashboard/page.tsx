import { Orders } from "./components/orders";
import {api} from "@/services/api";
import {getCookieServer} from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

async function getOrders(): Promise<OrderProps[] | []> {
    try {
        const response = await api.get('/orders',{
            headers:{
                Authorization: `Bearer ${await getCookieServer()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pedidos: ', error);
        return [];
    }
}

export default async function Dashboard() {
    const orders = await getOrders();

    return (
        <>
            <Orders orders={orders} />
        </>
    );
}
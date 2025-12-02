"use client"

import { createContext, ReactNode, useState } from "react";

type OrderContextData = {
    isOpen: boolean;
    onRequestClose: () => void;
    onRequestOpen: () => void;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);

    function onRequestOpen(orderId?: string) {
        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    return (
        <OrderContext.Provider value={{ isOpen, onRequestClose, onRequestOpen }}>
            {children}
        </OrderContext.Provider>
    );
}
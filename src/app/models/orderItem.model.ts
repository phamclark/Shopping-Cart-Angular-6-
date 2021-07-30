import { Cart } from './cart.model';

export interface OrderItem {
    OrderItemId: number;
    OrderId: number;
    ProductId: number;
    Quantity: number;
    ProductName: string;
    Price: number;
    Total: number;
}

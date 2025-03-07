import { createClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];

export interface OrderItem extends OrderItemRow {
  product?: {
    name: string;
    slug: string;
    images: string[];
  };
}

export interface Order extends OrderRow {
  items?: OrderItem[];
  user?: {
    full_name: string;
  };
}

/**
 * Get all orders
 */
export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*, user:user_id(full_name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }

  return data;
}

/**
 * Get an order by ID with all items
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = await createClient();

  // First, get the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*, user:user_id(full_name)")
    .eq("id", id)
    .single();

  if (orderError) {
    if (orderError.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching order:", orderError);
    throw new Error("Failed to fetch order");
  }

  // Then get the order items
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*, product:product_id(name, slug, images)")
    .eq("order_id", id);

  if (itemsError) {
    console.error("Error fetching order items:", itemsError);
    throw new Error("Failed to fetch order items");
  }

  return {
    ...order,
    items: items,
  };
}

/**
 * Get orders for a specific user
 */
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch user orders");
  }

  return data;
}

/**
 * Create a new order
 */
export async function createOrder(
  userId: string,
  orderItems: { productId: string; quantity: number; price: number }[],
  total: number
): Promise<Order> {
  const supabase = await createClient();

  // Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw new Error("Failed to create order");
  }

  // Create the order items
  const orderItemsToInsert = orderItems.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsToInsert);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw new Error("Failed to create order items");
  }

  return order;
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<Order> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }

  return data;
}

import { supabase } from "./supabase"; 
import { ORDER_STATUS } from "../utils/constants";

export const orderApi = {
  
  async getStoreConfig() {
    const { data, error } = await supabase.from("stores").select("*").single();
    if (error) { console.error("Erro store:", error); return null; }
    return data;
  },

  async getOrders(page, limit) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from("orders")
      .select(`
        *,
        client:users!orders_client_id_fkey (name, email, cpf, phone),
        delivery:deliveries!orders_delivery_id_fkey (status, type, tracking_url), 
        payment:payments!orders_payment_id_fkey (status, value, form)
      `, { count: 'exact' })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    
    const normalizedData = data.map(o => ({
        ...o,
        payment: Array.isArray(o.payment) ? o.payment[0] : o.payment,
        delivery: Array.isArray(o.delivery) ? o.delivery[0] : o.delivery
    }));

    return { data: normalizedData, count };
  },

  async getOrderDetails(orderId) {
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
    if (error) throw error;

    const [clientRes, deliveryRes, paymentRes, itemsRes] = await Promise.all([
      supabase.from("users").select("*").eq("uid", order.client_id).single(),
      supabase.from("deliveries").select("*").eq("order_id", orderId).maybeSingle(),
      supabase.from("payments").select("*").eq("order_id", orderId).maybeSingle(),
      supabase.from("order_items").select("*, product:products(*)").eq("order_id", orderId)
    ]);

    return {
      ...order,
      status: order.status || deliveryRes.data?.status, 
      client: clientRes.data || {},
      delivery: deliveryRes.data || {},
      payment: paymentRes.data || {},
      items: itemsRes.data || []
    };
  },
  
  async updateDeliveryStatus(deliveryId, orderId, newStatus) {
    const { error: deliveryError } = await supabase
        .from("deliveries")
        .update({ status: newStatus })
        .eq("id", deliveryId);

    if (deliveryError) throw deliveryError;

    const { error: orderError } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_at: new Date() })
        .eq("id", orderId);

    if (orderError) throw orderError;

    return true;
  },
  
  async saveTrackingUrl(deliveryId, url) {
    const { data, error } = await supabase
        .from("deliveries")
        .update({ tracking_url: url })
        .eq("id", deliveryId)
        .select();

    if (error) throw error;
    return data;
  },
  
  async cancelOrder(orderId, deliveryId) {
    const CANCELED_STATUS = ORDER_STATUS.CANCELED_PT;

    if (deliveryId) {
        await supabase.from("deliveries").update({ status: CANCELED_STATUS }).eq("id", deliveryId);
    }
    const { error } = await supabase.from("orders").update({ status: CANCELED_STATUS, is_canceled: true }).eq("id", orderId);
    if (error) throw error;
    return true;
  }
};
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(searchName = "", page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      );

    if (searchName) {
      query = query.ilike("name", `%${searchName}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getTotalCount(searchName = "") {
    let query = supabase
      .from("medications")
      .select("id", { count: "exact", head: true });

    if (searchName) {
      query = query.ilike("name", `%${searchName}%`);
    }

    const { count, error } = await query;
    if (error) throw error;
    return count;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    // Validasi stok dan harga
    if (payload.quantity < 0) {
      throw new Error("Quantity tidak boleh kurang dari 0");
    }
    if (payload.price < 0) {
      throw new Error("Price tidak boleh kurang dari 0");
    }

    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    // Validasi stok dan harga jika ada dalam payload
    if (payload.quantity !== undefined && payload.quantity < 0) {
      throw new Error("Quantity tidak boleh kurang dari 0");
    }
    if (payload.price !== undefined && payload.price < 0) {
      throw new Error("Price tidak boleh kurang dari 0");
    }

    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },

  async getTotalMedications() {
    const { data, error } = await supabase
      .from("medications")
      .select("quantity");
    
    if (error) throw error;
    
    const total = data.reduce((sum, medication) => sum + (medication.quantity || 0), 0);
    return total;
  },
};

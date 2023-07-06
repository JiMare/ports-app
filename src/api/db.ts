import { supabase } from "./supabase";

export const getPortsData = async () => {
  const { data } = await supabase.from("ports").select("*");
  return data;
};

export const getPortById = async (id: number) => {
  const { data } = await supabase.from("ports").select("*").eq("id", id);
  return data;
};

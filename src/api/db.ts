import { supabase } from "./supabase";

export const getPortsData = async () => {
  const { data } = await supabase.from("ports").select("*");
  return data;
};

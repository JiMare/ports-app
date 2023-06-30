import { supabase } from "./supabase";

export const getPortsData = async () => {
  const { data: ports, error } = await supabase.from("ports").select("*");
  return ports;
};

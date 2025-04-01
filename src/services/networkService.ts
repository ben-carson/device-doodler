
import { supabase } from "@/integrations/supabase/client";
import { 
  DeviceNode, 
  DeviceGroupNode, 
  DBDevice, 
  DBDeviceGroup, 
  DBDeviceConnection,
  DBDeviceGroupMapping
} from "@/types/device";
import { Edge } from "@xyflow/react";
import { toast } from "sonner";

// Device operations
export const saveDevice = async (deviceNode: DeviceNode): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .insert({
        name: deviceNode.data.name,
        ip_address: deviceNode.data.ipAddress,
        notes: deviceNode.data.notes,
        type: deviceNode.data.type
      })
      .select()
      .single();

    if (error) throw error;
    
    return data.id;
  } catch (error: any) {
    toast.error(`Failed to save device: ${error.message}`);
    console.error("Error saving device:", error);
    return null;
  }
};

export const updateDevice = async (deviceNode: DeviceNode): Promise<boolean> => {
  try {
    const id = deviceNode.id.replace(/^device-/, '');
    
    const { error } = await supabase
      .from('devices')
      .update({
        name: deviceNode.data.name,
        ip_address: deviceNode.data.ipAddress,
        notes: deviceNode.data.notes,
        type: deviceNode.data.type,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error updating device:", error);
    throw error;
  }
};

export const deleteDevice = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('devices')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error deleting device:", error);
    throw error;
  }
};

export const fetchDevices = async (): Promise<DBDevice[]> => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*');

    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch devices: ${error.message}`);
    console.error("Error fetching devices:", error);
    return [];
  }
};

// Group operations
export const saveGroup = async (groupNode: DeviceGroupNode): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('device_groups')
      .insert({
        name: groupNode.data.name,
        color: groupNode.data.color
      })
      .select()
      .single();

    if (error) throw error;
    
    return data.id;
  } catch (error: any) {
    toast.error(`Failed to save group: ${error.message}`);
    console.error("Error saving group:", error);
    return null;
  }
};

export const updateGroup = async (groupNode: DeviceGroupNode): Promise<boolean> => {
  try {
    const id = groupNode.id.replace(/^group-/, '');
    
    const { error } = await supabase
      .from('device_groups')
      .update({
        name: groupNode.data.name,
        color: groupNode.data.color,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const deleteGroup = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('device_groups')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error deleting group:", error);
    throw error;
  }
};

export const fetchGroups = async (): Promise<DBDeviceGroup[]> => {
  try {
    const { data, error } = await supabase
      .from('device_groups')
      .select('*');

    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch groups: ${error.message}`);
    console.error("Error fetching groups:", error);
    return [];
  }
};

// Connection operations
export const saveConnection = async (edge: Edge): Promise<string | null> => {
  try {
    // Extract source and target IDs without the "device-" or "group-" prefix
    const sourceId = edge.source.replace(/^(device-|group-)/, '');
    const targetId = edge.target.replace(/^(device-|group-)/, '');

    const { data, error } = await supabase
      .from('device_connections')
      .insert({
        source_id: sourceId,
        target_id: targetId
      })
      .select()
      .single();

    if (error) throw error;
    
    return data.id;
  } catch (error: any) {
    toast.error(`Failed to save connection: ${error.message}`);
    console.error("Error saving connection:", error);
    return null;
  }
};

export const deleteConnection = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('device_connections')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error deleting connection:", error);
    throw error;
  }
};

export const fetchConnections = async (): Promise<DBDeviceConnection[]> => {
  try {
    const { data, error } = await supabase
      .from('device_connections')
      .select('*');

    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch connections: ${error.message}`);
    console.error("Error fetching connections:", error);
    return [];
  }
};

// Device Group Mapping operations
export const saveDeviceGroupMapping = async (deviceId: string, groupId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('device_group_mappings')
      .insert({
        device_id: deviceId,
        group_id: groupId
      })
      .select()
      .single();

    if (error) throw error;
    
    return data.id;
  } catch (error: any) {
    toast.error(`Failed to map device to group: ${error.message}`);
    console.error("Error mapping device to group:", error);
    return null;
  }
};

export const fetchDeviceGroupMappings = async (): Promise<DBDeviceGroupMapping[]> => {
  try {
    const { data, error } = await supabase
      .from('device_group_mappings')
      .select('*');

    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch device group mappings: ${error.message}`);
    console.error("Error fetching device group mappings:", error);
    return [];
  }
};

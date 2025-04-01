
import { Node } from "@xyflow/react";

export interface DeviceData {
  name: string;
  ipAddress: string;
  notes: string;
  type: "computer" | "server" | "router" | "network" | "database" | "wifi" | "cable";
  [key: string]: unknown; // Add index signature to make it compatible with Record<string, unknown>
}

export type DeviceNode = Node<DeviceData>;

export interface DeviceGroupData {
  name: string;
  color: string;
  [key: string]: unknown; // Add index signature to make it compatible with Record<string, unknown>
}

export type DeviceGroupNode = Node<DeviceGroupData>;

export interface DBDevice {
  id: string;
  name: string;
  ip_address: string;
  notes: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface DBDeviceGroup {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface DBDeviceConnection {
  id: string;
  source_id: string;
  target_id: string;
  created_at: string;
  updated_at: string;
}

export interface DBDeviceGroupMapping {
  id: string;
  device_id: string;
  group_id: string;
  created_at: string;
  updated_at: string;
}

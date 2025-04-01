
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

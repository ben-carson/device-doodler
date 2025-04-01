
import { NodeProps } from "@xyflow/react";

export interface DeviceData {
  name: string;
  ipAddress: string;
  notes: string;
  type: "computer" | "server" | "router" | "network" | "database" | "wifi" | "cable";
}

export interface DeviceNode extends NodeProps {
  data: DeviceData;
}

export interface DeviceGroupData {
  name: string;
  color: string;
}

export interface DeviceGroupNode extends NodeProps {
  data: DeviceGroupData;
}


import { useState, useCallback } from "react";
import { toast } from "sonner";
import { 
  fetchDevices, 
  fetchGroups, 
  fetchConnections,
  saveConnection,
  saveDevice,
  saveGroup
} from "@/services/networkService";
import { DeviceData, DeviceGroupData, DBDevice, DBDeviceGroup, DBDeviceConnection } from "@/types/device";
import { Edge } from "@xyflow/react";

export const useNetworkFlowData = (
  setNodes: React.Dispatch<React.SetStateAction<any[]>>,
  setEdges: React.Dispatch<React.SetStateAction<any[]>>,
  onConnect: (params: any) => Edge
) => {
  const [isLoading, setIsLoading] = useState(false);

  const onAddDevice = useCallback(
    async (deviceData: DeviceData) => {
      // Create node for UI
      const newNode = {
        id: `device-${Date.now()}`,
        type: "device",
        position: {
          x: Math.random() * 300,
          y: Math.random() * 300,
        },
        data: deviceData,
      };

      // Add to UI state
      setNodes((nds) => nds.concat(newNode));
      
      // Save to database
      await saveDevice(newNode);
    },
    [setNodes]
  );

  const onAddGroup = useCallback(
    async (groupData: DeviceGroupData) => {
      // Create node for UI
      const newNode = {
        id: `group-${Date.now()}`,
        type: "group",
        position: {
          x: Math.random() * 300,
          y: Math.random() * 300,
        },
        style: {
          width: 300,
          height: 200,
        },
        data: groupData,
      };

      // Add to UI state
      setNodes((nds) => nds.concat(newNode));
      
      // Save to database
      await saveGroup(newNode);
    },
    [setNodes]
  );

  const onConnectWithSave = useCallback(
    async (params: any) => {
      // First add the edge to UI state
      const newEdge = onConnect(params);
      
      // Then save it to database
      await saveConnection(newEdge);
    },
    [onConnect]
  );

  // Load data from Supabase
  const loadNetworkData = async () => {
    setIsLoading(true);
    try {
      // Fetch devices, groups, and connections from database
      const dbDevices = await fetchDevices();
      const dbGroups = await fetchGroups();
      const dbConnections = await fetchConnections();
      
      // Convert DB devices to ReactFlow nodes
      const deviceNodes = dbDevices.map((device: DBDevice) => ({
        id: `device-${device.id}`,
        type: 'device',
        position: {
          x: Math.random() * 500,
          y: Math.random() * 400,
        },
        data: {
          name: device.name,
          ipAddress: device.ip_address,
          notes: device.notes,
          type: device.type,
        },
      }));
      
      // Convert DB groups to ReactFlow nodes
      const groupNodes = dbGroups.map((group: DBDeviceGroup) => ({
        id: `group-${group.id}`,
        type: 'group',
        position: {
          x: Math.random() * 500,
          y: Math.random() * 400,
        },
        style: {
          width: 300,
          height: 200,
        },
        data: {
          name: group.name,
          color: group.color,
        },
      }));
      
      // Convert DB connections to ReactFlow edges
      const connectionEdges = dbConnections.map((conn: DBDeviceConnection) => ({
        id: `edge-${conn.id}`,
        source: `device-${conn.source_id}`,
        target: `device-${conn.target_id}`,
      }));
      
      // Set nodes and edges
      setNodes([...deviceNodes, ...groupNodes]);
      setEdges(connectionEdges);
      
      toast.success("Network data loaded successfully");
    } catch (error) {
      console.error("Error loading network data:", error);
      toast.error("Failed to load network data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onAddDevice,
    onAddGroup,
    onConnectWithSave,
    loadNetworkData
  };
};

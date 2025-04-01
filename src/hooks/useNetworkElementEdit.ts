
import { useState } from "react";
import { toast } from "sonner";
import { 
  DeviceData, 
  DeviceGroupData,
  DeviceNode,
  DeviceGroupNode
} from "@/types/device";
import { 
  updateDevice, 
  updateGroup, 
  deleteDevice, 
  deleteGroup,
  deleteConnection
} from "@/services/networkService";

export const useNetworkElementEdit = (
  setNodes: React.Dispatch<React.SetStateAction<any[]>>,
  setEdges: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [editingDevice, setEditingDevice] = useState<DeviceNode | null>(null);
  const [editingGroup, setEditingGroup] = useState<DeviceGroupNode | null>(null);
  
  // Open edit modals
  const openDeviceEdit = (deviceNode: DeviceNode) => {
    setEditingDevice(deviceNode);
  };

  const openGroupEdit = (groupNode: DeviceGroupNode) => {
    setEditingGroup(groupNode);
  };

  // Close edit modals
  const closeDeviceEdit = () => {
    setEditingDevice(null);
  };

  const closeGroupEdit = () => {
    setEditingGroup(null);
  };

  // Save edited device
  const saveDeviceEdit = async (deviceData: DeviceData) => {
    if (!editingDevice) return;
    
    try {
      // Update device in database
      await updateDevice({
        ...editingDevice,
        data: deviceData
      });
      
      // Update UI
      setNodes((nodes) => 
        nodes.map((node) => 
          node.id === editingDevice.id 
            ? { ...node, data: deviceData } 
            : node
        )
      );
      
      closeDeviceEdit();
      toast.success("Device updated successfully");
    } catch (error: any) {
      console.error("Error updating device:", error);
      toast.error(`Failed to update device: ${error.message}`);
    }
  };

  // Save edited group
  const saveGroupEdit = async (groupData: DeviceGroupData) => {
    if (!editingGroup) return;
    
    try {
      // Update group in database
      await updateGroup({
        ...editingGroup,
        data: groupData
      });
      
      // Update UI
      setNodes((nodes) => 
        nodes.map((node) => 
          node.id === editingGroup.id 
            ? { ...node, data: groupData } 
            : node
        )
      );
      
      closeGroupEdit();
      toast.success("Group updated successfully");
    } catch (error: any) {
      console.error("Error updating group:", error);
      toast.error(`Failed to update group: ${error.message}`);
    }
  };

  // Delete device
  const handleDeleteDevice = async (deviceId: string) => {
    try {
      // Get device ID without the "device-" prefix
      const id = deviceId.replace(/^device-/, '');
      
      // Delete device from database
      await deleteDevice(id);
      
      // Update UI - remove device node
      setNodes((nodes) => nodes.filter((node) => node.id !== deviceId));
      
      // Update UI - remove any edges connected to this device
      setEdges((edges) => 
        edges.filter(
          (edge) => edge.source !== deviceId && edge.target !== deviceId
        )
      );
      
      toast.success("Device deleted successfully");
    } catch (error: any) {
      console.error("Error deleting device:", error);
      toast.error(`Failed to delete device: ${error.message}`);
    }
  };

  // Delete group
  const handleDeleteGroup = async (groupId: string) => {
    try {
      // Get group ID without the "group-" prefix
      const id = groupId.replace(/^group-/, '');
      
      // Delete group from database
      await deleteGroup(id);
      
      // Update UI - remove group node
      setNodes((nodes) => nodes.filter((node) => node.id !== groupId));
      
      toast.success("Group deleted successfully");
    } catch (error: any) {
      console.error("Error deleting group:", error);
      toast.error(`Failed to delete group: ${error.message}`);
    }
  };

  // Delete connection
  const handleDeleteConnection = async (edgeId: string) => {
    try {
      // Get edge ID without the "edge-" prefix
      const id = edgeId.replace(/^edge-/, '');
      
      // Delete connection from database
      await deleteConnection(id);
      
      // Update UI - remove edge
      setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
      
      toast.success("Connection deleted successfully");
    } catch (error: any) {
      console.error("Error deleting connection:", error);
      toast.error(`Failed to delete connection: ${error.message}`);
    }
  };

  return {
    editingDevice,
    editingGroup,
    openDeviceEdit,
    openGroupEdit,
    closeDeviceEdit,
    closeGroupEdit,
    saveDeviceEdit,
    saveGroupEdit,
    handleDeleteDevice,
    handleDeleteGroup,
    handleDeleteConnection
  };
};

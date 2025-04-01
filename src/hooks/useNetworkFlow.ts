
import { useEffect } from "react";
import { useNetworkFlowState } from "./useNetworkFlowState";
import { useNetworkFlowData } from "./useNetworkFlowData";

export const useNetworkFlow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isConnecting,
    toggleConnectionMode,
    onLoad,
    reactFlowInstance
  } = useNetworkFlowState();

  const {
    isLoading,
    onAddDevice,
    onAddGroup,
    onConnectWithSave,
    loadNetworkData
  } = useNetworkFlowData(setNodes, setEdges, onConnect);
  
  // Load data on component mount
  useEffect(() => {
    loadNetworkData();
  }, []);

  return {
    // State
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    isConnecting,
    reactFlowInstance,
    
    // Event handlers
    onConnect: onConnectWithSave,
    onAddDevice,
    onAddGroup,
    toggleConnectionMode,
    onLoad,
    
    // Data operations
    loadNetworkData,
    isLoading
  };
};

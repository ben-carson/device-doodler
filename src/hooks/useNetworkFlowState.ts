
import { useState, useCallback } from "react";
import {
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge
} from "@xyflow/react";

export const useNetworkFlowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = { ...params, id: `edge-${Date.now()}` };
      setEdges((eds) => addEdge(newEdge, eds));
      return newEdge;
    },
    [setEdges]
  );
  
  const toggleConnectionMode = () => {
    setIsConnecting(!isConnecting);
  };

  const onLoad = (instance: any) => {
    setReactFlowInstance(instance);
  };
  
  return {
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
  };
};

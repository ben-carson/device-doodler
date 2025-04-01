
import { useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  ConnectionMode
} from "@xyflow/react";
import DeviceNode from "./DeviceNode";
import GroupNode from "./GroupNode";
import { useNetworkFlow } from "@/hooks/useNetworkFlow";
import NetworkFlowFormPanel from "./NetworkFlowFormPanel";
import NetworkFlowControlPanel from "./NetworkFlowControlPanel";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  device: DeviceNode,
  group: GroupNode,
};

const NetworkFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    onAddDevice, 
    onAddGroup,
    isConnecting,
    toggleConnectionMode,
    onLoad,
    loadNetworkData,
    isLoading
  } = useNetworkFlow();

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={isConnecting ? ConnectionMode.Loose : ConnectionMode.Strict}
        fitView
        onInit={onLoad}
      >
        <Background />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        <NetworkFlowFormPanel onAddDevice={onAddDevice} onAddGroup={onAddGroup} />
        <NetworkFlowControlPanel 
          isConnecting={isConnecting}
          toggleConnectionMode={toggleConnectionMode}
          loadNetworkData={loadNetworkData}
          isLoading={isLoading}
        />
      </ReactFlow>
    </div>
  );
};

export default NetworkFlow;

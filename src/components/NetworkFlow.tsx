
import { useRef, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  ConnectionMode,
  Edge,
  OnEdgeClick,
  NodeMouseHandler
} from "@xyflow/react";
import DeviceNode from "./DeviceNode";
import GroupNode from "./GroupNode";
import { useNetworkFlow } from "@/hooks/useNetworkFlow";
import NetworkFlowFormPanel from "./NetworkFlowFormPanel";
import NetworkFlowControlPanel from "./NetworkFlowControlPanel";
import DeviceEditDialog from "./DeviceEditDialog";
import GroupEditDialog from "./GroupEditDialog";
import { useNetworkElementEdit } from "@/hooks/useNetworkElementEdit";
import { DeviceNode as DeviceNodeType, DeviceGroupNode as DeviceGroupNodeType } from "@/types/device";

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
    isLoading,
    setNodes,
    setEdges
  } = useNetworkFlow();

  const {
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
  } = useNetworkElementEdit(setNodes, setEdges);

  const onNodeContextMenu: NodeMouseHandler = useCallback((event, node) => {
    // Prevent default context menu
    event.preventDefault();
    
    // Open edit dialog based on node type
    if (node.type === 'device') {
      openDeviceEdit(node as DeviceNodeType);
    } else if (node.type === 'group') {
      openGroupEdit(node as DeviceGroupNodeType);
    }
  }, [openDeviceEdit, openGroupEdit]);

  const onEdgeClick: OnEdgeClick = useCallback((event, edge) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      handleDeleteConnection(edge.id);
    }
  }, [handleDeleteConnection]);

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeClick={onEdgeClick}
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

      {/* Edit Dialogs */}
      {editingDevice && (
        <DeviceEditDialog
          device={editingDevice}
          onSave={saveDeviceEdit}
          onCancel={closeDeviceEdit}
          onDelete={() => {
            handleDeleteDevice(editingDevice.id);
            closeDeviceEdit();
          }}
        />
      )}

      {editingGroup && (
        <GroupEditDialog
          group={editingGroup}
          onSave={saveGroupEdit}
          onCancel={closeGroupEdit}
          onDelete={() => {
            handleDeleteGroup(editingGroup.id);
            closeGroupEdit();
          }}
        />
      )}
    </div>
  );
};

export default NetworkFlow;

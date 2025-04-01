
import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Connection,
  Edge,
  ConnectionMode
} from "@xyflow/react";
import DeviceNode from "./DeviceNode";
import GroupNode from "./GroupNode";
import DeviceForm from "./DeviceForm";
import GroupForm from "./GroupForm";
import { DeviceData, DeviceGroupData } from "@/types/device";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  device: DeviceNode,
  group: GroupNode,
};

const NetworkFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddDevice = useCallback(
    (deviceData: DeviceData) => {
      const newNode = {
        id: `device-${Date.now()}`,
        type: "device",
        position: {
          x: Math.random() * 300,
          y: Math.random() * 300,
        },
        data: deviceData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onAddGroup = useCallback(
    (groupData: DeviceGroupData) => {
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

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const toggleConnectionMode = () => {
    setIsConnecting(!isConnecting);
  };

  const onLoad = (instance: any) => {
    setReactFlowInstance(instance);
  };

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
        <Panel position="top-left" className="w-72 bg-white rounded-md shadow-md overflow-hidden">
          <Tabs defaultValue="device" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="device">Device</TabsTrigger>
              <TabsTrigger value="group">Group</TabsTrigger>
            </TabsList>
            <TabsContent value="device">
              <DeviceForm onAddDevice={onAddDevice} />
            </TabsContent>
            <TabsContent value="group">
              <GroupForm onAddGroup={onAddGroup} />
            </TabsContent>
          </Tabs>
        </Panel>
        <Panel position="top-right">
          <Button
            onClick={toggleConnectionMode}
            variant={isConnecting ? "default" : "outline"}
            className="mb-2"
          >
            {isConnecting ? "Cancel Connection" : "Connect Devices"}
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default NetworkFlow;

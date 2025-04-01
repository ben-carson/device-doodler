
import { useState, useCallback, useRef, useEffect } from "react";
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
import { DeviceData, DeviceGroupData, DBDevice, DBDeviceGroup, DBDeviceConnection } from "@/types/device";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  fetchDevices, 
  fetchGroups, 
  fetchConnections, 
  saveDevice, 
  saveGroup, 
  saveConnection 
} from "@/services/networkService";
import { toast } from "sonner";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  device: DeviceNode,
  group: GroupNode,
};

const NetworkFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    async (params: Connection) => {
      // First add the edge to state
      const newEdge = { ...params, id: `edge-${Date.now()}` };
      setEdges((eds) => addEdge(newEdge, eds));
      
      // Then save it to database
      await saveConnection(newEdge);
    },
    [setEdges]
  );

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

  const toggleConnectionMode = () => {
    setIsConnecting(!isConnecting);
  };

  const onLoad = (instance: any) => {
    setReactFlowInstance(instance);
  };
  
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
  
  // Load data on component mount
  useEffect(() => {
    loadNetworkData();
  }, []);

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
        <Panel position="top-right" className="flex flex-col gap-2">
          <Button
            onClick={toggleConnectionMode}
            variant={isConnecting ? "default" : "outline"}
          >
            {isConnecting ? "Cancel Connection" : "Connect Devices"}
          </Button>
          <Button 
            onClick={loadNetworkData} 
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Refresh Data"}
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default NetworkFlow;


import { DeviceData, DeviceGroupData } from "@/types/device";
import DeviceForm from "./DeviceForm";
import GroupForm from "./GroupForm";
import { Panel } from "@xyflow/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NetworkFlowFormPanelProps {
  onAddDevice: (device: DeviceData) => void;
  onAddGroup: (group: DeviceGroupData) => void;
}

const NetworkFlowFormPanel = ({ onAddDevice, onAddGroup }: NetworkFlowFormPanelProps) => {
  return (
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
  );
};

export default NetworkFlowFormPanel;

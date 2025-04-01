
import { Button } from "@/components/ui/button";
import { Panel } from "@xyflow/react";

interface NetworkFlowControlPanelProps {
  isConnecting: boolean;
  toggleConnectionMode: () => void;
  loadNetworkData: () => void;
  isLoading: boolean;
}

const NetworkFlowControlPanel = ({ 
  isConnecting, 
  toggleConnectionMode, 
  loadNetworkData, 
  isLoading 
}: NetworkFlowControlPanelProps) => {
  return (
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
  );
};

export default NetworkFlowControlPanel;

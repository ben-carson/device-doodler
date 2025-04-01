
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Computer, Server, Router, Database, Wifi, Cable, Network, Edit } from "lucide-react";

const DeviceNode = ({ data, selected }: { data: any, selected: boolean }) => {
  const getIcon = () => {
    switch (data.type) {
      case "computer":
        return <Computer className="w-8 h-8" />;
      case "server":
        return <Server className="w-8 h-8" />;
      case "router":
        return <Router className="w-8 h-8" />;
      case "network":
        return <Network className="w-8 h-8" />;
      case "database":
        return <Database className="w-8 h-8" />;
      case "wifi":
        return <Wifi className="w-8 h-8" />;
      case "cable":
        return <Cable className="w-8 h-8" />;
      default:
        return <Computer className="w-8 h-8" />;
    }
  };

  return (
    <div
      className={`p-4 rounded-md shadow-md bg-white border-2 relative ${
        selected ? "border-accent" : "border-gray-200"
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-accent" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-accent" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-accent" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-accent" />
      
      <div className="flex flex-col items-center min-w-[120px]">
        <div className="mb-2">{getIcon()}</div>
        <div className="font-medium text-center">{data.name}</div>
        <div className="text-sm text-gray-500">{data.ipAddress}</div>
        {data.notes && (
          <div className="mt-2 text-xs text-gray-600 max-w-[150px] overflow-hidden text-ellipsis">
            {data.notes}
          </div>
        )}
      </div>
      
      {/* Edit indicator */}
      <div className="absolute top-1 right-1 text-gray-400 text-xs opacity-50 hover:opacity-100">
        <Edit size={12} />
        <span className="sr-only">Right-click to edit</span>
      </div>
    </div>
  );
};

export default memo(DeviceNode);

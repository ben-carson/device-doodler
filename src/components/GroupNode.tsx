
import { memo } from "react";
import { NodeResizer } from "@xyflow/react";

const GroupNode = ({ data, selected }: { data: any, selected: boolean }) => {
  return (
    <div
      className={`p-2 rounded-md border-2 bg-opacity-20 min-w-[200px] min-h-[200px] ${
        selected ? "border-accent" : `border-${data.color || "gray-300"}`
      }`}
      style={{ backgroundColor: `rgba(67, 97, 238, 0.1)` }}
    >
      <NodeResizer 
        color="#4361ee"
        isVisible={selected} 
        minWidth={200} 
        minHeight={150} 
      />
      <div className="font-medium text-sm bg-white bg-opacity-80 rounded px-2 py-1 inline-block">
        {data.name || "Group"}
      </div>
    </div>
  );
};

export default memo(GroupNode);

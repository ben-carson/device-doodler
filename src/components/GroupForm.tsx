
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeviceGroupData } from "@/types/device";
import { toast } from "sonner";

interface GroupFormProps {
  onAddGroup: (group: DeviceGroupData) => void;
}

const GroupForm = ({ onAddGroup }: GroupFormProps) => {
  const [group, setGroup] = useState<DeviceGroupData>({
    name: "",
    color: "blue-400",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!group.name.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    onAddGroup(group);
    toast.success(`Added group: ${group.name}`);
    
    setGroup({
      name: "",
      color: "blue-400",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="groupName">Group Name</Label>
        <Input
          id="groupName"
          value={group.name}
          onChange={(e) => setGroup({ ...group, name: e.target.value })}
          placeholder="e.g., Home Office"
        />
      </div>

      <Button type="submit" className="w-full">Add Group</Button>
    </form>
  );
};

export default GroupForm;

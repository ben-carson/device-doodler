
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DeviceData } from "@/types/device";
import { toast } from "sonner";

interface DeviceFormProps {
  onAddDevice: (device: DeviceData) => void;
}

const DeviceForm = ({ onAddDevice }: DeviceFormProps) => {
  const [device, setDevice] = useState<DeviceData>({
    name: "",
    ipAddress: "",
    notes: "",
    type: "computer"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!device.name.trim()) {
      toast.error("Please enter a device name");
      return;
    }

    if (!device.ipAddress.trim()) {
      toast.error("Please enter an IP address");
      return;
    }

    onAddDevice(device);
    toast.success(`Added ${device.name}`);
    
    setDevice({
      name: "",
      ipAddress: "",
      notes: "",
      type: "computer"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="name">Device Name</Label>
        <Input
          id="name"
          value={device.name}
          onChange={(e) => setDevice({ ...device, name: e.target.value })}
          placeholder="e.g., Main Router"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Device Type</Label>
        <Select 
          value={device.type} 
          onValueChange={(value: any) => setDevice({ ...device, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select device type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="computer">Computer</SelectItem>
            <SelectItem value="server">Server</SelectItem>
            <SelectItem value="router">Router</SelectItem>
            <SelectItem value="network">Network</SelectItem>
            <SelectItem value="database">Database</SelectItem>
            <SelectItem value="wifi">WiFi</SelectItem>
            <SelectItem value="cable">Cable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ipAddress">IP Address</Label>
        <Input
          id="ipAddress"
          value={device.ipAddress}
          onChange={(e) => setDevice({ ...device, ipAddress: e.target.value })}
          placeholder="e.g., 192.168.1.1"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={device.notes}
          onChange={(e) => setDevice({ ...device, notes: e.target.value })}
          placeholder="Any additional information..."
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">Add Device</Button>
    </form>
  );
};

export default DeviceForm;

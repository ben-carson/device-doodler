
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeviceGroupNode, DeviceGroupData } from "@/types/device";

interface GroupEditDialogProps {
  group: DeviceGroupNode;
  onSave: (data: DeviceGroupData) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const GroupEditDialog = ({ group, onSave, onCancel, onDelete }: GroupEditDialogProps) => {
  const [formData, setFormData] = useState<DeviceGroupData>({
    name: group.data.name,
    color: group.data.color
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">Color</Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="flex-1"
                  required
                />
                <div 
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: formData.color }}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" type="button" onClick={onDelete}>
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GroupEditDialog;

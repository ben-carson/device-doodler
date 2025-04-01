
import { ReactFlowProvider } from "@xyflow/react";
import NetworkFlow from "@/components/NetworkFlow";

const Index = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="bg-primary px-6 py-4 text-white">
        <h1 className="text-2xl font-bold">Homelab Network Mapper</h1>
        <p className="text-sm opacity-80">Map your network devices with drag and drop simplicity</p>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <ReactFlowProvider>
          <NetworkFlow />
        </ReactFlowProvider>
      </main>
    </div>
  );
};

export default Index;

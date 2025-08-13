"use client";

import { Thread } from "@/components/assistant-ui/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { AgentSelector } from "@/components/assistant-ui/agent-selector";
import { useAgentContext } from "@/app/MyRuntimeProvider";
import { availableAgents } from "@/lib/ai/agents/metadata";

export const Assistant = () => {
  const { selectedAgent, setSelectedAgent } = useAgentContext();

  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full pr-0.5">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AgentSelector
              agents={availableAgents}
              selectedAgent={selectedAgent}
              onAgentChange={setSelectedAgent}
            />
          </header>
          <div className="flex-1 overflow-hidden">
            <Thread />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

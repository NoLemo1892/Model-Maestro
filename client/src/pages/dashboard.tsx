import { useState } from "react";
import { WorkflowVisualizer } from "@/components/conductor/workflow-visualizer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, Play, RotateCcw, Settings2, FileCode2, Terminal, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import generatedBg from "@assets/generated_images/subtle_dark_blue_digital_grid_background.png";

type WorkflowState = "idle" | "analyzing" | "dispatching" | "merging" | "complete";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("Design an observability platform for our multi-cloud infra and produce an implementation plan.");
  const [workflowState, setWorkflowState] = useState<WorkflowState>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [finalOutput, setFinalOutput] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runSimulation = () => {
    if (workflowState !== "idle") return;
    
    setLogs([]);
    setFinalOutput(null);
    setWorkflowState("analyzing");
    addLog("Conductor received request: Analyzing intent...");

    setTimeout(() => {
      setWorkflowState("dispatching");
      addLog("Intent identified: Multi-agent coordination required.");
      addLog("Routing to: Infra Architect (Bedrock), Compliance (Internal), Cost (Einstein)");
    }, 1500);

    setTimeout(() => {
      addLog("Infra Agent: Processing architecture diagrams...");
    }, 2500);

    setTimeout(() => {
      addLog("Compliance Agent: Verifying data residency requirements...");
    }, 3000);

    setTimeout(() => {
      addLog("Cost Agent: Calculating projected spend against budget...");
    }, 4000);

    setTimeout(() => {
      setWorkflowState("merging");
      addLog("Agents completed. Merging outputs...");
    }, 6000);

    setTimeout(() => {
      setWorkflowState("complete");
      addLog("Workflow complete. Final response generated.");
      setFinalOutput(`## Observability Platform Implementation Plan

### 1. Architecture (Infra Agent)
- **Core:** Prometheus + Grafana stack on EKS.
- **Storage:** Amazon Managed Service for Prometheus (AMP).
- **Ingestion:** Fluent Bit sidecars for log forwarding.

### 2. Security & Compliance (Compliance Agent)
- **Data Residency:** All logs must stay within us-east-1 (Internal Policy #882).
- **Encryption:** KMS integration required for all at-rest data.
- **Access:** RBAC mapped to internal AD groups.

### 3. Cost Analysis (Cost Agent)
- **Estimated Monthly Cost:** $1,250 (based on current Salesforce volume).
- **Optimization:** Use Spot Instances for worker nodes to reduce compute costs by 40%.
`);
    }, 8000);
  };

  const reset = () => {
    setWorkflowState("idle");
    setLogs([]);
    setFinalOutput(null);
  };

  const mockConfig = `{
  "routing_rules": [
    {
      "intent": "infrastructure_design",
      "priority": "high",
      "agents": ["infra_architect", "security_compliance", "cost_optimization"],
      "strategy": "parallel_execution"
    },
    {
      "intent": "code_generation",
      "priority": "medium",
      "agents": ["dev_assistant"],
      "strategy": "direct"
    }
  ],
  "model_registry": {
    "infra_architect": {
      "provider": "amazon_bedrock",
      "model": "anthropic.claude-3-sonnet-20240229-v1:0"
    },
    "security_compliance": {
      "provider": "internal",
      "model": "finetuned-llama-3-70b"
    },
    "cost_optimization": {
      "provider": "salesforce",
      "model": "einstein-gpt"
    }
  }
}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
       <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url(${generatedBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 border-b bg-background/80 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/20 rounded-md flex items-center justify-center border border-primary/50">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">ModelGateway<span className="text-primary">.ai</span></span>
            <Badge variant="outline" className="ml-2 font-mono text-xs border-primary/30 text-primary/80">
              Internal Beta
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <FileCode2 className="h-4 w-4 mr-2" />
              API Docs
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Config
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Routing Configuration
                  </DialogTitle>
                  <DialogDescription>
                    Define how intents are mapped to agent workflows and underlying models.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 rounded-md border border-border bg-slate-950 p-4 overflow-hidden">
                  <pre className="text-xs font-mono text-blue-300 overflow-auto max-h-[400px]">
                    {mockConfig}
                  </pre>
                </div>
              </DialogContent>
            </Dialog>

            <div className="h-8 w-8 rounded-full bg-secondary border flex items-center justify-center">
              <span className="text-xs font-bold">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Request & Visualizer */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Input Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-background/50 font-mono text-sm resize-none border-primary/20 focus-visible:ring-primary/30"
                  disabled={workflowState !== "idle"}
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {workflowState === "idle" ? (
                    <Button onClick={runSimulation} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      <Play className="h-3 w-3 mr-2" />
                      Generate Plan
                    </Button>
                  ) : (
                    <Button onClick={reset} variant="outline" size="sm" className="border-destructive/50 hover:bg-destructive/10 text-destructive">
                      <RotateCcw className="h-3 w-3 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/40 backdrop-blur-sm min-h-[600px] overflow-hidden relative">
             <div className="absolute top-4 left-4 z-20">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Live Orchestration
              </CardTitle>
             </div>
             <WorkflowVisualizer state={workflowState} />
          </Card>
        </div>

        {/* Right Col: Logs & Output */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm h-[300px] flex flex-col">
            <CardHeader className="py-3 px-4 border-b border-border/40">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">System Logs</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  {logs.length === 0 && <span className="text-xs text-muted-foreground italic">Waiting for request...</span>}
                  {logs.map((log, i) => (
                    <div key={i} className="text-[11px] font-mono text-primary/80 border-l-2 border-primary/20 pl-2">
                      {log}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className={cn(
            "border-border/50 bg-card/40 backdrop-blur-sm flex flex-col transition-all duration-500",
            workflowState === "complete" ? "h-[500px] opacity-100" : "h-[200px] opacity-50"
          )}>
            <CardHeader className="py-3 px-4 border-b border-border/40 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Final Output</CardTitle>
              {workflowState === "complete" && <Badge variant="secondary" className="text-[10px]">Ready</Badge>}
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                {finalOutput ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-primary prose-p:text-muted-foreground">
                    <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {finalOutput}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-xs italic">
                    Output will appear here...
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
}

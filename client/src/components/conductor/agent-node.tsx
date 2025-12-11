import { motion } from "framer-motion";
import { Server, Shield, Calculator, CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentStatus = "idle" | "processing" | "complete" | "error";

interface AgentNodeProps {
  name: string;
  role: string;
  model: "Amazon Bedrock" | "Salesforce Einstein" | "Internal LLM";
  status: AgentStatus;
  delay?: number;
}

export function AgentNode({ name, role, model, status, delay = 0 }: AgentNodeProps) {
  const getIcon = () => {
    switch (role) {
      case "Infra": return <Server className="h-5 w-5" />;
      case "Security": return <Shield className="h-5 w-5" />;
      case "Cost": return <Calculator className="h-5 w-5" />;
      default: return <Server className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "processing": return "border-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]";
      case "complete": return "border-accent shadow-[0_0_15px_rgba(20,184,166,0.5)]";
      case "error": return "border-destructive";
      default: return "border-border opacity-60";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className={cn(
        "relative w-64 p-4 rounded-lg border bg-card/50 backdrop-blur-sm transition-all duration-300",
        getStatusColor()
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-md bg-secondary text-secondary-foreground",
            status === "processing" && "animate-pulse"
          )}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{role} Agent</p>
          </div>
        </div>
        <div className="text-xs font-mono">
          {status === "idle" && <CircleDashed className="h-4 w-4 text-muted-foreground" />}
          {status === "processing" && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
          {status === "complete" && <CheckCircle2 className="h-4 w-4 text-accent" />}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Model</span>
          <span className="font-mono text-primary/80">{model}</span>
        </div>
        
        {status === "processing" && (
          <div className="space-y-1">
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">Generating response...</p>
          </div>
        )}
        
        {status === "complete" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2 bg-secondary/50 rounded text-[10px] font-mono text-muted-foreground truncate"
          >
            Payload received.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { BrainCircuit, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConductorNodeProps {
  status: "idle" | "analyzing" | "dispatching" | "merging" | "complete";
}

export function ConductorNode({ status }: ConductorNodeProps) {
  return (
    <div className="relative flex flex-col items-center justify-center z-10">
      {/* Pulse Effect */}
      {status !== "idle" && status !== "complete" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
        />
      )}

      <div className={cn(
        "relative w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center bg-background transition-colors duration-500",
        status === "idle" ? "border-muted" :
        status === "complete" ? "border-accent shadow-[0_0_30px_rgba(20,184,166,0.3)]" :
        "border-primary shadow-[0_0_30px_rgba(59,130,246,0.4)]"
      )}>
        <BrainCircuit className={cn(
          "h-12 w-12 transition-colors duration-300",
          status === "complete" ? "text-accent" :
          status === "idle" ? "text-muted-foreground" : "text-primary"
        )} />
        <div className="mt-2 text-xs font-mono font-bold uppercase tracking-wider">
          Conductor
        </div>
        
        {status !== "idle" && status !== "complete" && (
          <div className="absolute -bottom-8 flex items-center gap-2 text-xs font-mono text-primary animate-pulse">
            <Activity className="h-3 w-3" />
            <span>{status.toUpperCase()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

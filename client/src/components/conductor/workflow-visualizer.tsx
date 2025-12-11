import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentNode } from "./agent-node";
import { ConductorNode } from "./conductor-node";
import { ArrowDown } from "lucide-react";

type WorkflowState = "idle" | "analyzing" | "dispatching" | "merging" | "complete";

interface WorkflowVisualizerProps {
  state: WorkflowState;
}

export function WorkflowVisualizer({ state }: WorkflowVisualizerProps) {
  // Derived states for children
  const [infraStatus, setInfraStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [secStatus, setSecStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [costStatus, setCostStatus] = useState<"idle" | "processing" | "complete">("idle");

  useEffect(() => {
    if (state === "idle") {
      setInfraStatus("idle");
      setSecStatus("idle");
      setCostStatus("idle");
    } else if (state === "dispatching") {
      // Simulate staggered start
      setTimeout(() => setInfraStatus("processing"), 200);
      setTimeout(() => setSecStatus("processing"), 600);
      setTimeout(() => setCostStatus("processing"), 1000);
    } else if (state === "merging") {
      setInfraStatus("complete");
      setSecStatus("complete");
      setCostStatus("complete");
    }
  }, [state]);

  return (
    <div className="w-full h-[600px] relative flex flex-col items-center py-12">
      {/* Background Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
        {/* Lines from Conductor to Agents */}
        <line x1="50%" y1="160" x2="20%" y2="400" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <line x1="50%" y1="160" x2="50%" y2="400" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <line x1="50%" y1="160" x2="80%" y2="400" stroke="currentColor" strokeWidth="2" className="text-primary" />
        
        {/* Animated packets */}
        {state === "dispatching" && (
          <>
            <motion.circle r="4" fill="currentColor" className="text-primary">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 50% 160 L 20% 400" />
            </motion.circle>
            <motion.circle r="4" fill="currentColor" className="text-primary">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M 50% 160 L 50% 400" />
            </motion.circle>
            <motion.circle r="4" fill="currentColor" className="text-primary">
              <animateMotion dur="1.4s" repeatCount="indefinite" path="M 50% 160 L 80% 400" />
            </motion.circle>
          </>
        )}
        
        {state === "merging" && (
          <>
            <motion.circle r="4" fill="currentColor" className="text-accent">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 20% 400 L 50% 160" />
            </motion.circle>
            <motion.circle r="4" fill="currentColor" className="text-accent">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M 50% 400 L 50% 160" />
            </motion.circle>
            <motion.circle r="4" fill="currentColor" className="text-accent">
              <animateMotion dur="1.4s" repeatCount="indefinite" path="M 80% 400 L 50% 160" />
            </motion.circle>
          </>
        )}
      </svg>

      {/* Top Layer: Conductor */}
      <div className="relative z-10 mb-24">
        <ConductorNode status={state} />
      </div>

      {/* Bottom Layer: Agents Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 px-8 z-10">
        <div className="flex justify-center">
          <AgentNode 
            name="Infra Architect" 
            role="Infra" 
            model="Amazon Bedrock" 
            status={infraStatus}
            delay={1}
          />
        </div>
        <div className="flex justify-center">
          <AgentNode 
            name="Compliance Officer" 
            role="Security" 
            model="Internal LLM" 
            status={secStatus}
            delay={2}
          />
        </div>
        <div className="flex justify-center">
          <AgentNode 
            name="Cost Analyst" 
            role="Cost" 
            model="Salesforce Einstein" 
            status={costStatus}
            delay={3}
          />
        </div>
      </div>
    </div>
  );
}

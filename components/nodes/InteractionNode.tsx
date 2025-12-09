"use client";

import { useState } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type InteractionType = "ai_prompt" | "human_review";

export type InteractionNodeData = {
  label: string;
  type?: InteractionType;
  prompt?: string;
  assignee?: string;
};

const INTERACTION_TYPES = [
  { value: "ai_prompt", label: "AI Prompt" },
  { value: "human_review", label: "Human Review" },
] as const;

const ASSIGNEES = [
  { value: "manager", label: "Manager" },
  { value: "team_lead", label: "Team Lead" },
  { value: "support", label: "Support Team" },
  { value: "owner", label: "Owner" },
] as const;

export function InteractionNode({ id, data, selected }: NodeProps) {
  const nodeData = data as InteractionNodeData;
  const { updateNodeData } = useReactFlow();

  const [interactionType, setInteractionType] = useState<InteractionType | undefined>(nodeData.type);
  const [prompt, setPrompt] = useState(nodeData.prompt ?? "");
  const [assignee, setAssignee] = useState<string | undefined>(nodeData.assignee);

  const handleTypeChange = (value: string) => {
    const newType = value as InteractionType;
    setInteractionType(newType);
    updateNodeData(id, { ...nodeData, type: newType });
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    updateNodeData(id, { ...nodeData, prompt: value });
  };

  const handleAssigneeChange = (value: string) => {
    setAssignee(value);
    updateNodeData(id, { ...nodeData, assignee: value });
  };

  return (
    <div className={`relative flex flex-col gap-3 p-4 bg-gray-100 rounded-lg shadow-md min-w-[220px] ${selected ? "border-3 border-gray-700" : "border-2 border-gray-500"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {nodeData.label}
      </span>

      <Select value={interactionType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {INTERACTION_TYPES.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {interactionType === "ai_prompt" && (
        <Textarea
          value={prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder="Enter AI prompt..."
          className="min-h-[80px] bg-white resize-y"
        />
      )}

      {interactionType === "human_review" && (
        <Select value={assignee} onValueChange={handleAssigneeChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Assign to..." />
          </SelectTrigger>
          <SelectContent>
            {ASSIGNEES.map((a) => (
              <SelectItem key={a.value} value={a.value}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
}

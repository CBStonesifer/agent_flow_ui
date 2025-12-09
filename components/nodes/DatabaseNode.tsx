"use client";

import { useState } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";

export type DatabaseNodeData = {
  label: string;
  query?: string;
};

export function DatabaseNode({ id, data, selected }: NodeProps) {
  const nodeData = data as DatabaseNodeData;
  const { updateNodeData } = useReactFlow();

  const [query, setQuery] = useState(nodeData.query ?? "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    updateNodeData(id, { ...nodeData, query: value });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement generation logic
    setIsGenerating(false);
  };

  return (
    <div className={`relative flex flex-col gap-3 p-4 bg-gray-100 rounded-lg shadow-md min-w-[200px] ${selected ? "border-3 border-gray-700" : "border-2 border-gray-500"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {nodeData.label}
      </span>

      <textarea
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Enter query..."
        className="w-full min-h-[80px] p-2 text-sm bg-white border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        size="sm"
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate"}
      </Button>

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
}

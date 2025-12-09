"use client";

import { useState } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { Switch } from "@/components/ui/switch";

export type LogicNodeData = {
  label: string;
  operator?: "and" | "or";
};

export function LogicNode({ id, data, selected }: NodeProps) {
  const nodeData = data as LogicNodeData;
  const { updateNodeData } = useReactFlow();

  const [isAnd, setIsAnd] = useState(nodeData.operator !== "or");

  const handleToggle = (checked: boolean) => {
    setIsAnd(checked);
    updateNodeData(id, { ...nodeData, operator: checked ? "and" : "or" });
  };

  return (
    <div className={`relative flex flex-col gap-3 p-4 bg-gray-100 rounded-lg shadow-md min-w-[140px] ${selected ? "border-3 border-gray-700" : "border-2 border-gray-500"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="target" position={Position.Top} id="top" className="w-3 h-3" />

      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-center">
        {nodeData.label}
      </span>

      <div className="flex items-center justify-center gap-2">
        <span className={`text-sm font-medium ${!isAnd ? "text-gray-900" : "text-gray-400"}`}>
          OR
        </span>
        <Switch
          checked={isAnd}
          onCheckedChange={handleToggle}
        />
        <span className={`text-sm font-medium ${isAnd ? "text-gray-900" : "text-gray-400"}`}>
          AND
        </span>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-3 h-3" />
    </div>
  );
}

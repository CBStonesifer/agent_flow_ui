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

export type TriggerPlatform = "date_and_time"|"sevenrooms" | "opentable" | "google_reviews" | "resy";

export type TriggerNodeData = {
  label: string;
  platform?: TriggerPlatform;
  trigger?: string;
};

const PLATFORMS = [
  { value: "date_and_time", label: "Date and Time" },
  { value: "sevenrooms", label: "SevenRooms" },
  { value: "opentable", label: "OpenTable" },
  { value: "google_reviews", label: "Google Reviews" },
  { value: "resy", label: "Resy" },
] as const;

const PLATFORM_TRIGGERS: Record<TriggerPlatform, { value: string; label: string }[]> = {
  date_and_time: [
      {value: "will_be_time_modal", label: "Should include a calendar"},
  ],
  sevenrooms: [
    { value: "reservation_created", label: "Reservation Created" },
    { value: "reservation_updated", label: "Reservation Updated" },
    { value: "reservation_cancelled", label: "Reservation Cancelled" },
    { value: "guest_checked_in", label: "Guest Checked In" },
  ],
  opentable: [
    { value: "new_booking", label: "New Booking" },
    { value: "booking_modified", label: "Booking Modified" },
    { value: "booking_cancelled", label: "Booking Cancelled" },
    { value: "no_show", label: "No Show" },
  ],
  google_reviews: [
    { value: "new_review", label: "New Review" },
    { value: "review_updated", label: "Review Updated" },
    { value: "review_reply", label: "Review Reply" },
  ],
  resy: [
    { value: "reservation_made", label: "Reservation Made" },
    { value: "reservation_changed", label: "Reservation Changed" },
    { value: "reservation_cancelled", label: "Reservation Cancelled" },
    { value: "waitlist_added", label: "Waitlist Added" },
  ],
};

export function TriggerNode({ id, data, selected }: NodeProps) {
  const nodeData = data as TriggerNodeData;
  const { updateNodeData } = useReactFlow();

  const [platform, setPlatform] = useState<TriggerPlatform | undefined>(nodeData.platform);
  const [trigger, setTrigger] = useState<string | undefined>(nodeData.trigger);

  const handlePlatformChange = (value: string) => {
    const newPlatform = value as TriggerPlatform;
    setPlatform(newPlatform);
    setTrigger(undefined);
    updateNodeData(id, { ...nodeData, platform: newPlatform, trigger: undefined });
  };

  const handleTriggerChange = (value: string) => {
    setTrigger(value);
    updateNodeData(id, { ...nodeData, platform, trigger: value });
  };

  return (
    <div className={`relative flex flex-col gap-3 p-4 bg-gray-100 rounded-lg shadow-md min-w-[200px] ${selected ? "border-3 border-gray-700" : "border-2 border-gray-500"}`}>

      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {nodeData.label}
      </span>

      <Select value={platform} onValueChange={handlePlatformChange}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select platform" />
        </SelectTrigger>
        <SelectContent>
          {PLATFORMS.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {platform && (
        <Select value={trigger} onValueChange={handleTriggerChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select trigger" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM_TRIGGERS[platform].map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
}

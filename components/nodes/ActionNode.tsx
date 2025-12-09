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

export type ActionPlatform = "sevenrooms" | "opentable" | "google_reviews" | "resy" | "email" | "sms";

export type ActionNodeData = {
  label: string;
  platform?: ActionPlatform;
  action?: string;
};

const PLATFORMS = [
  { value: "sevenrooms", label: "SevenRooms" },
  { value: "opentable", label: "OpenTable" },
  { value: "google_reviews", label: "Google Reviews" },
  { value: "resy", label: "Resy" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
] as const;

const PLATFORM_ACTIONS: Record<ActionPlatform, { value: string; label: string }[]> = {
  sevenrooms: [
    { value: "update_reservation", label: "Update Reservation" },
    { value: "send_confirmation", label: "Send Confirmation" },
    { value: "add_note", label: "Add Note" },
    { value: "tag_guest", label: "Tag Guest" },
  ],
  opentable: [
    { value: "confirm_booking", label: "Confirm Booking" },
    { value: "send_reminder", label: "Send Reminder" },
    { value: "update_status", label: "Update Status" },
    { value: "cancel_booking", label: "Cancel Booking" },
  ],
  google_reviews: [
    { value: "reply_to_review", label: "Reply to Review" },
    { value: "flag_review", label: "Flag Review" },
    { value: "generate_response", label: "Generate Response" },
  ],
  resy: [
    { value: "confirm_reservation", label: "Confirm Reservation" },
    { value: "send_sms", label: "Send SMS" },
    { value: "update_guest_profile", label: "Update Guest Profile" },
    { value: "add_to_waitlist", label: "Add to Waitlist" },
  ],
  email: [
    { value: "send_email", label: "Send Email" },
    { value: "send_template", label: "Send Template" },
    { value: "schedule_email", label: "Schedule Email" },
  ],
  sms: [
    { value: "send_sms", label: "Send SMS" },
    { value: "send_template", label: "Send Template" },
    { value: "schedule_sms", label: "Schedule SMS" },
  ],
};

export function ActionNode({ id, data, selected }: NodeProps) {
  const nodeData = data as ActionNodeData;
  const { updateNodeData } = useReactFlow();

  const [platform, setPlatform] = useState<ActionPlatform | undefined>(nodeData.platform);
  const [action, setAction] = useState<string | undefined>(nodeData.action);

  const handlePlatformChange = (value: string) => {
    const newPlatform = value as ActionPlatform;
    setPlatform(newPlatform);
    setAction(undefined);
    updateNodeData(id, { ...nodeData, platform: newPlatform, action: undefined });
  };

  const handleActionChange = (value: string) => {
    setAction(value);
    updateNodeData(id, { ...nodeData, platform, action: value });
  };

  return (
    <div className={`relative flex flex-col gap-3 p-4 bg-gray-100 rounded-lg shadow-md min-w-[200px] ${selected ? "border-3 border-gray-700" : "border-2 border-gray-500"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

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
        <Select value={action} onValueChange={handleActionChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORM_ACTIONS[platform].map((a) => (
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

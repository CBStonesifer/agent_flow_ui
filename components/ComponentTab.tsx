"use client";

import { useState, type DragEvent } from "react";

const menuItems = [
  { id: "trigger", label: "Trigger", icon: "T", nodeType: "trigger" },
  { id: "interaction", label: "Interaction", icon: "I", nodeType: "interaction" },
  { id: "action", label: "Action", icon: "A", nodeType: "action" },
  { id: "logic", label: "Logic", icon: "L", nodeType: "logic" },
  { id: "database", label: "Database", icon: "D", nodeType: "database" },
] as const;

type MenuItemId = (typeof menuItems)[number]["id"];

export function ComponentTab() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<MenuItemId | null>(null);

  const onDragStart = (event: DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData("application/reactflow-type", nodeType);
    event.dataTransfer.setData("application/reactflow-label", label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`fixed left-4 top-24 z-40 flex ${isOpen ? "w-56" : "w-12"}`}
    >
      <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-3 hover:bg-gray-50 border-b border-gray-100"
        >
          <span className="text-sm font-medium text-gray-700">Functions</span>
        </button>

        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onDragStart(e, item.nodeType, item.label)}
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              className={`flex items-center gap-3 p-3 hover:bg-gray-50 text-left cursor-grab active:cursor-grabbing ${
                activeItem === item.id ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && (
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

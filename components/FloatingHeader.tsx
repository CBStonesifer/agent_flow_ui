"use client";

type FloatingHeaderProps = {
  onSaveDraft?: () => void;
  onSaveSubmit?: () => void;
};

export function FloatingHeader({ onSaveDraft, onSaveSubmit }: FloatingHeaderProps) {
  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-end gap-3 bg-white rounded-xl shadow-md px-4 py-3">
      <button
        onClick={onSaveDraft}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        Save Draft
      </button>
      <button
        onClick={onSaveSubmit}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
      >
        Save & Submit
      </button>
    </header>
  );
}

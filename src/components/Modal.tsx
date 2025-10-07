import React from "react";

export default function Modal({
  show,
  onClose,
  message,
}: {
  show: boolean;
  onClose: () => void;
  message: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h5 className="text-lg font-semibold">Notifikasi</h5>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p>{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

import Modal from "react-modal";
import React from "react";

interface PanelProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

export function Panel({ isOpen, close, children }: PanelProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      className="flex justify-center h-full"
    >
      <div className="w-full max-w-lg bg-white text-sm overflow-auto px-2">
        <header className="border-b-2 border-gray-200 mb-3 flex">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-center my-1 flex-auto">
            How to play
          </h2>
          <button type="button" onClick={close}>
            ✖️
          </button>
        </header>
        {children}
      </div>
    </Modal>
  );
}

import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import type { Toast as ToastType } from "../../context/ToastContext";

const icons: Record<ToastType["type"], string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

const styles: Record<ToastType["type"], string> = {
  success:
    "bg-white border-l-4 border-l-success text-text-main shadow-lg",
  error:
    "bg-white border-l-4 border-l-accent text-text-main shadow-lg",
  info: "bg-white border-l-4 border-l-secondary text-text-main shadow-lg",
};

function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastType;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  };

  // Auto-dismiss animation before removal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
    }, 4700); // Start exit animation 300ms before removal
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles[toast.type]} rounded-lg px-4 py-3 flex items-start gap-3 max-w-sm w-full transition-all duration-300 ${
        isVisible && !isLeaving
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3"
      }`}
    >
      <span className="text-lg leading-none mt-0.5">{icons[toast.type]}</span>
      <p className="text-sm flex-1 leading-relaxed">{toast.message}</p>
      <button
        onClick={handleClose}
        className="text-text-light hover:text-text-main transition-colors text-lg leading-none -mt-0.5 cursor-pointer"
        aria-label="Закрыть"
      >
        &times;
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

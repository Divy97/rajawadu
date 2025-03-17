"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}>({
  toasts: [],
  addToast: () => "",
  removeToast: () => {},
  clearAllToasts: () => {},
});

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  const context = React.useContext(ToastProvider);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export function ToastProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-dismiss toast after duration
    if (toast.duration !== 0) {
      const duration = toast.duration || getDurationByType(toast.type);
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastProvider.Provider
      value={{ toasts, addToast, removeToast, clearAllToasts }}
    >
      {children}
      <ToastContainer />
    </ToastProvider.Provider>
  );
}

function getDurationByType(type: Toast["type"]): number {
  switch (type) {
    case "success":
      return 3000;
    case "error":
      return 5000;
    case "warning":
      return 4000;
    case "info":
      return 3000;
    default:
      return 3000;
  }
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const { title, description, type = "info", action, secondaryAction } = toast;

  // Get styling based on toast type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          iconBgColor: "bg-green-100",
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          iconBgColor: "bg-red-100",
        };
      case "warning":
        return {
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          iconColor: "text-amber-600",
          iconBgColor: "bg-amber-100",
        };
      case "info":
      default:
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
          iconBgColor: "bg-blue-100",
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = toastIcons[type];

  return (
    <div
      className={cn(
        "rounded-lg border shadow-sm overflow-hidden animate-in slide-in-from-top-5 fade-in-20",
        styles.borderColor,
        styles.bgColor
      )}
      role="alert"
    >
      <div className="flex p-4">
        <div className={cn("p-2 rounded-full mr-3", styles.iconBgColor)}>
          <Icon className={cn("h-5 w-5", styles.iconColor)} />
        </div>
        <div className="flex-1 pt-1">
          <h3 className="font-serif text-sweet-brown font-medium">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-sweet-brown/70 font-serif">
              {description}
            </p>
          )}

          {(action || secondaryAction) && (
            <div className="flex gap-3 mt-3">
              {action && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    action.onClick();
                    onDismiss();
                  }}
                  className="px-3 py-1.5 text-sm bg-sweet-brown text-white rounded-md hover:bg-sweet-orange transition-colors font-serif"
                >
                  {action.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    secondaryAction.onClick();
                  }}
                  className="px-3 py-1.5 text-sm bg-white border border-sweet-brown/20 text-sweet-brown/80 rounded-md hover:border-sweet-orange/50 hover:text-sweet-orange transition-colors font-serif"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-sweet-brown/40 p-1 hover:text-sweet-brown transition-colors self-start -mt-1 -mr-1"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Icon components
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

const toastIcons: Record<
  Toast["type"],
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  success: CheckIcon,
  error: AlertTriangleIcon,
  warning: AlertIcon,
  info: InfoIcon,
};

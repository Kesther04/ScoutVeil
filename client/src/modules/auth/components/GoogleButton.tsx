import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let scriptPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Couldn't load Google's sign-in script."));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface GoogleButtonProps {
  label: "signin_with" | "signup_with" | "continue_with";
  onCredential: (credential: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

export default function GoogleButton({
  label,
  onCredential,
  onError,
  disabled,
}: GoogleButtonProps) {
  const buttonHostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google || !buttonHostRef.current) return;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => onCredential(response.credential),
        });
        window.google.accounts.id.renderButton(buttonHostRef.current, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          width: buttonHostRef.current.offsetWidth || 360,
          text: label,
        });
        setReady(true);
      })
      .catch((err: Error) => onError?.(err.message));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  if (!GOOGLE_CLIENT_ID) return null;

  return (
    <div className="relative w-full">
      {/* Google's rendered button paints over this host div once ready */}
      <div ref={buttonHostRef} className={`w-full ${disabled ? "pointer-events-none opacity-50" : ""}`} />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/3 text-sm text-[#94A3B8]">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-[#565A72] border-t-transparent animate-spin" />
          Loading Google sign-in…
        </div>
      )}
    </div>
  );
}
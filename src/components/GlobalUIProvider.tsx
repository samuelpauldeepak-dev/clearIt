"use client";

import React from "react";
import { useGlobalUIStore, PopupConfig } from "@/store/use-global-ui-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Video,
} from "lucide-react";

export function GlobalUIProvider({ children }: { children: React.ReactNode }) {
  const { activePopups, closePopup } = useGlobalUIStore();

  const getIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case "error":
        return <XCircle className="h-6 w-6 text-destructive" />;
      case "sparkle":
        return <Sparkles className="h-6 w-6 text-primary" />;
      case "welcome":
        return <Video className="h-6 w-6 text-primary" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <>
      {children}

      {activePopups.map((popup) => {
        const isWelcome = popup.type === "welcome";

        return (
          <Dialog
            key={popup.id}
            open={true}
            onOpenChange={(open: boolean) => !open && closePopup(popup.id)}
          >
            <DialogContent
              className={cn(
                "animate-in fade-in zoom-in duration-300",
                isWelcome
                  ? "sm:max-w-[700px] p-0 overflow-hidden border-none bg-background/80 backdrop-blur-xl shadow-2xl"
                  : "sm:max-w-[425px]",
              )}
            >
              {isWelcome ? (
                <div className="relative">
                  {/* Video Background / Hero */}
                  <div className="relative h-[300px] w-full overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      poster="/welcome-thumbnail.png"
                    >
                      <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-waves-of-blue-and-purple-light-44473-large.mp4"
                        type="video/mp4"
                      />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute top-6 left-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                      <Sparkles className="h-6 w-6 text-white animate-pulse" />
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <DialogTitle className="text-4xl font-black tracking-tight text-foreground">
                        {popup.title}
                      </DialogTitle>
                      <DialogDescription className="text-xl text-muted-foreground leading-relaxed">
                        {popup.message}
                      </DialogDescription>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      {popup.cancelText && (
                        <Button
                          variant="ghost"
                          size="lg"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            popup.onCancel?.();
                            closePopup(popup.id);
                          }}
                        >
                          {popup.cancelText}
                        </Button>
                      )}
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                        onClick={() => {
                          popup.onConfirm?.();
                          closePopup(popup.id);
                        }}
                      >
                        {popup.confirmText || "Let's Begin"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <DialogHeader className="flex flex-row items-center gap-4 text-left">
                    <div className="shrink-0 p-2 rounded-full bg-muted/50">
                      {getIcon(popup.type)}
                    </div>
                    <div className="space-y-1">
                      <DialogTitle className="text-xl font-bold">
                        {popup.title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {popup.message}
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    {popup.cancelText && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          popup.onCancel?.();
                          closePopup(popup.id);
                        }}
                      >
                        {popup.cancelText}
                      </Button>
                    )}
                    <Button
                      className="bg-primary hover:bg-primary/90 font-bold px-6"
                      onClick={() => {
                        popup.onConfirm?.();
                        closePopup(popup.id);
                      }}
                    >
                      {popup.confirmText || "Close"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}

"use client";

import { useEffect } from "react";
import { useGlobalUIStore } from "@/store/use-global-ui-store";

export function WelcomeTrigger() {
  const { showPopup } = useGlobalUIStore();

  useEffect(() => {
    // Show welcome popup
    showPopup({
      id: "welcome-popup",
      title: "Welcome to Utilso!",
      message:
        "Your ultimate toolkit for solving digital problems instantly. Join thousands of users who trust us for their daily file and data challenges.",
      type: "welcome",
      confirmText: "Get Started",
      onConfirm: () => console.log("User started"),
    });
  }, [showPopup]);

  return null;
}

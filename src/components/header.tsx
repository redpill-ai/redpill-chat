import { Menu, Settings2, ShieldCheck } from "lucide-react";
import type { FC } from "react";

import { Button } from "@/components/ui/button";

import type { RightPanel } from "@/types/layout";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  activeRightPanel: RightPanel;
  onToggleSettings: () => void;
  onToggleVerifier: () => void;
}

export const Header: FC<HeaderProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  activeRightPanel,
  onToggleSettings,
  onToggleVerifier,
}) => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-3 py-3 md:px-4 md:py-4">
      <div className="flex items-start justify-between gap-2">
        <div className="pointer-events-auto">
          <Button
            size="icon"
            variant={isSidebarOpen ? "secondary" : "ghost"}
            aria-pressed={isSidebarOpen}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={onToggleSidebar}
          >
            <Menu className="size-4" />
          </Button>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <Button
            size="icon"
            variant={activeRightPanel === "settings" ? "secondary" : "ghost"}
            aria-pressed={activeRightPanel === "settings"}
            aria-label={
              activeRightPanel === "settings"
                ? "Close settings sidebar"
                : "Open settings sidebar"
            }
            onClick={onToggleSettings}
          >
            <Settings2 className="size-4" />
          </Button>
          <Button
            size="icon"
            variant={activeRightPanel === "verifier" ? "secondary" : "ghost"}
            aria-pressed={activeRightPanel === "verifier"}
            aria-label={
              activeRightPanel === "verifier"
                ? "Close verifier sidebar"
                : "Open verifier sidebar"
            }
            onClick={onToggleVerifier}
          >
            <ShieldCheck className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

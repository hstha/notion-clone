"use client";

import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserItem from "./user-item";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { toast } from "sonner";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const [isResetting, setIsResetting] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const create = useMutation(api.documents.create);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (!sidebarRef.current || !navbarRef.current) return;

    sidebarRef.current.style.width = `${newWidth}px`;
    navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    navbarRef.current.style.setProperty("left", `${newWidth}px`);
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = useCallback(() => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(false);
    setIsResetting(true);

    sidebarRef.current.style.width = isMobile ? "100%" : "240px";
    navbarRef.current.style.setProperty(
      "width",
      isMobile ? "0" : `calc(100% - 240px)`,
    );
    navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

    setTimeout(() => setIsResetting(false), 300);
  }, [isMobile]);

  const collapse = useCallback(() => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(true);
    setIsResetting(true);

    sidebarRef.current.style.width = "0";
    navbarRef.current.style.setProperty("width", "100%");
    navbarRef.current.style.setProperty("left", "0");

    setTimeout(() => setIsResetting(false), 300);
  }, []);

  const handleCreate = () => {
    const promise = create({ title: "New Document" });

    toast.promise(promise, {
      loading: "Creating document...",
      success: "Document created",
      error: "Failed to create document",
    });
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth, collapse]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile, collapse]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar flex h-full bg-secondary overflow-y-auto relative w-60 flex-col z-[99999]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <div
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100",
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div>
          <UserItem />

          <Item label="Search" icon={Search} isSearch onClick={() => {}} />

          <Item label="Settings" icon={Settings} onClick={() => {}} />

          <Item onClick={handleCreate} label="New Document" icon={PlusCircle} />
        </div>

        <div className="mt-4">
          <p>Documents</p>
        </div>

        <div
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 to-0"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              role="button"
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;

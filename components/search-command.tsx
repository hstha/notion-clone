"use client";

import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { getIsOpen, getOnClose, getToggle, useSearch } from "@/hooks";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui";
import { File } from "lucide-react";

const SearchCommand = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const documents = useQuery(api.documents.getSearch);

  const toggle = useSearch(getToggle);
  const isOpen = useSearch(getIsOpen);
  const onClose = useSearch(getOnClose);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) return null;
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="h-4 w-4 mr-2" />
              )}

              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;

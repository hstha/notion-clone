"use client";

import { useRouter } from "next/navigation";

import Spinner from "@/components/spinner";
import { Input } from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmModel from "@/components/models/confirm-model";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getArchived);
  const restore = useMutation(api.documents.restore);
  const removeForever = useMutation(api.documents.removeForever);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Failed to restore document",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = removeForever({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted",
      error: "Failed to delete document",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />

        <Input
          placeholder="Filter by page title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>

      <div className="mt-2 px-1 mb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No document found.
        </p>

        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>

            <div className="flex items-center">
              <div
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                role="button"
                onClick={(e) => onRestore(e, document._id)}
              >
                <Undo className="h-4 w-4 text-muted-foreground dark:hover:bg-neutral-600" />
              </div>

              <ConfirmModel onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground dark:hover:bg-neutral-600" />
                </div>
              </ConfirmModel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;

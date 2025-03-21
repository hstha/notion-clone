"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: Props) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Document published",
      error: "Failed to publish document",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Document unpublished",
      error: "Failed to unpublish document",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="h-4 w-4 ml-2 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" alignOffset={8} forceMount className="w-72">
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 text-sky-500 animate-pulse" />

              <p className="text-xs font-medium text-sky-500">
                This document is live on the web.
              </p>
            </div>

            <div className="flex items-center">
              <input
                value={url}
                disabled
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
              />

              <Button
                onClick={onCopy}
                disabled={isSubmitting}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              size="sm"
              onClick={onUnpublish}
              disabled={isSubmitting}
              className="w-full text-xs"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />

            <p className="text-sm font-medium mb-2">Publish this document</p>

            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others
            </span>

            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              size="sm"
              className="w-full text-xs"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;

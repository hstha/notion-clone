"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Button, Skeleton } from "@/components/ui";
import { useCoverImage } from "@/hooks";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";

interface Props {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: Props) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onCoverImageRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }

    const promise = removeCoverImage({
      id: params.documentId as Id<"documents">,
    });

    toast.promise(promise, {
      loading: "Removing cover image...",
      success: "Cover image removed",
      error: "Failed to remove cover image",
    });

    coverImage.onClose();
  };

  const onReplace = async () => {
    if (!url) return;

    coverImage.onReplace(url);
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && <Image src={url} alt="Cover" fill className="object-cover" />}

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={onReplace}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>

          <Button
            onClick={onCoverImageRemove}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = () => {
  return <Skeleton className="h-[12vh] w-full" />;
};

export default Cover;

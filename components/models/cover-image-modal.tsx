"use client";

import {
  getCoverImageIsOpen,
  getCoverImageOnClose,
  useCoverImage,
} from "@/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { getCoverImageUrl } from "@/hooks/use-cover-image";

const CoverImageModal = () => {
  const params = useParams();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coverImageIsOpen = useCoverImage(getCoverImageIsOpen);
  const coverImageOnClose = useCoverImage(getCoverImageOnClose);
  const coverImageUrl = useCoverImage(getCoverImageUrl);

  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);

  const onClose = () => {
    setIsSubmitting(false);
    setFile(undefined);
    coverImageOnClose();
  };

  const onChange = async (file?: File) => {
    if (!file) return;

    setIsSubmitting(true);
    setFile(file);

    const res = await edgestore.publicFiles.upload({
      file,
      options: {
        replaceTargetUrl: coverImageUrl,
      },
    });

    await update({
      id: params.documentId as Id<"documents">,
      coverImage: res.url,
    });

    onClose();
  };

  return (
    <Dialog open={coverImageIsOpen} onOpenChange={coverImageOnClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>

        <SingleImageDropzone
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
          className="w-full outline-none"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;

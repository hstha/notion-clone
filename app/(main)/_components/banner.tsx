"use client";

import { Id } from "@/convex/_generated/dataModel";
import { FC } from "react";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import ConfirmModel from "@/components/models/confirm-model";

type Props = {
  documentId: Id<"documents">;
};

const Banner: FC<Props> = ({ documentId }) => {
  const router = useRouter();
  const archive = useMutation(api.documents.archive);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Page moved to trash",
      error: "Failed to move to trash",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring page...",
      success: "Page restored",
      error: "Failed to restore page",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onRestore}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>

      <ConfirmModel onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModel>
    </div>
  );
};

export default Banner;

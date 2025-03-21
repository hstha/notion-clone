"use client";

import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const DocumentIdPage = () => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return null;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="h-[35vh] border border-red-500" />

        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;

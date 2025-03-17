import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
const variants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
});

interface Props extends VariantProps<typeof variants> {}

const Spinner = ({ size }: Props) => {
  return <Loader2 className={cn(variants({ size }))} />;
};

export default Spinner;

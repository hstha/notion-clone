import { Button } from "@/components/ui";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="flex items-center w-full bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />

      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>

        <Button variant="ghost" size="sm">
          Terms of Service
        </Button>
      </div>
    </div>
  );
};

export default Footer;

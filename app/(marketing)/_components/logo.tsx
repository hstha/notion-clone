import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Image
        className="dark:hidden"
        src="/logo.svg"
        alt="Jotion Logo"
        width={40}
        height={40}
      />
      <Image
        className="hidden dark:block"
        src="/logo-dark.svg"
        alt="Jotion Logo"
        width={40}
        height={40}
      />
      <h1 className={cn("font-semibold", font.className)}>Jotion</h1>
    </div>
  );
};

export default Logo;

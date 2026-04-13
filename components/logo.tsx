import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = Omit<
  React.ComponentProps<typeof Image>,
  "alt" | "src" | "width" | "height"
>;

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <Image
      alt="logo"
      className={cn("size-7", className)}
      src="/images/android-chrome-192x192.png"
      height={28}
      width={28}
      {...props}
    />
  );
};

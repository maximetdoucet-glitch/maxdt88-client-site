import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ShimmerButton } from "./shimmer-button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] grid-cols-6 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // dark styles
      "transform-gpu bg-[#0a0a0a] border border-white/10 [box-shadow:0_-20px_80px_-20px_#ffffff0f_inset]",
      className,
    )}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-[#f4ebd0] transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-bold text-[#f4ebd0]">
        {name}
      </h3>
      <p className="max-w-lg text-[#9ca3af] text-sm md:text-base">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <ShimmerButton 
        shimmerColor="#ffffff"
        shimmerSize="0.05em"
        background="#0a0a0a"
        className="pointer-events-auto text-[#0ea5e9] px-4 py-2 text-sm border-white/5"
        asChild
      >
        <a href={href} className="flex items-center">
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </ShimmerButton>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.03]" />
  </div>
);

export { BentoCard, BentoGrid };

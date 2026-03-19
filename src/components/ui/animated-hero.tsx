"use client"
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Power", "Strength", "Respect", "Potential", "Silence"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="secondary" size="sm" className="gap-4 rounded-full border border-white/10 px-6">
              The Path to Mastery <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl lg:text-8xl max-w-4xl tracking-tighter text-center font-bold">
              <span className="text-[#f4ebd0]">True power is built in</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-purple-500">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-neutral-400 max-w-2xl text-center mx-auto">
              You've felt the spark watching the show. You recognized the drive.
              Now, stop watching history and start building your own foundation. 
              The cheapest, quietest, and most effective way to level up is right at home.
            </p>
          </div>
          <div className="flex flex-row gap-4 mt-8">
            <Button size="lg" className="gap-4 rounded-full border border-white/20" variant="outline">
              The Protocol <MoveRight className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4 rounded-full" variant="glow">
              Get Started for $0 <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };

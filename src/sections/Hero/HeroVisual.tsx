import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Code2, Lock, Megaphone, Palette, ShieldCheck, TrendingUp } from "lucide-react";
import type { PointerEvent } from "react";

import markAsset from "@/assets/secstackhq_mark.png.asset.json";
import { FloatingElement } from "@/components/motion";

const chips = [
  { icon: Code2, label: "Develop", pos: "left-[2%] top-[14%]", delay: 0 },
  { icon: ShieldCheck, label: "Secure", pos: "right-[0%] top-[8%]", delay: 0.8 },
  { icon: TrendingUp, label: "Grow", pos: "right-[4%] bottom-[18%]", delay: 1.6 },
  { icon: Palette, label: "Design", pos: "left-[0%] bottom-[22%]", delay: 2.2 },
  { icon: Megaphone, label: "Social", pos: "left-[38%] bottom-[0%]", delay: 1.1 },
];

/** CSS-3D "secure stack": layered glass plates, orbit rings and floating service chips. */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      className="perspective-1000 relative mx-auto aspect-square w-full max-w-[min(560px,90vw)]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* glow */}
      <div className="bg-gradient-brand animate-pulse-glow absolute inset-[18%] rounded-full opacity-40 blur-3xl" />

      <motion.div className="preserve-3d absolute inset-0" style={{ rotateX: rx, rotateY: ry }}>
        {/* orbit rings */}
        <div className="border-brand-cyan/50 animate-spin-slow absolute inset-[6%] rounded-full border border-dashed" />
        <div className="animate-spin-reverse absolute inset-[14%] rounded-full border-2 border-transparent [border-top-color:var(--brand-violet)] [border-right-color:var(--brand-blue)]">
          <span className="bg-brand-violet shadow-glow absolute -top-1.5 left-1/2 size-3 rounded-full" />
        </div>
        <div className="animate-spin-slow absolute inset-[24%] rounded-full border border-transparent [border-bottom-color:var(--brand-cyan)]">
          <span className="bg-brand-cyan absolute -bottom-1 left-1/3 size-2 rounded-full" />
        </div>

        {/* stacked glass plates */}
        <div className="preserve-3d absolute inset-[26%] [transform:rotateX(58deg)_rotateZ(-45deg)]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="glass border-glow shadow-glow-lg absolute inset-0 rounded-[2rem]"
              style={{ z: i * 46 - 46 }}
              animate={reduce ? { z: i * 46 - 46 } : { z: [i * 46 - 46, i * 46 - 30, i * 46 - 46] }}
              transition={{ duration: 4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="bg-gradient-brand absolute inset-[18%] rounded-2xl"
                style={{ opacity: 0.12 + i * 0.14 }}
              />
            </motion.div>
          ))}
        </div>

        {/* center mark */}
        <div className="absolute inset-0 grid place-items-center [transform:translateZ(170px)_translateY(-4%)]">
          <FloatingElement distance={10}>
            <div className="bg-tile shadow-glow-lg grid size-28 place-items-center rounded-[1.75rem] sm:size-36">
              <img
                src={markAsset.url}
                alt="SecStackHQ emblem"
                width={144}
                height={144}
                className="size-24 object-contain sm:size-32"
              />
            </div>
          </FloatingElement>
        </div>
      </motion.div>

      {/* floating chips */}
      {chips.map((c, i) => (
        <motion.div
          key={c.label}
          className={`absolute ${c.pos}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 200, damping: 16 }}
        >
          <FloatingElement delay={c.delay} duration={5 + i}>
            <div className="glass shadow-depth flex items-center gap-2 rounded-2xl px-3 py-2">
              <span className="bg-gradient-brand text-primary-foreground grid size-8 place-items-center rounded-xl">
                <c.icon className="size-4" />
              </span>
              <span className="hidden pr-1 text-xs font-bold sm:inline">{c.label}</span>
            </div>
          </FloatingElement>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[42%] top-[2%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <FloatingElement delay={0.4} duration={7}>
          <span className="glass text-success flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold">
            <Lock className="size-3" /> 0 breaches
          </span>
        </FloatingElement>
      </motion.div>
    </div>
  );
}

/**
 * AccordionItem
 * -----------------------------------------------------------------------
 * Single expandable FAQ row. Uses AnimatePresence + height:auto animation
 * for the answer reveal — the chevron rotation and border-color shift on
 * the question row give a clear affordance that this is interactive
 * before the user even clicks.
 *
 * PROPS
 * @param {{question, answer}} item
 * @param {boolean} isOpen
 * @param {() => void} onToggle
 * ----------------------------------------------------------------------- */

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export function AccordionItem({ item, isOpen, onToggle }) {
  const { question, answer } = item;

  return (
    <div
      className={cn(
        "rounded-lg border backdrop-blur-glass transition-colors duration-base overflow-hidden",
        isOpen
          ? "bg-glass-fill-hover border-accent-core/30"
          : "bg-glass-fill border-glass-border"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-body font-medium text-text-primary">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-text-secondary"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-5 text-text-secondary font-body text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

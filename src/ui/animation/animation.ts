export const SlideRightVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, delay },
  }),
};

export const BounceScaleAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 260, damping: 15 } 
  },
};

export const SlideUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, delay: custom },
  }),
};

export const FadeAnimation = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 15, delay }
  }),
};

export const SlideLeftVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, delay },
  }),
};

export const FadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
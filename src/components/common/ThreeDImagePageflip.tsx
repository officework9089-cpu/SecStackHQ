import React, { useState, useEffect, useCallback, CSSProperties, forwardRef, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils/calculator";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export interface PageFlipLeaf {
    id?: string | number;
    frontTitle: string;
    backTitle: string;
    frontSubtitle?: string;
    backSubtitle?: string;
    frontBadge?: string;
    backBadge?: string;
}

export interface ThreeDImagePageflipProps {
    /** Array of page leaves, each containing front and back metadata */
    pages?: PageFlipLeaf[];
    /** Default turned page count (0 = start) */
    defaultTurnedIndex?: number;
    /** Controlled turned page count */
    turnedIndex?: number;
    /** Callback fired when page changes */
    onPageChange?: (turnedCount: number, totalSteps: number) => void;
    /** Width of a single page in pixels (default: 230) */
    pageWidth?: number;
    /** Height of a single page in pixels (default: 330) */
    pageHeight?: number;
    /** 3D perspective depth in pixels (default: 1300) */
    perspective?: number;
    /** Maximum hover peek angle in degrees (default: 14) */
    peekAngle?: number;
    /** Total turn angle in degrees (default: 180) */
    turnAngle?: number;
    /** Transition flip animation duration in seconds (default: 0.65) */
    duration?: number;
    /** Easing curve for flip animation */
    easing?: string;
    /** Shadow intensity factor (0.0 to 1.0, default: 0.25) */
    shadowIntensity?: number;
    /** Border radius for pages (default: "12px") */
    radius?: string | number;
    /** Enable page numbering tags (default: true) */
    showPageNumbers?: boolean;
    /** Enable outer book spine binding (default: true) */
    showSpineBinding?: boolean;
    /** Accent glow color for active elements (default: "#2f6bff") */
    accentColor?: string;
    /** Enable automatic page sliding/flipping (default: false) */
    autoplay?: boolean;
    /** Autoplay interval in milliseconds (default: 3500) */
    autoplayInterval?: number;
    /** Pause autoplay on hover (default: true) */
    pauseOnHover?: boolean;
    /** Enable interactive click to flip (default: true) */
    interactive?: boolean;
    /** Enable navigation buttons (default: true) */
    showControls?: boolean;
    /** Optional container class name */
    className?: string;
    /** Optional container inline style */
    style?: CSSProperties;
}

export interface ThreeDImagePageflipHandle {
    next: () => void;
    prev: () => void;
    reset: () => void;
    goTo: (index: number) => void;
    getCurrentStep: () => number;
    getTotalSteps: () => number;
}

export const ThreeDImagePageflip = forwardRef<ThreeDImagePageflipHandle, ThreeDImagePageflipProps>(({
    pages = [],
    defaultTurnedIndex = 0,
    turnedIndex: controlledTurnedIndex,
    onPageChange,
    pageWidth = 230,
    pageHeight = 330,
    perspective = 1300,
    peekAngle = 14,
    turnAngle = 180,
    duration = 0.65,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    shadowIntensity = 0.25,
    radius = "12px",
    showPageNumbers = true,
    showSpineBinding = true,
    accentColor = "#2f6bff",
    autoplay = false,
    autoplayInterval = 3500,
    pauseOnHover = true,
    interactive = true,
    showControls = true,
    className,
    style,
}, ref) => {
    const [internalStep, setInternalStep] = useState<number>(defaultTurnedIndex);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [peekingIndex, setPeekingIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Touch gesture tracking refs for smooth mobile swiping
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Detect mobile screen width on mount & resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Flatten all pages for mobile (1, 2, 3...) vs desktop leaves (0 to pages.length)
    const mobilePages = React.useMemo(() => {
        const list: { id: string; title: string; subtitle?: string | undefined; badge?: string | undefined; pageNum: number }[] = [];
        pages.forEach((leaf, idx) => {
            list.push({
                id: `leaf-${idx}-front`,
                title: leaf.frontTitle,
                subtitle: leaf.frontSubtitle,
                badge: leaf.frontBadge,
                pageNum: idx * 2 + 1,
            });
            list.push({
                id: `leaf-${idx}-back`,
                title: leaf.backTitle,
                subtitle: leaf.backSubtitle,
                badge: leaf.backBadge,
                pageNum: idx * 2 + 2,
            });
        });
        return list;
    }, [pages]);

    const totalSteps = isMobile ? mobilePages.length : pages.length;
    const currentStep = controlledTurnedIndex !== undefined ? controlledTurnedIndex : internalStep;

    const setStep = useCallback((newStep: number) => {
        const clamped = Math.max(0, Math.min(newStep, totalSteps));
        if (controlledTurnedIndex === undefined) {
            setInternalStep(clamped);
        }
        if (onPageChange) {
            onPageChange(clamped, totalSteps);
        }
    }, [controlledTurnedIndex, totalSteps, onPageChange]);

    const goNext = useCallback(() => {
        const maxLimit = isMobile ? totalSteps - 1 : totalSteps;
        if (currentStep < maxLimit) {
            setStep(currentStep + 1);
        }
    }, [currentStep, totalSteps, isMobile, setStep]);

    const goPrev = useCallback(() => {
        if (currentStep > 0) {
            setStep(currentStep - 1);
        }
    }, [currentStep, setStep]);

    const resetDeck = useCallback(() => {
        setStep(0);
    }, [setStep]);

    useImperativeHandle(ref, () => ({
        next: goNext,
        prev: goPrev,
        reset: resetDeck,
        goTo: (idx) => setStep(idx),
        getCurrentStep: () => currentStep,
        getTotalSteps: () => totalSteps,
    }));

    useEffect(() => {
        if (!autoplay || (pauseOnHover && isHovered) || totalSteps <= 1) return;
        const maxLimit = isMobile ? totalSteps - 1 : totalSteps;
        const timer = setInterval(() => {
            setInternalStep((prev) => (prev >= maxLimit ? 0 : prev + 1));
        }, autoplayInterval);
        return () => clearInterval(timer);
    }, [autoplay, autoplayInterval, pauseOnHover, isHovered, totalSteps, isMobile]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    // Touch swipe handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0]?.clientX ?? null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0]?.clientX ?? null;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 40;

        if (distance > minSwipeDistance) {
            goNext();
        } else if (distance < -minSwipeDistance) {
            goPrev();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const parsedRadius = typeof radius === "number" ? `${radius}px` : radius;

    // Editorial Page Renderer
    const renderPageContent = (
        title: string,
        subtitle?: string,
        badge?: string,
        pageNumber?: number
    ) => (
        <div className="relative flex flex-col h-full px-5 py-5 sm:px-7 sm:py-6 bg-[#fffefa] text-[#292929] overflow-hidden select-none w-full h-full border border-slate-200/80 shadow-sm">
            <div
                className="absolute -top-20 -right-20 size-36 rounded-full blur-[65px] opacity-20 pointer-events-none"
                style={{ backgroundColor: accentColor }}
            />
            <div className="relative flex items-center justify-between pb-2 border-b border-[#e8e5df]">
                <span className="text-[8px] font-semibold tracking-[0.16em] uppercase text-slate-400">
                    SecStackHQ
                </span>
                {badge && (
                    <span className="text-[8px] uppercase tracking-wider font-medium text-slate-500">
                        {badge}
                    </span>
                )}
            </div>
            <div className="relative flex-1 pt-4 pb-3 overflow-hidden">
                <h3 className="text-[15px] sm:text-[17px] font-bold font-['Georgia'] leading-snug tracking-tight text-[#242424] mb-3">
                    {title}
                </h3>
                <div
                    className="w-7 h-[2px] rounded-full mb-3"
                    style={{ backgroundColor: accentColor }}
                />
                {subtitle && (
                    <div className="text-[10px] sm:text-[11px] leading-[1.75] text-[#55524d] font-['Georgia'] font-normal text-justify whitespace-pre-line break-words">
                        {subtitle}
                    </div>
                )}
            </div>
            <div className="relative flex items-center justify-between pt-2 border-t border-[#e8e5df]">
                <span className="text-[8px] text-slate-400 tracking-wide font-medium">
                    SecStackHQ Advantage
                </span>
                {showPageNumbers && pageNumber !== undefined && (
                    <span className="text-[9px] font-['Georgia'] text-slate-500">
                        {pageNumber}
                    </span>
                )}
            </div>
        </div>
    );

    // --- MOBILE VIEW RENDERING (Single Page Sequence Mode: 1, 2, 3...) ---
    if (isMobile) {
        const currentPage = mobilePages[currentStep] ?? mobilePages[0] ?? {
            id: "empty-page",
            title: "",
            subtitle: undefined,
            badge: undefined,
            pageNum: 0,
        };

        return (
            <div
                className={cn("w-full flex flex-col items-center justify-center select-none py-4 overflow-hidden", className)}
                style={style}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="relative flex items-center justify-center shadow-xl overflow-hidden transition-all duration-300"
                    style={{
                        width: `${Math.min(pageWidth, window.innerWidth - 48)}px`,
                        height: `${pageHeight}px`,
                        borderRadius: parsedRadius,
                    }}
                    onClick={() => interactive && goNext()}
                >
                    {renderPageContent(currentPage.title, currentPage.subtitle, currentPage.badge, currentPage.pageNum)}
                </div>

                <div className="mt-3 text-[11px] text-muted-foreground font-medium tracking-wide">
                    Swipe or tap to change page ({currentStep + 1} / {totalSteps})
                </div>

                {showControls && (
                    <div className="flex items-center justify-center gap-3 mt-4 select-none">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={currentStep === 0}
                            aria-label="Previous Page"
                            className="px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            <span>Prev</span>
                        </button>

                        <button
                            type="button"
                            onClick={resetDeck}
                            disabled={currentStep === 0}
                            aria-label="Reset"
                            className="px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                        </button>


                        <button
                            type="button"
                            onClick={goNext}
                            disabled={currentStep === totalSteps - 1}
                            aria-label="Next Page"
                            className="px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // --- DESKTOP VIEW RENDERING (3D Spread Book Mode) ---
    const totalLeaves = pages.length;
    const isAtStart = currentStep === 0;
    const isAtEnd = currentStep === totalLeaves;

    const handleLeafClick = (index: number) => {
        if (!interactive) return;
        if (index === currentStep) {
            goNext();
        } else if (index === currentStep - 1) {
            goPrev();
        }
    };

    let bookTranslateX = "0px";
    if (!isAtStart && !isAtEnd) {
        bookTranslateX = `${pageWidth / 2}px`;
    } else if (isAtEnd) {
        bookTranslateX = `${pageWidth}px`;
    }

    return (
        <div
            className={cn("w-full flex flex-col items-center justify-center select-none py-6 overflow-x-hidden", className)}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setPeekingIndex(null);
            }}
        >
            <div
                className="relative flex items-center justify-center transition-all duration-500 max-w-full overflow-visible"
                style={{
                    perspective: `${perspective}px`,
                    width: `${pageWidth * 2 + 40}px`,
                    height: `${pageHeight + 40}px`,
                }}
            >
                <div
                    className="relative transition-transform"
                    style={{
                        width: `${pageWidth}px`,
                        height: `${pageHeight}px`,
                        transformStyle: "preserve-3d",
                        transition: `transform ${duration}s ${easing}`,
                        transform: `translateX(${bookTranslateX})`,
                    }}
                >
                    {showSpineBinding && (
                        <div
                            className="absolute top-0 bottom-0 left-[-4px] w-[8px] rounded-l-sm bg-gradient-to-r from-slate-300 via-white to-slate-200 shadow-md z-30 pointer-events-none"
                            style={{
                                opacity: !isAtStart ? 0.95 : 0.6,
                                transition: `opacity ${duration}s ease`,
                            }}
                        />
                    )}

                    <div
                        className="absolute -bottom-6 left-[-15%] w-[130%] h-8 bg-blue-300/30 rounded-full blur-2xl pointer-events-none transition-all duration-500"
                        style={{
                            opacity: !isAtStart ? 0.7 : 0.4,
                            transform: !isAtStart ? "scale(1.15)" : "scale(0.85)",
                        }}
                    />

                    {pages.map((leaf, index) => {
                        const isTurned = index < currentStep;
                        const isCanPeek = index === currentStep;
                        const isPeeking = peekingIndex === index;

                        const zIndex = isTurned ? index + 1 : totalLeaves - index;

                        let leafRotation = isTurned ? -turnAngle : 0;
                        if (!isTurned && isPeeking) {
                            leafRotation = -peekAngle;
                        }

                        return (
                            <div
                                key={leaf.id ?? index}
                                onClick={() => handleLeafClick(index)}
                                onMouseEnter={() => {
                                    if (isCanPeek) setPeekingIndex(index);
                                }}
                                onMouseLeave={() => {
                                    if (peekingIndex === index) setPeekingIndex(null);
                                }}
                                className={cn(
                                    "absolute inset-0 origin-left",
                                    interactive ? "cursor-pointer" : "pointer-events-none"
                                )}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transition: `transform ${duration}s ${easing}`,
                                    transform: `rotateY(${leafRotation}deg)`,
                                    zIndex,
                                    borderRadius: parsedRadius,
                                }}
                            >
                                {/* Front Side */}
                                <div
                                    className="absolute inset-0 w-full h-full overflow-hidden bg-[#fffefa]"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        borderRadius: parsedRadius,
                                        boxShadow: `0 12px 28px rgba(0, 0, 0, ${shadowIntensity})`,
                                    }}
                                >
                                    {renderPageContent(leaf.frontTitle, leaf.frontSubtitle, leaf.frontBadge, index * 2 + 1)}
                                </div>

                                {/* Back Side */}
                                <div
                                    className="absolute inset-0 w-full h-full overflow-hidden bg-[#fffefa]"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        borderRadius: parsedRadius,
                                        boxShadow: `0 12px 28px rgba(0, 0, 0, ${shadowIntensity})`,
                                    }}
                                >
                                    {renderPageContent(leaf.backTitle, leaf.backSubtitle, leaf.backBadge, index * 2 + 2)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showControls && (
                <div className="flex items-center justify-center gap-3 mt-6 select-none">
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={currentStep === 0}
                        aria-label="Previous Page"
                        className="px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev</span>
                    </button>

                    <button
                        type="button"
                        onClick={resetDeck}
                        disabled={currentStep === 0}
                        aria-label="Reset Book"
                        className="px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                    </button>

                    <div className="px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-mono text-muted-foreground shadow-xs">
                        <span className="font-bold text-foreground">{currentStep}</span>
                        <span className="opacity-50"> / </span>
                        <span>{totalLeaves} leaves</span>
                    </div>

                    <button
                        type="button"
                        onClick={goNext}
                        disabled={currentStep === totalLeaves}
                        aria-label="Next Page"
                        className="px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs cursor-pointer"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
});

ThreeDImagePageflip.displayName = "ThreeDImagePageflip";

export default ThreeDImagePageflip;
export default function FloatingAssistant() {
  return (
    <button aria-label="Ask AI Assistant" className="fixed bottom-24 md:bottom-8 right-8 z-50 w-16 h-16 bg-surface-container-lowest border-4 border-primary rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-surface-variant transition-all active:scale-95 flex items-center justify-center cursor-pointer group">
      <span className="material-symbols-outlined font-headline-lg text-headline-lg text-primary group-hover:scale-110 transition-transform font-bold">smart_toy</span>
      {/* Notification dot */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-surface-container-lowest animate-pulse"></span>
    </button>
  );
}

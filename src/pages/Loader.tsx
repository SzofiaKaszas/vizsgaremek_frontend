export function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className="w-12 h-12 border-4 rounded-full animate-spin"
        style={{
          borderColor: "var(--color-accent)",
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
}
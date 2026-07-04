// Full-screen or inline loading spinner
export default function Loader({ fullScreen = false }) {
  const inner = (
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 rounded-full border-4 border-stone-200 border-t-primary-600 animate-spin" />
      <p className="text-sm text-stone-400">Loading…</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {inner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{inner}</div>;
}

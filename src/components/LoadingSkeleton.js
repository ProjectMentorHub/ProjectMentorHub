const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white border border-black/10 overflow-hidden">
          <div className="aspect-video skeleton" />
          <div className="p-6 space-y-4">
            <div className="h-6 skeleton rounded" />
            <div className="h-4 skeleton rounded w-2/3" />
            <div className="h-4 skeleton rounded w-1/2" />
            <div className="h-10 skeleton rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;


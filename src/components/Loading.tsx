const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden">
        {/* Top */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 animate-slide-down"></div>
        {/* Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-500 animate-slide-up"></div>
      </div>
    </div>
  );
};

export default Loading;

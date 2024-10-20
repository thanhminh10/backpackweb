import React from "react";

const Loading: React.FC = React.memo(() => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div role="status" aria-label="Loading">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;

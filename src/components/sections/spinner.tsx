import { Loader } from "lucide-react";
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Spinner;

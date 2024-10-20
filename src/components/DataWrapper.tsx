import Loading from "@/components/loading/Loading";
import React from "react";

interface DataWrapperProps<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  children: (data: T) => React.ReactNode;
}

const DataWrapper = <T,>({
  data,
  loading,
  error,
  children,
}: DataWrapperProps<T>) => {
  if (loading) return <Loading />;
  if (error) return <p>{`Error: ${error.message}`}</p>;
  if (!data) return <p>No data available</p>;
  return <>{children(data)}</>;
};

export default DataWrapper;

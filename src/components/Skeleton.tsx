export const Skeleton = ({ height = "1rem", width = "100%" }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded"
    style={{ height, width }}
  />
);

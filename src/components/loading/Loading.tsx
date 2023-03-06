export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 py-5"></div>
      <p className="my-5">Loading...</p>
    </div>
  );
}

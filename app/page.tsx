import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Booking Widget</h1>
        <p className="text-gray-500 mb-6">Industry-specific embeddable booking widgets for trade businesses</p>
        <Link
          href="/preview"
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
        >
          Open Widget Preview
        </Link>
      </div>
    </div>
  );
}

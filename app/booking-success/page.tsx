"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-6">
          Your reservation has been confirmed and payment received. You&apos;ll receive a confirmation email shortly.
        </p>

        {sessionId && (
          <p className="text-xs text-gray-400 mb-6 font-mono">
            Ref: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/portal"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            <Calendar className="h-4 w-4" /> View My Bookings
          </Link>
          <button
            onClick={() => window.close()}
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            Close <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}

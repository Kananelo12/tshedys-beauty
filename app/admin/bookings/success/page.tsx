import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const isAccepted = status === 'accepted';
  const isRejected = status === 'rejected';

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className={`text-6xl mb-4 ${isAccepted ? 'text-green-500' : isRejected ? 'text-red-500' : 'text-pink-500'}`}>
          {isAccepted ? '✅' : isRejected ? '❌' : '📋'}
        </div>
        <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">
          {isAccepted ? 'Booking Accepted' : isRejected ? 'Booking Rejected' : 'Action Completed'}
        </h1>
        <p className="text-gray-600 mb-6">
          {isAccepted
            ? 'The booking has been confirmed and the client has been notified via email.'
            : isRejected
            ? 'The booking has been declined and the client has been notified via email.'
            : 'The booking action has been processed successfully.'
          }
        </p>
        <div className="space-y-3">
          <Link
            href="/admin/bookings"
            className="block w-full bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            View All Bookings
          </Link>
          <Link
            href="/admin"
            className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
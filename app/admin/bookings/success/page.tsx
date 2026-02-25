import Link from "next/link";
import { CheckCircle, XCircle, ClipboardCheck } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const isAccepted = status === 'accepted';
  const isRejected = status === 'rejected';

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4">
      <div className="bg-white border border-[#EEECEA] rounded-2xl p-8 max-w-lg w-full text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isAccepted ? 'bg-emerald-50' : isRejected ? 'bg-[#F5F4F2]' : 'bg-[#F5F4F2]'
        }`}>
          {isAccepted
            ? <CheckCircle className="text-emerald-500" size={32} />
            : isRejected
            ? <XCircle className="text-foreground/30" size={32} />
            : <ClipboardCheck className="text-foreground/40" size={28} />
          }
        </div>
        <h1 className="text-2xl font-serif font-medium text-foreground mb-1">
          {isAccepted ? 'Booking Accepted' : isRejected ? 'Booking Rejected' : 'Action Completed'}
        </h1>
        <p className="text-sm text-foreground/40 mb-8">
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
            className="block w-full bg-foreground hover:bg-foreground/90 text-white px-5 py-3 rounded-xl font-medium transition-colors text-sm"
          >
            View All Bookings
          </Link>
          <Link
            href="/admin"
            className="block w-full bg-[#F5F4F2] hover:bg-[#EEECEA] border border-[#EEECEA] text-foreground/60 px-5 py-3 rounded-xl font-medium transition-colors text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'



export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')



const session = await stripe.checkout.sessions.retrieve(session_id, {
  expand: ["line_items", "payment_intent"],
});

const {
  status,
  customer_details: { email: customerEmail },
} = session;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    _id: session.metadata.hiringId,
    lawyerId: session.metadata.lawyerId,
    userEmail: session.metadata.userEmail,
    lawyerEmail: session.metadata.lawyerEmail,
    consultationFee: session.amount_total / 100,
    transactionId: session.payment_intent.id,
  }),
});
    return (
      <section id="success" className='py-30 flex justify-center items-center'>
        <p className='font-bold text-3xl'>
         Successful Payment
        </p>
      </section>
    )
  }
}
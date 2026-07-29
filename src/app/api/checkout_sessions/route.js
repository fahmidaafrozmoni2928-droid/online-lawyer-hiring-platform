import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req) {
  try {
      
    const headersList = await headers();
    const origin = headersList.get('origin');
     //const user = await req.json;
    const body = await req.json();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: body.userEmail,
          payment_method_types: ["card"],
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        //  price: '{{PRICE_ID}}',
        price_data: {
            currency: "usd",
            unit_amount: Number(body.consultationFee) * 100,
            
            product_data: {
                name: body.lawyerName,
            },
        },
          quantity: 1,
        },
      ],

      metadata: {
        hiringId: body.hiringId,
        lawyerId: body.lawyerId,
        userEmail: body.userEmail,
        paymentType: "lawyer-hiring",
      },
      mode: 'payment',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
     // integration_identifier: '{{INTEGRATION_ID}}',
    });
console.log("Type:", typeof body.consultationFee);
    console.log(session);
   // return NextResponse.redirect(session.url, 303)
     return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  try {
    if (!stripeSecret) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    const { currency, amount, recurring, donor, options } = await req.json()

    const mode: Stripe.Checkout.SessionCreateParams.Mode = recurring ? 'subscription' : 'payment'

    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = recurring ? {
      currency: (currency || 'usd').toLowerCase(),
      product_data: { name: options?.projectName ? `Donation to ${options.projectName}` : 'Donation' },
      recurring: { interval: 'month' },
      unit_amount: amount
    } : {
      currency: (currency || 'usd').toLowerCase(),
      product_data: { name: options?.projectName ? `Donation to ${options.projectName}` : 'Donation' },
      unit_amount: amount
    }

    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin}/donate/success`
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin}/donate/cancel`

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      customer_email: donor?.email,
      line_items: [{ price_data: priceData, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        projectName: options?.projectName || '',
        publicSupporter: options?.publicSupporter ? 'yes' : 'no',
        restricted: options?.restricted ? 'yes' : 'no',
        donorName: donor?.name || ''
      }
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: any) {
    console.error('Stripe checkout error', err)
    return NextResponse.json({ error: err?.message || 'Checkout failed' }, { status: 400 })
  }
}



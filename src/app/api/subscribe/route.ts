import { NextRequest, NextResponse } from 'next/server';

interface Subscriber {
  name: string;
  email: string;
  subscribedAt: string;
}

// In-memory store — resets on server restart, no DB needed
const subscribers: Subscriber[] = [];

export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name  = typeof body.name  === 'string' ? body.name.trim()  : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const alreadyExists = subscribers.some(
    (s) => s.email.toLowerCase() === email.toLowerCase()
  );

  if (alreadyExists) {
    return NextResponse.json(
      { error: 'This email is already subscribed.' },
      { status: 409 }
    );
  }

  subscribers.push({ name, email: email.toLowerCase(), subscribedAt: new Date().toISOString() });

  return NextResponse.json(
    { success: true, message: "You're in the loop! See you on May 11th." },
    { status: 201 }
  );
}

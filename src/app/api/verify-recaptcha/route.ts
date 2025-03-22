import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, message: "Token is missing" }, { status: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    return NextResponse.json({ success: false, message: "Invalid reCAPTCHA" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Verified successfully" });
}

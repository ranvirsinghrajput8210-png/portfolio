export async function onRequestPost(context) {
  try {
    // Get form data
    const formData = await context.request.formData();

    const firstName = formData.get("first_name") || "";
    const lastName = formData.get("last_name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const business = formData.get("business") || "";
    const interest = formData.get("interest") || "";
    const message = formData.get("message") || "";

    // Validation
    if (!firstName || !email || !message) {
      return new Response(JSON.stringify({
        ok: false,
        error: "Required fields missing"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Email HTML
    const htmlContent = `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business:</strong> ${business}</p>
      <p><strong>Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    // Send email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer re_ayQrba11_EYNRKkGBT4X6wRzMsXK5VKjQ",   // 👈 PUT YOUR RESEND KEY HERE
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["ssslspaceage@gmail.com"],
        subject: `New Contact from ${firstName}`,
        html: htmlContent
      })
    });

    const resultText = await resendResponse.text();

    if (!resendResponse.ok) {
      return new Response(JSON.stringify({
        ok: false,
        error: resultText
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Email sent successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

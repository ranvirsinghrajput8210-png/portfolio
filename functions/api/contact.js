export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const firstName = formData.get("first_name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    if (!firstName || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.re_ayQrba11_EYNRKkGBT4X6wRzMsXK5VKjQ}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["ssslspaceage@gmail.com"],
        subject: `New Contact from ${firstName}`,
        html: `
          <h2>New Contact Form</h2>
          <p><b>Name:</b> ${firstName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br/>${message}</p>
        `
      })
    });

    const text = await res.text();

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: text }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

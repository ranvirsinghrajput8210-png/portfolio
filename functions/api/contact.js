export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const firstName = formData.get("first_name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!firstName || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "ssslspaceage@gmail.com", name: "Sukriti" }]
          }
        ],
        from: {
          email: "sw20@om-nanotech.com",
          name: "Portfolio Contact"
        },
        reply_to: {
          email: email,
          name: firstName
        },
        subject: "New Portfolio Contact",
        content: [
          {
            type: "text/plain",
            value: `Name: ${firstName}\nEmail: ${email}\nMessage: ${message}`
          }
        ]
      })
    });

    if (res.status !== 202) {
      const text = await res.text();
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

export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const firstName = formData.get('first_name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!firstName || !email) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          { to: [{ email: "ssslspaceage@gmail.com", name: "Sukriti" }] }
        ],
        from: {
          email: "noreply@mailchannels.net",
          name: "Portfolio Contact"
        },
        subject: `New Contact from ${firstName}`,
        content: [
          {
            type: "text/plain",
            value: `Message: ${message}\nEmail: ${email}`
          }
        ]
      })
    });

    const text = await res.text();

    if (res.status !== 202) {
      return new Response(JSON.stringify({ error: text }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const firstName = formData.get('first_name') || '';
    const lastName  = formData.get('last_name') || '';
    const email     = formData.get('email') || '';
    const phone     = formData.get('phone') || '';
    const business  = formData.get('business') || '';
    const interest  = formData.get('interest') || '';
    const message   = formData.get('message') || '';

    if (!firstName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const mailRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: 'ssslspaceage@gmail.com', name: 'Sukriti' }] }],
        from: { email: 'noreply@mailchannels.net', name: 'Portfolio Website' },
        reply_to: { email, name: `${firstName} ${lastName}` },
        subject: `New Contact: ${firstName}`,
        content: [{ type: 'text/plain', value: message }]
      }),
    });

    if (mailRes.status !== 202) {
      const err = await mailRes.text();
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

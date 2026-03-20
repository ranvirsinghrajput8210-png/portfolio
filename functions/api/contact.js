export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const firstName  = formData.get('first_name') || '';
    const lastName   = formData.get('last_name')  || '';
    const email      = formData.get('email')       || '';
    const phone      = formData.get('phone')       || '';
    const business   = formData.get('business')    || '';
    const interest   = formData.get('interest')    || '';
    const message    = formData.get('message')     || '';

    if (!firstName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = [
      `Name:     ${firstName} ${lastName}`,
      `Email:    ${email}`,
      `Phone:    ${phone || '—'}`,
      `Business: ${business || '—'}`,
      `Interest: ${interest || '—'}`,
      ``,
      `Message:`,
      message || '—',
    ].join('\n');

    const mailRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          { 
            to: [
              { 
                email: 'ssslspaceage@gmail.com', 
                name: 'Sukriti Khosla' 
              }
            ] 
          }
        ],
        from: { 
          email: 'noreply@43d30a33.portfolio-3y0.pages.dev', 
          name: 'Sukriti Website' 
        },
        reply_to: { 
          email: email, 
          name: `${firstName} ${lastName}` 
        },
        subject: `New Contact from ${firstName} ${lastName}${interest ? ' — ' + interest : ''}`,
        content: [
          { 
            type: 'text/plain', 
            value: body 
          }
        ],
      }),
    });

    if (!mailRes.ok && mailRes.status !== 202) {
      const err = await mailRes.text();
      console.error('MailChannels error:', err);
      return new Response(JSON.stringify({ error: 'Failed to send email.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact function error:', err);
    return new Response(JSON.stringify({ error: 'Server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

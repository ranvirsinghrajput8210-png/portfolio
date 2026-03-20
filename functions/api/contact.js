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

    // Validate required fields
    if (!firstName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build email body
    const body = [
      `New Contact Form Submission`,
      ``,
      `Name:     ${firstName} ${lastName}`,
      `Email:    ${email}`,
      `Phone:    ${phone || '—'}`,
      `Business: ${business || '—'}`,
      `Service Interest: ${interest || '—'}`,
      ``,
      `Message:`,
      message || '—',
    ].join('\n');

    // Send email via MailChannels
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
          email: 'noreply@portfolio-3y0.pages.dev', 
          name: 'Sukriti Website Contact Form' 
        },
        reply_to: { 
          email: email, 
          name: `${firstName} ${lastName}` 
        },
        subject: `New Contact: ${firstName} ${lastName}${interest ? ' — ' + interest : ''}`,
        content: [
          { 
            type: 'text/plain', 
            value: body 
          }
        ],
      }),
    });

    // Check if email sent successfully
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

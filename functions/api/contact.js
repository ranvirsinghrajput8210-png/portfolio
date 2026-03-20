export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const firstName = formData.get("first_name") || "";
    const lastName = formData.get("last_name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const business = formData.get("business") || "";
    const interest = formData.get("interest") || "";
    const message = formData.get("message") || "";

    if (!firstName || !email) {
      return new Response(JSON.stringify({
        ok: false,
        error: "Missing required fields"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const mailBody = `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Business: ${business}
Interest: ${interest}

Message:
${message}
`;

    const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: "ssslspaceage@gmail.com",
                name: "Sukriti Khosla"
              }
            ]
          }
        ],
        from: {
          email: "noreply@mailchannels.net",
          name: "Portfolio Contact Form"
        },
        reply_to: {
          email: email,
          name: `${firstName} ${lastName}`
        },
        subject: `New Contact: ${firstName} ${lastName}`,
        content: [
          {
            type: "text/plain",
            value: mailBody
          }
        ]
      })
    });

    const responseText = await mailResponse.text();

    if (mailResponse.status !== 202) {
      console.log("MAILCHANNEL ERROR:", responseText);

      return new Response(JSON.stringify({
        ok: false,
        error: "Mail sending failed",
        details: responseText
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Mail sent successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.log("FUNCTION ERROR:", err);

    return new Response(JSON.stringify({
      ok: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

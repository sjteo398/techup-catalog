import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    const { name, company, email, phone, subject, message } = data;

    const toEmail = env.RECIPIENT_EMAIL || env.ADMIN_EMAIL || "sales@techup.example";
    const fromEmail = env.SENDER_EMAIL || "noreply@techup.example";

    let emailBody = `New Contact Form Inquiry Received via Website\n`;
    emailBody += `==============================================\n\n`;
    emailBody += `Name: ${name || "N/A"}\n`;
    emailBody += `Company: ${company || "N/A"}\n`;
    emailBody += `Email: ${email || "N/A"}\n`;
    emailBody += `Phone: ${phone || "N/A"}\n`;
    emailBody += `Subject: ${subject || "General Inquiry"}\n\n`;
    emailBody += `Message:\n${message || "N/A"}\n`;

    if (env.EMAIL) {
      const emailMessage = new EmailMessage(
        fromEmail,
        toEmail,
        emailBody
      );
      await env.EMAIL.send(emailMessage);
    } else {
      console.log("Contact Inquiry logged (Cloudflare Email binding not attached):", emailBody);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message submitted successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      }
    );
  }
}

import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    const { name, company, email, phone, subject, message } = data;

    // Verified destination address in Cloudflare Email Routing (from screenshot: atsolutionsmy@gmail.com)
    const toEmail = env.RECIPIENT_EMAIL || env.ADMIN_EMAIL || "atsolutionsmy@gmail.com";
    const fromEmail = env.SENDER_EMAIL || "noreply@quartzar.com.my";
    const replyTo = email ? `"${name || company || 'Inquirer'}" <${email}>` : null;

    let emailBody = `New Contact Form Inquiry Received via Website\n`;
    emailBody += `==============================================\n\n`;
    emailBody += `Name: ${name || "N/A"}\n`;
    emailBody += `Company: ${company || "N/A"}\n`;
    emailBody += `Email: ${email || "N/A"}\n`;
    emailBody += `Phone: ${phone || "N/A"}\n`;
    emailBody += `Subject: ${subject || "General Inquiry"}\n\n`;
    emailBody += `Message:\n${message || "N/A"}\n`;

    const emailBinding = env.EMAIL || env.SELECTION;
    if (emailBinding) {
      try {
        const mailSubject = subject || `New Contact Inquiry from ${name || company || "Website User"}`;
        let mimeMessage = `From: Quartzar Contact <${fromEmail}>\r\n`;
        mimeMessage += `To: <${toEmail}>\r\n`;
        if (replyTo) {
          mimeMessage += `Reply-To: ${replyTo}\r\n`;
        }
        mimeMessage += `Subject: ${mailSubject}\r\n`;
        mimeMessage += `Content-Type: text/plain; charset=utf-8\r\n\r\n`;
        mimeMessage += emailBody;

        const emailMessage = new EmailMessage(fromEmail, toEmail, mimeMessage);
        await emailBinding.send(emailMessage);
        console.log("Contact Email sent via Cloudflare Email Routing to:", toEmail);
        return new Response(
          JSON.stringify({ success: true, message: "Message submitted successfully!" }),
          { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      } catch (sendErr) {
        console.error("Error sending Contact email via binding:", sendErr);
        return new Response(
          JSON.stringify({
            success: false,
            message: `Cloudflare Email Error: ${sendErr.message || String(sendErr)}`,
            hint: "Check if fromEmail is an address on your domain and toEmail is a verified destination in Cloudflare Email Routing."
          }),
          { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }
    } else {
      console.log("Contact Inquiry logged (Cloudflare Email binding not attached):", emailBody);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Cloudflare Email binding (EMAIL) is not attached to this Pages project.",
          hint: "Go to Workers & Pages -> techup-catalog -> Settings -> Functions -> Email Routing Bindings and add binding named EMAIL."
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
}

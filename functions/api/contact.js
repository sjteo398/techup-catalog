import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    const { name, company, email, phone, subject, message } = data;

    // Verified destination address required by Cloudflare SendEmail API
    const toEmail = env.RECIPIENT_EMAIL || env.ADMIN_EMAIL || "atsolutionsmy@gmail.com";
    const customDomainAddress = "sjteo@quartzar.com.my";
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

    const mailSubject = subject || `New Contact Inquiry from ${name || company || "Website User"}`;

    let mimeMessage = `From: Quartzar Contact <${fromEmail}>\r\n`;
    mimeMessage += `To: <${customDomainAddress}>\r\n`;
    if (replyTo) {
      mimeMessage += `Reply-To: ${replyTo}\r\n`;
    }
    mimeMessage += `Subject: ${mailSubject}\r\n`;
    mimeMessage += `Content-Type: text/plain; charset=utf-8\r\n\r\n`;
    mimeMessage += emailBody;

    const emailBinding = env.EMAIL || env.SELECTION;
    const serviceBinding = env.EMAIL_SERVICE || env.EMAIL_WORKER;

    if (emailBinding && typeof emailBinding.send === 'function') {
      try {
        const emailMessage = new EmailMessage(fromEmail, toEmail, mimeMessage);
        await emailBinding.send(emailMessage);
        console.log("Contact Email sent via direct Cloudflare Email binding to:", toEmail);
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
    } else if (serviceBinding && typeof serviceBinding.fetch === 'function') {
      try {
        const workerPayload = {
          to: toEmail,
          toEmail: toEmail,
          recipient: toEmail,
          from: fromEmail,
          fromEmail: fromEmail,
          sender: fromEmail,
          subject: mailSubject,
          text: mimeMessage,
          body: mimeMessage,
          message: mimeMessage,
          mime: mimeMessage,
          mimeMessage: mimeMessage,
          raw: mimeMessage,
          rawEmail: mimeMessage,
          content: mimeMessage,
          plainText: emailBody,
          replyTo: email,
          ...data
        };

        const workerRes = await serviceBinding.fetch("https://email-worker/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(workerPayload)
        });

        const resText = await workerRes.text();
        console.log("email-worker response:", workerRes.status, resText);

        if (workerRes.ok) {
          return new Response(
            JSON.stringify({ success: true, message: "Message submitted successfully!", detail: resText }),
            { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
          );
        } else {
          return new Response(
            JSON.stringify({
              success: false,
              message: `email-worker returned HTTP ${workerRes.status}: ${resText}`
            }),
            { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
          );
        }
      } catch (workerErr) {
        console.error("Error invoking email-worker Service Binding:", workerErr);
        return new Response(
          JSON.stringify({ success: false, message: `Worker invocation error: ${workerErr.message}` }),
          { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }
    } else {
      console.log("Contact Inquiry logged (No email binding attached):", emailBody);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Neither EMAIL binding nor EMAIL_SERVICE binding attached.",
          hint: "Ensure EMAIL_SERVICE binding points to email-worker in Pages Settings -> Bindings."
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

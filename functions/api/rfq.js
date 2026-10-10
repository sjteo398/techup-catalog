import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    const { company, contact_name, email, phone, country, delivery_location, timeline, target_price, message, items } = data;

    const toEmail = env.RECIPIENT_EMAIL || env.ADMIN_EMAIL || "atsolutionsmy@gmail.com";
    const fromEmail = env.SENDER_EMAIL || "noreply@quartzar.com.my";
    const replyTo = email ? `"${contact_name || company || 'Customer'}" <${email}>` : null;

    let emailBody = `New RFQ Quote Request Received via Website\n`;
    emailBody += `==============================================\n\n`;
    emailBody += `Company: ${company || "N/A"}\n`;
    emailBody += `Contact Name: ${contact_name || "N/A"}\n`;
    emailBody += `Email: ${email || "N/A"}\n`;
    emailBody += `Phone: ${phone || "N/A"}\n`;
    emailBody += `Country: ${country || "N/A"}\n`;
    emailBody += `Delivery Location: ${delivery_location || "N/A"}\n`;
    emailBody += `Timeline: ${timeline || "N/A"}\n`;
    emailBody += `Target Price: ${target_price || "N/A"}\n\n`;
    
    emailBody += `Line Items:\n`;
    if (Array.isArray(items) && items.length > 0) {
      items.forEach((item, index) => {
        emailBody += `${index + 1}. Model: ${item.model} | Qty: ${item.quantity || 1}${item.note ? ` | Note: ${item.note}` : ""}\n`;
      });
    } else {
      emailBody += `No line items specified.\n`;
    }

    if (message) {
      emailBody += `\nAdditional Message:\n${message}\n`;
    }

    const subject = `New RFQ Quote Request from ${company || contact_name || "Website Buyer"}`;

    let mimeMessage = `From: Quartzar RFQ <${fromEmail}>\r\n`;
    mimeMessage += `To: <${toEmail}>\r\n`;
    if (replyTo) {
      mimeMessage += `Reply-To: ${replyTo}\r\n`;
    }
    mimeMessage += `Subject: ${subject}\r\n`;
    mimeMessage += `Content-Type: text/plain; charset=utf-8\r\n\r\n`;
    mimeMessage += emailBody;

    const emailBinding = env.EMAIL || env.SELECTION;
    const serviceBinding = env.EMAIL_SERVICE || env.EMAIL_WORKER;

    if (emailBinding && typeof emailBinding.send === 'function') {
      try {
        const emailMessage = new EmailMessage(fromEmail, toEmail, mimeMessage);
        await emailBinding.send(emailMessage);
        console.log("RFQ Email sent via direct Cloudflare Email binding to:", toEmail);
        return new Response(
          JSON.stringify({ success: true, message: "Quote request submitted successfully!" }),
          { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      } catch (sendErr) {
        console.error("Error sending RFQ email via binding:", sendErr);
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
          subject: subject,
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
            JSON.stringify({ success: true, message: "Quote request submitted successfully!", detail: resText }),
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
      console.log("RFQ Submission logged (No email binding attached):", emailBody);
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

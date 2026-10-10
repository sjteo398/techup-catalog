import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    const { company, contact_name, email, phone, country, delivery_location, timeline, target_price, message, items } = data;

    // Email recipient configured in Cloudflare Pages Environment Variables or default
    const toEmail = env.RECIPIENT_EMAIL || env.ADMIN_EMAIL || "sjteo@quartzar.com.my";
    const fromEmail = env.SENDER_EMAIL || "noreply@quartzar.com.my";

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

    // Check if Cloudflare Email Routing binding (env.EMAIL or env.SELECTION) is active
    const emailBinding = env.EMAIL || env.SELECTION;
    if (emailBinding) {
      try {
        const subject = `New RFQ Quote Request from ${company || contact_name || "Website Buyer"}`;
        let mimeMessage = `From: Quartzar RFQ <${fromEmail}>\r\n`;
        mimeMessage += `To: <${toEmail}>\r\n`;
        mimeMessage += `Subject: ${subject}\r\n`;
        mimeMessage += `Content-Type: text/plain; charset=utf-8\r\n\r\n`;
        mimeMessage += emailBody;

        const emailMessage = new EmailMessage(fromEmail, toEmail, mimeMessage);
        await emailBinding.send(emailMessage);
        console.log("RFQ Email sent via Cloudflare Email Routing to:", toEmail);
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
    } else {
      console.log("RFQ Submission logged (Cloudflare Email binding not attached):", emailBody);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Cloudflare Email binding (EMAIL) is not attached to this Pages project.",
          hint: "Go to Workers & Pages -> techup-catalog -> Settings -> Functions -> Email Routing Bindings and add binding named EMAIL."
        }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Quote request submitted successfully!" }),
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

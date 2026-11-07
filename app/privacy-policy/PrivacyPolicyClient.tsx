"use client";

import InfoPage from "../../components/InfoPage";

export default function PrivacyPolicyClient() {
  return (
    <InfoPage title="Privacy Policy" intro="This policy explains how information is handled when you browse my walks and guides or contact me through the Prowalk Tours website.">
      <p className="text-sm">Last updated: November 7, 2026.</p>

      <section>
        <h2>Information you send me</h2>
        <p>When you use my contact or licensing form, I receive your name, email address, message, and topic if you select one. If you email me directly, I also receive any attachments or details you include. I use this information to reply, discuss your request, and manage licensing or other business correspondence. Sending a message does not subscribe you to a marketing list.</p>
        <p>Formspree processes form submissions and delivers notifications to my Google Workspace email. These providers may process technical information for delivery, security, and spam prevention. Please do not include passwords, payment details, or other sensitive information in a message.</p>
      </section>

      <section>
        <h2>Browsing, search, and hosting</h2>
        <p>Vercel hosts this website. Hosting and security services may process your IP address, browser and device information, requested page, referring page, and request time to deliver the site, troubleshoot problems, and prevent abuse.</p>
        <p>Search terms and filters appear in the page address, so they may appear in your browser history and server logs. You do not need a Prowalk Tours account to browse the website.</p>
      </section>

      <section>
        <h2>Website analytics</h2>
        <p>I use Vercel Web Analytics to understand which pages people visit, where visitors come from, and which browsers and devices they use. These aggregate statistics help me improve the walks and guides on the site. Vercel Web Analytics does not use cookies to identify visitors, and its visitor identifiers expire after 24 hours.</p>
        <p>I remove query parameters and page fragments from page addresses before sending them to analytics, so your search text is not included in those addresses. Contact form names, email addresses, and messages are not sent as analytics events. You can read more about <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Vercel Web Analytics and privacy</a>.</p>
      </section>

      <section>
        <h2>Videos, maps, and other services</h2>
        <p>Some pages connect to outside services to display content. Those services receive technical request information, such as your IP address and browser information. Some connections happen when a page loads, before you play a video.</p>
        <ul>
          <li><strong>YouTube / Google:</strong> video players, thumbnails, and Google My Maps route maps. YouTube may process viewing information, use cookies, and show advertising.</li>
          <li><strong>Bunny.net:</strong> video highlights and clips. Video delivery involves requests to Bunny.net and its delivery network, which may process technical and playback information.</li>
          <li><strong>Mapbox:</strong> interactive maps and their tiles, styles, and fonts. If you use a map’s location button, your browser asks permission to access your location. You can decline or revoke that permission. The website does not send your precise location to a Prowalk Tours database.</li>
          <li><strong>QR Server / goQR:</strong> route QR-code images. Requests include the public route link encoded in the image and technical request information.</li>
        </ul>
        <p>You can read the providers’ policies here: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a>, <a href="https://bunny.net/privacy/" target="_blank" rel="noreferrer">Bunny.net</a>, <a href="https://www.mapbox.com/legal/privacy" target="_blank" rel="noreferrer">Mapbox</a>, <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel</a>, <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">Formspree</a>, and <a href="https://goqr.me/privacy-safety-security/" target="_blank" rel="noreferrer">QR Server / goQR</a>.</p>
      </section>

      <section>
        <h2>Cookies and external links</h2>
        <p>Embedded services may use cookies, local storage, or similar technologies under their own policies, including to collect activity across websites. The website currently does not block all embedded services pending a cookie choice and does not change their loading in response to a browser’s Do Not Track signal.</p>
        <p>You can manage cookies and permissions in your browser and adjust privacy preferences with those providers. Blocking third-party content may affect videos and maps.</p>
        <p>Links to Amazon, YouTube, social networks, and other websites take you to services with their own privacy policies. Some shopping links are affiliate links; the retailer may use cookies or similar technology to attribute a purchase, and I may earn a commission.</p>
      </section>

      <section>
        <h2>How information is used and kept</h2>
        <p>I use information to respond to you, provide the website, arrange requested services, and maintain business records. Information may be handled by the hosting, form, email, video, and map services described above, or disclosed when necessary to comply with law or protect rights and security.</p>
        <p>How long records are needed depends on the request, any resulting agreement, and applicable recordkeeping or legal obligations. Provider logs, backups, and copies are also subject to the providers’ retention practices. You can contact me to request deletion of information you have sent me.</p>
        <p>Service providers may process information in the United States and other countries. No website or email service can guarantee complete security.</p>
      </section>

      <section>
        <h2>Your choices and privacy requests</h2>
        <p>To ask about your information or request access, correction, or deletion, email <a href="mailto:info@prowalktours.com?subject=Website%20privacy%20request">info@prowalktours.com</a>. I may need to verify your identity before providing or changing records. Some information may need to be retained for legal obligations or existing agreements.</p>
        <p>Depending on the law that applies to you, you may also have rights to receive a copy of your information, object to or restrict its use, withdraw consent where processing relies on it, or complain to a privacy regulator. Requests about your Google, Amazon, or other third-party accounts should go directly to those providers.</p>
      </section>

      <section>
        <h2>Children and policy updates</h2>
        <p>This website is for a general audience and is not directed at children under 13. If you believe a child has sent personal information through the site, please contact me so I can investigate and arrange appropriate removal.</p>
        <p>I will update this page when the website’s practices change and revise the date above. Where required, I will provide additional notice of material changes.</p>
      </section>
    </InfoPage>
  );
}

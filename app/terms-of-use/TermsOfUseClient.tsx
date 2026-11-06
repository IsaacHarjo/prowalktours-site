"use client";

import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function TermsOfUseClient() {
  return (
    <InfoPage title="Terms of Use" intro="These terms explain how you can use the Prowalk Tours website, my walking tours, and the information in my guides.">
      <p className="text-sm">Last updated: November 6, 2026.</p>
      <section>
        <h2>Watching and exploring</h2>
        <p>You are welcome to browse my guides, use the suggested routes to plan your own visits, and watch my tours through the available players for personal, noncommercial viewing. You can share links to the pages and videos.</p>
        <p>Video availability, picture quality, captions, and playback features may vary by device, connection, and platform. Some linked YouTube videos require a YouTube membership.</p>
      </section>
      <section>
        <h2>Copyright and footage licensing</h2>
        <p>Videos, photographs, audio, writing, and other material belong to Prowalk Tours or their respective rights holders. Viewing the website does not give you permission to copy, reupload, sell, edit, redistribute, or publicly display that material, except where applicable law or an express license permits it.</p>
        <p>For use in a production, advertisement, business display, or other project, <Link href="/licensing">contact me about licensing footage</Link>. A separate written license sets out the permitted use. Sending an inquiry or receiving a quote does not itself grant a license. Nothing here limits uses permitted by law without permission.</p>
      </section>
      <section>
        <h2>Travel guides and suggested routes</h2>
        <p>My videos show places as they were when I filmed them. Market dates, opening hours, prices, transport, access, and local conditions can change. Check the organizer’s or destination’s current information before making plans.</p>
        <p>Maps and suggested walking routes are planning aids, not live navigation or a guarantee that a route is open, accessible, or suitable for everyone. Follow local signs and rules, and choose a route that suits your needs and the conditions on the day.</p>
      </section>
      <section>
        <h2>Outside services and shopping links</h2>
        <p>The website uses services including YouTube, Bunny.net, Google My Maps, and Mapbox to show videos and maps. Links may also take you to retailers and other independent websites. Their own terms and privacy policies apply to their services.</p>
        <p>Some gear links are affiliate links, which means I may earn a commission from qualifying purchases. Product prices, availability, orders, returns, and warranties are handled by the retailer. A gear recommendation is not a guarantee that a product will meet your particular needs.</p>
      </section>
      <section>
        <h2>Messages and responsible use</h2>
        <p>The contact and licensing forms send your message through Formspree. You can also email me directly. Please send only information you have permission to share, and avoid including sensitive or confidential material in an initial inquiry. The <Link href="/privacy-policy">Privacy Policy</Link> explains how messages and website information are handled.</p>
        <p>Do not use the website to send spam or malicious material, impersonate someone, bypass access restrictions, or disrupt the website or its visitors.</p>
      </section>
      <section>
        <h2>Availability and changes</h2>
        <p>I may update or remove content and features. I cannot promise uninterrupted access or that every guide remains complete and current. Nothing in these terms excludes rights or responsibilities that cannot legally be excluded.</p>
        <p>Changes to these terms will appear on this page with an updated date. Any separate written licensing or partnership agreement governs the matters it covers.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>For questions about these terms, footage rights, or a concern about material on the website, email <a href="mailto:info@prowalktours.com">info@prowalktours.com</a>. Please include the relevant page or video link so I can review it.</p>
      </section>
    </InfoPage>
  );
}

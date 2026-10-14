"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function ContactClient() {
  return <InfoPage title="Contact Us" intro="Have a question about a walk, a destination suggestion, or an idea for working together? I’d like to hear from you.">
    <section><h2>General inquiries</h2><p>Include the tour title or link if your message is about a specific video. Please avoid sending sensitive personal information.</p><p><a href="mailto:info@prowalktours.com?subject=Prowalk%20Tours%20inquiry">Email Prowalk Tours</a></p></section>
    <section><h2>Licensing, press, and partnerships</h2><p>Visit <Link href="/licensing">footage licensing</Link> to prepare your request, or <Link href="/press">Press &amp; Partnerships</Link> for media coverage, distribution, and collaboration information.</p></section>
    <section id="roku"><h2>ProWalk Tours on Roku</h2><p>The Prowalk Tours Roku application is in development. It is planned to launch with free walking tours and no ProWalk Tours viewer account requirement.</p><p><a href="mailto:roku@prowalktours.com?subject=ProWalk%20Tours%20Roku%20inquiry">Email Roku support</a></p><p>The <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms-of-use">Terms of Use</Link> are available as review drafts while the app’s technical setup is being decided.</p></section>
    <section><h2>Sending a message</h2><p>Email links open your email application. You choose whether to send the message there; opening a link does not send it. The <Link href="/privacy-policy">draft Privacy Policy</Link> explains how inquiries and website services are handled.</p></section>
  </InfoPage>;
}

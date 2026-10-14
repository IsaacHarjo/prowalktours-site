"use client";
import InfoPage from "../../components/InfoPage";

export default function SupportClient() {
  return <InfoPage title="Support the Walks" intro="Thank you for helping me keep making these walks. Watching, sharing a video, and telling me what a place means to you all make a difference.">
    <section><h2>YouTube membership</h2><p>Visit the channel’s membership page for current options and benefits.</p><p><a href="https://www.youtube.com/channel/UCNzul4dnciIlDg8BAcn5-cQ/join" target="_blank" rel="noreferrer">Explore YouTube membership</a></p></section>
    <section><h2>Patreon</h2><p>Choose a support level and review the current benefits on Patreon.</p><p><a href="https://www.patreon.com/Prowalks" target="_blank" rel="noreferrer">Support on Patreon</a></p></section>
    <section><h2>One-time support</h2><p>You can make a one-time contribution through PayPal.</p><p><a href="https://www.paypal.me/Prowalks" target="_blank" rel="noreferrer">Support through PayPal</a></p></section>
    <p>Payments and memberships are handled by those services under their own terms and privacy policies. Supporting the YouTube channel or Patreon does not purchase footage rights or a future Roku subscription.</p>
  </InfoPage>;
}

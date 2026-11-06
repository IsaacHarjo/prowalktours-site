"use client";
import GearPage, { GearTile } from "../../components/GearPage";
export default function CamerasClient() {
  return <GearPage title="Cameras & setups" intro="Choose a setup to browse my recommendations on Amazon.">
    <nav aria-label="Camera setups" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <GearTile href="https://www.amazon.com/shop/prowalktours/list/1L6PQUTCQN71B" image="/images/gear/sony-current-rig.png" title="Sony A7S III" alt="My Sony camera and stabilizer" />
      <GearTile href="https://www.amazon.com/shop/prowalktours/list/3RYG94PM51ET" image="/images/gear/insta360-setup.jpg" title="Insta360" alt="My Insta360 camera setup" />
      <GearTile href="https://www.amazon.com/shop/prowalktours/list/2TUO3LFZMZBJC" image="/images/gear/pocket-setup.jpg" title="Osmo Pocket" alt="My Osmo Pocket setup" />
      <a href="https://www.amazon.com/shop/prowalktours/list/1SMWPJAVO33WX" target="_blank" rel="sponsored noopener noreferrer" className="flex flex-col justify-center rounded-2xl border border-[#dce2d9] bg-[#e9eee7] p-8 hover:border-[#315d49]"><h2 className="text-2xl font-semibold">Phone filming</h2><span className="mt-6 font-semibold text-[#26634e]">Browse my phone gear on Amazon ↗</span></a>
      <GearTile href="https://www.amazon.com/shop/prowalktours/list/1C8ESGJAKQ2ZJ" image="/images/gear/action-setup.jpg" title="Action cameras" alt="My action camera and stabilizer" />
      <a href="https://www.amazon.com/shop/prowalktours/list/3PQ8ILZ53X6MG" target="_blank" rel="sponsored noopener noreferrer" className="flex flex-col justify-center rounded-2xl border border-[#dce2d9] bg-[#e9eee7] p-8 hover:border-[#315d49]">
        <h2 className="text-2xl font-semibold">Drone filming</h2><p className="mt-3 leading-7 text-[#56665d]">I use the DJI Mini 5 Pro.</p><span className="mt-6 font-semibold text-[#26634e]">Browse my drone gear on Amazon ↗</span>
      </a>
    </nav>
  </GearPage>;
}

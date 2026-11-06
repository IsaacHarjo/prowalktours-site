"use client";
import GearPage, { GearTile } from "../../components/GearPage";
export default function MicrophonesClient() {
  return <GearPage title="Microphones & audio" intro="Browse my microphones and recording gear.">
    <div className="grid max-w-xl">
      <GearTile href="https://www.amazon.com/shop/prowalktours/list/GF1VB6YYCD55" image="/images/gear/audio-category.png" title="Browse audio gear on Amazon ↗" alt="Zoom H1essential audio recorder" />
    </div>
    <section className="border-t border-[#dce2d9] pt-6">
      <h2 className="text-xl font-semibold">My binaural microphones</h2>
      <p className="mt-2 text-[#56665d]">These are available directly from Sound Professionals.</p>
      <ul className="mt-4 space-y-3 text-[#26634e]">
        <li><a href="https://soundprofessionals.com/product/ms-ehb-2-mkii/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">MS-EHB-2-MKII ear-mounted microphones ↗</a></li>
        <li><a href="https://soundprofessionals.com/product/sp-spsb-10-13004/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">SP-SPSB-10 microphone power supply ↗</a></li>
      </ul>
    </section>
  </GearPage>;
}

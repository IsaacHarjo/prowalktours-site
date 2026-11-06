"use client";
import GearPage, { GearTile } from "../../components/GearPage";
export default function TravelAccessoriesClient() {
  return <GearPage title="Travel accessories" intro="Browse the accessories I use or recommend for my filming trips.">
    <div className="grid max-w-xl">
      <GearTile href="https://www.amazon.com/shop/prowalktours/list/19K176LZAC8TD" image="/images/gear/travel-adapters.jpg" title="Browse travel accessories on Amazon ↗" alt="Travel power adapters" />
    </div>
  </GearPage>;
}

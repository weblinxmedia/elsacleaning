import { LocationData } from './locationsConfig'
import FloatingSvg from './FloatingSvg'
import AnimateIn from '../AnimateIn'

interface MapSectionProps {
  location: LocationData
}

export default function MapSection({ location }: MapSectionProps) {
  return (
    <AnimateIn>
    <div className="relative w-full map-size h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-xl group">
      {/* Google Map Embed */}
      <iframe
        key={location.id} // Key forces re-render/refresh on location change
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
        className="w-full h-full"
      ></iframe>

      {/* Floating Rotating SVG */}
      <FloatingSvg />
    </div></AnimateIn>
  )
}
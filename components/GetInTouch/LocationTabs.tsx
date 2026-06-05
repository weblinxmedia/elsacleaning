import { LocationData } from './locationsConfig'

interface LocationTabsProps {
  locations: LocationData[]
  activeId: string
  onSelect: (id: string) => void
}

export default function LocationTabs({ locations, activeId, onSelect }: LocationTabsProps) {
  return (
    <div className="relative md:absolute -top-7 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center gap-4">
      {locations.map((loc) => (
        <button
          key={loc.id}
          onClick={() => onSelect(loc.id)}
          className={`px-8 py-3.5 rounded-full outline-0 cursor-pointer font-regular text-sm font-parkinsans tracking-wider transition-all duration-300 ${
            activeId === loc.id
              ? 'bg-luxury-pink-soft text-black border-1 border-luxury-pink'
              : 'bg-white text-black hover:border-luxury-pink hover:border-1 hover:bg-luxury-pink-soft'
          }`}
        >
          {loc.name}
        </button>
      ))}
    </div>
  )
}
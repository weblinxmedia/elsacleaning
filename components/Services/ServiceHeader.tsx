export default function ServiceHeader({ title }: { title: string }) {
  // Format the title (e.g., "window-cleaning" -> "Window Cleaning")
  const formattedTitle = title.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto  px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-parkinsans font-normal text-luxury-dark leading-tight capitalize">
          {formattedTitle}
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4 font-outfit font-light">
          Get a free quote from Trusted Cleaning Services
        </p>
      </div>
    </section>
  )
}
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
      <h1 className="text-8xl font-bold text-luxury-pink mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-luxury-dark mb-4">Page Not Found</h2>
      <p className="text-gray-500 text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-luxury-dark text-white font-semibold uppercase tracking-wider rounded-md hover:bg-luxury-pink transition-colors"
      >
        Go Back Home
      </Link>
    </section>
  )
}
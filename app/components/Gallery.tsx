export default function Gallery() {
  const urls = ['/hero.webp','/hero.webp','/hero.webp','/hero.webp','/hero.webp','/hero.webp'];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif font-semibold text-gray-900">Our Photo Gallery</h3>
          <p className="text-gray-600">Moments of style and care from our salon.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {urls.map((src, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <img src={src} alt={`gallery-${i}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogList() {
  const posts = [
    { title: 'Healing Touch: Natural Spa Remedies', excerpt: 'Simple rituals to restore balance and glow.' },
    { title: 'Beauty from Within', excerpt: 'Nourish skin through lifestyle and care.' },
    { title: 'Top 5 Hair Trends', excerpt: 'What to try this season at your next appointment.' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif font-semibold">Latest News from Our Blog</h3>
          <p className="text-gray-600">Tips, trends and stories from our salon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="bg-cream-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-2">{p.title}</h4>
              <p className="text-gray-600 text-sm">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  icon?: string;
}

export default function ServiceCard({ title, description, price, duration, icon }: ServiceCardProps) {
  return (
    <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800 card-hover group">
      {/* Icon/Image placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mb-4 group-hover:shadow-gold-glow transition-all duration-300">
        <span className="text-2xl">{icon || '✨'}</span>
      </div>

      {/* Service Info */}
      <h3 className="text-xl font-semibold text-gold-500 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

      {/* Price & Duration */}
      <div className="flex justify-between items-center pt-4 border-t border-charcoal-800">
        <div>
          <p className="text-xs text-gray-500">From</p>
          <p className="text-lg font-bold text-gold-500">{price}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-sm text-gray-300">{duration}</p>
        </div>
      </div>
    </div>
  );
}

import { Wand2, Clock, Palette, DollarSign, Image, Zap } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Staging',
    description: 'Advanced AI technology creates photorealistic furniture and décor that perfectly fits your space.',
  },
  {
    icon: Clock,
    title: '24-Hour Delivery',
    description: 'Get your professionally staged images back within 24 hours, not weeks like traditional staging.',
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description: 'Choose from modern, traditional, minimalist, luxury, and more design styles to match your target market.',
  },
  {
    icon: DollarSign,
    title: 'Cost Effective',
    description: 'Save thousands compared to physical staging. No furniture rental, no moving costs, no hassle.',
  },
  {
    icon: Image,
    title: 'Unlimited Revisions',
    description: 'Not satisfied? We offer unlimited revisions until you get the perfect staged image.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Upload your photos and see instant previews. Perfect for last-minute listings.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            Why Choose Virtual Staging?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how virtual staging can transform your real estate business with cutting-edge technology and professional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { TrendingUp, Home, Users, Calendar } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    stat: '73%',
    label: 'Faster Sales',
    description: 'Staged homes sell 73% faster than non-staged properties',
  },
  {
    icon: Home,
    stat: '20%',
    label: 'Higher Price',
    description: 'Virtual staging can increase sale price by up to 20%',
  },
  {
    icon: Users,
    stat: '90%',
    label: 'More Engagement',
    description: 'Staged listings receive 90% more online views',
  },
  {
    icon: Calendar,
    stat: '97%',
    label: 'Less Time',
    description: 'Reduce time on market by an average of 97% compared to vacant listings',
  },
];

const comparisons = [
  { feature: 'Cost per room', traditional: '$2,000 - $4,000', virtual: '$50 - $150' },
  { feature: 'Setup time', traditional: '2-3 weeks', virtual: '24 hours' },
  { feature: 'Flexibility', traditional: 'Limited', virtual: 'Unlimited styles' },
  { feature: 'Duration', traditional: '3-6 months contract', virtual: 'Forever' },
  { feature: 'Changes', traditional: 'Expensive', virtual: 'Free revisions' },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            Proven Results That Matter
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Virtual staging delivers real, measurable results for real estate professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl text-blue-600 mb-2">{benefit.stat}</div>
              <div className="text-gray-900 mb-2">{benefit.label}</div>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl p-8 md:p-12">
          <h3 className="text-white text-center mb-8">
            Virtual vs Traditional Staging
          </h3>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-blue-900 text-white p-4">
                <div>Feature</div>
                <div className="text-center">Traditional</div>
                <div className="text-center">Virtual</div>
              </div>
              {comparisons.map((comparison, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 p-4 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="text-gray-900">{comparison.feature}</div>
                  <div className="text-center text-gray-600">{comparison.traditional}</div>
                  <div className="text-center text-blue-600">{comparison.virtual}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

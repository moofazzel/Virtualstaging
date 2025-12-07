import { useState } from 'react';

const examples = [
  {
    before: 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    after: 'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdGFnZWQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NjY5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Modern Living Room',
  },
  {
    before: 'https://images.unsplash.com/photo-1689880154884-ec680d38b7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhbnQlMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwODY2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    after: 'https://images.unsplash.com/photo-1583221742001-9ad88bf233ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXNoZWQlMjBiZWRyb29tfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Luxury Bedroom',
  },
  {
    before: 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    after: 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Elegant Dining Room',
  },
];

export function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            See the Transformation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of virtual staging with real examples from our portfolio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
            <img
              src={showAfter ? examples[activeIndex].after : examples[activeIndex].before}
              alt={examples[activeIndex].title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm">{showAfter ? 'After' : 'Before'}</span>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowAfter(!showAfter)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAfter ? 'Show Before' : 'Show After'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setShowAfter(false);
                }}
                className={`relative rounded-lg overflow-hidden ${
                  activeIndex === index ? 'ring-4 ring-blue-600' : ''
                }`}
              >
                <img
                  src={example.before}
                  alt={example.title}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-sm">{example.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

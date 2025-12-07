import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does virtual staging work?',
    answer: 'Simply upload photos of your empty rooms, select your preferred design style, and our AI-powered platform will add photorealistic furniture and décor. You\'ll receive professional staged images within 24 hours.',
  },
  {
    question: 'What types of properties can you stage?',
    answer: 'We can stage any type of residential property including apartments, condos, houses, townhomes, and luxury estates. We work with living rooms, bedrooms, dining rooms, home offices, and outdoor spaces.',
  },
  {
    question: 'How much does virtual staging cost?',
    answer: 'Our pricing starts at $29 per image. We offer volume discounts for multiple rooms and monthly subscription plans for real estate professionals. All packages include unlimited revisions.',
  },
  {
    question: 'Can I request changes to the staged images?',
    answer: 'Absolutely! We offer unlimited revisions until you\'re completely satisfied with the results. You can request different furniture styles, colors, or layouts at no additional cost.',
  },
  {
    question: 'How realistic do the images look?',
    answer: 'Our AI technology creates photorealistic images that are virtually indistinguishable from traditionally staged properties. The furniture, lighting, and shadows are rendered to match the original photo perfectly.',
  },
  {
    question: 'Do I need to disclose that images are virtually staged?',
    answer: 'Yes, according to NAR guidelines and MLS rules, you must disclose that images are virtually staged. We recommend adding a small watermark or text overlay indicating virtual staging.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about virtual staging
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

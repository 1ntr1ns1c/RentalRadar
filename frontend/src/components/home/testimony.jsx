<section className="bg-gray-100 py-16">
  <div className="max-w-6xl mx-auto text-center px-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: 'Jane M.',
          quote: 'RentalRadar helped me find a great apartment in 2 days!',
          image: '/users/jane.jpg',
        },
        {
          name: 'Mark O.',
          quote: 'As a landlord, it’s the easiest tool I’ve ever used.',
          image: '/users/mark.jpg',
        },
        {
          name: 'Fatima A.',
          quote: 'The support team is super responsive and helpful!',
          image: '/users/fatima.jpg',
        },
      ].map((t, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-6 text-left">
          <img src={t.image} className="w-12 h-12 rounded-full mb-4" alt={t.name} />
          <p className="text-gray-600 italic">“{t.quote}”</p>
          <p className="mt-4 font-semibold text-blue-600">{t.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

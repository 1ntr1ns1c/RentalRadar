export default function FeaturesSection() {
  const features = [
    {
      title: "Easy Search",
      description:
        "Find properties that match your criteria with our advanced search filters.",
      color: "indigo",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      ),
    },
    {
      title: "Verified Listings",
      description:
        "All properties are verified by our team to ensure quality and accuracy.",
      color: "green",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our round-the-clock customer support.",
      color: "red",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block text-sm uppercase font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
          Why Choose Us
        </span>
        <h2 className="text-4xl font-bold text-gray-800 mt-6">
          Full-Funnel Rental Intelligence
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Discover what makes RentalRadar the smart choice for your rental journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 max-w-7xl mx-auto">
        {features.map(({ title, description, icon, color }, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow">
            <div
              className={`bg-${color}-100 text-${color}-500 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl mx-auto`}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {icon}
              </svg>
            </div>
            <h3
              className={`uppercase text-${color}-500 font-semibold mt-6 mb-3 text-center`}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-600 text-center">{description}</p>
            <div className="mt-4 text-center">
              <a
                href="/"
                className={`text-${color}-500 hover:text-${color}-600 font-medium flex items-center justify-center gap-1`}
              >
                More about us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

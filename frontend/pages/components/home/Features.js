const featuresData = [
  {
    title: "Book Selection",
    description:
      "Browse a diverse collection of books across genres, ensuring a wide range of reading options for every taste.",
  },
  {
    title: "Effortless Ordering",
    description:
      "Enjoy a convenient online shopping experience with easy book selection, secure payment options, and doorstep delivery.",
  },
  {
    title: "Personalized Recommendations",
    description:
      "Receive tailored book suggestions based on your preferences, making your online book shopping more engaging and enjoyable.",
  },
  
];

function Features() {
  return (
    <>
      <div className="grid place-items-center w-full bg-base-200">
        <div className="max-w-5xl py-24 content-center justify-center">
          <h1 className="text-4xl  text-center font-bold">Our Services</h1>
          <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8">
            {featuresData.map((feature, key) => {
              return (
                <div
                  key={key}
                  className="card w-full bg-base-100 shadow-xl hover:shadow-2xl"
                >
                  <div className="card-body mt-4 items-center text-center">
                    <h2 className="card-title">{feature.title}</h2>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;

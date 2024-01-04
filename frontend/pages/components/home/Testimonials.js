const testimonialsData = [
  {
    text: "Outstanding experience with the software. It exceeded my expectations in every aspect. Highly recommended!",
    name: "Amita Devi",
    img: "/images/interstellar_library/Amita_Devi.jpg",
  },
  {
    text: "I'm truly impressed by the software's capabilities. It has transformed the way I work. Kudos to the team!",
    name: "Rahul Gupta",
    img: "/images/interstellar_library/Rahul_Gupta.jpg",
  },
  {
    text: "The software's functionality and user-friendliness are remarkable. It's an indispensable tool for my tasks.",
    name: "Priya Patel",
    img: "/images/interstellar_library/Priya_Patel.jpg",
  },
  {
    text: "The software has greatly improved our workflow. It's been a game-changer for us!",
    name: "Tariq Rahman",
    img: "images/interstellar_library/Tariq_Rahman.jpg",
  },
  {
    text: "I'm amazed by the software's efficiency. It has made my job much easier. Thanks a lot!",
    name: "Nadia Khan",
    img: "/images/interstellar_library/Nadia_Khan.jpg",
  },
  {
    text: "This software is exactly what we needed to enhance our productivity. Great job!",
    name: "Arjun Sharma",
    img: "/images/interstellar_library/Arjun_Sharma.jpg",
    // img: "../../../public/images/interstellar_library/Arjun_Sharma.jpg",
  },
];

function Testimonials() {
  return (
    <>
      <div className="grid place-items-center w-full bg-base-100">
        <div className="max-w-5xl py-24 content-center justify-center">
          <h1 className="text-4xl text-center font-bold">Testimonials</h1>
          <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8">
            {testimonialsData.map((testimonial, key) => {
              return (
                <div key={key} className="card w-full bg-base-100 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img
                      className="mask w-16 h-16 mask-circle"
                    //   src="https://picsum.photos/100/100"
                      src={testimonial.img}
                      alt=""
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <p>{testimonial.text}</p>
                    <p className="text-slate-500">-{testimonial.name}</p>
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

export default Testimonials;

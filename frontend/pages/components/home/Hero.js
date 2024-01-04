import { useRouter } from "next/router";

function Hero() {
  const router = useRouter();

  const sendToSeller_Signup = function () {
    router.push({
      pathname: "/seller/signup",
    });
  };

  return (
    <div className="hero py-32 bg-base-100">
      <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
        <img
          //   src="https://picsum.photos/seed/picsum/500/300"
          src="/images/hero.png"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Grettings !
          </h1>
          <p className="py-6">
          Welcome to our online place for book lovers!
           Whether you love reading, collecting books, or
          exploring stories, our platform is where you'll find
          a whole world of knowledge and imagination waiting for you.

          </p>
          <button className="btn btn-primary" onClick={sendToSeller_Signup}>
            Start Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;

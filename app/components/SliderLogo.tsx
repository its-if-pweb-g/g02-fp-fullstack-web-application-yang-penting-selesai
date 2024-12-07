const logos = [
  { image: "/img/logo/pngwing.com.png" },
  { image: "/img/logo/pngwing.com(1).png" },
  { image: "/img/logo/pngwing.com(2).png" },
  { image: "/img/logo/pngwing.com(3).png" },
  { image: "/img/logo/pngwing.com(4).png" },
  { image: "/img/logo/pngwing.com(7).png" },
  { image: "/img/logo/pngwing.com(8).png" },
  { image: "/img/logo/pngwing.com(9).png" },
  { image: "/img/logo/pngwing.com(5).png" },
  { image: "/img/logo/pngwing.com(10).png" },
  { image: "/img/logo/pngwing.com(11).png" },
  { image: "/img/logo/pngwing.com(6).png" },
  { image: "/img/logo/pngwing.com(12).png" },
];

const allLogos = [...logos, ...logos];

export default function SliderLogo() {
  return (
    <div className="logos">
      <div className="logos-slide">
        {allLogos.map((logo, index) => (
          <div key={index}>
            <img src={logo.image} alt={`Logo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

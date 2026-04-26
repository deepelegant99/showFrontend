import heroImg from '../hero.png'

type HeroProps = {
  Display: string
}

const Hero = ({ Display }: HeroProps) => {
  return (
    <div className="hero">
      <img src={heroImg} alt="Hero" />
      <h2>{Display}</h2>
    </div>
  );
}

export default Hero

import logo from '../assets/image-removebg-preview.svg';

export default function Logo({ className = '' }) {
  return <img src={logo} alt="LifePath AI" className={`h-10 w-auto ${className}`} />;
}

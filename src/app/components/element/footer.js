import Image from 'next/image';
import Link from 'next/link';
import Icon1 from '@/assests/socials/nav-icon1.svg';
import Icon2 from '@/assests/socials/nav-icon2.svg';
import Icon3 from '@/assests/socials/nav-icon3.svg';
import Icon4 from '@/assests/socials/nav-icon4.svg';

const SocialIcon = ({ href, icon, alt }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-[50px] h-[50px] inline-flex rounded-full items-center justify-center overflow-hidden"
  >
    <div className="absolute w-[42px] h-[42px] bg-black rounded-full scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100"></div>
    <Image src={icon} alt={alt} className="w-2/5 z-10" />
  </Link>
);

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div className="text-center sm:text-left text-muted-foreground order-2 sm:order-1">
            Developed with ❤ By <Link href='/' className='underline'>TEAM KIS</Link>
          </div>
          
          <div className="flex space-x-4 order-1 sm:order-2">
            <SocialIcon href="https://linkedin.com/in/?" icon={Icon1} alt="LinkedIn" />
            <SocialIcon href="https://github.com/?" icon={Icon2} alt="GitHub" />
            <SocialIcon href="https://www.instagram.com/?/" icon={Icon3} alt="Instagram" />
            <SocialIcon href="https://twitter.com/?" icon={Icon4} alt="Twitter" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
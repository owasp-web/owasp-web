import Image from 'next/image';

interface ButtonProps {
  text?: string;
  type?: "Primary" | "Ghost White" | "Ghost Dark" | "Light Blue";
  size?: "40" | "48" | "56";
}

function Button({
  text = "Join Now",
  type = "Primary",
  size = "40",
}: ButtonProps) {
  if (type === "Primary" && size === "56") {
    return (
      <div className="bg-[#003594] flex flex-row gap-10 items-center justify-center px-8 py-0 h-14 w-full">
        <div className="font-['Poppins'] font-semibold text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px] leading-[24px]">
          {text}
        </div>
      </div>
    );
  }
  return null;
}

export default function FinalCTASection() {
  return (
    <div className="bg-[#f1f6fe]">
      {/* Centered container with proper spacing */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-16">
        <div className="bg-gradient-to-b from-[#000000] from-[31.806%] to-[#13346d] flex flex-col gap-16 items-center justify-center overflow-hidden p-[64px] relative w-full">
          {/* Large Background Logo - Centered */}
          <div className="absolute h-[480.094px] w-[480px] top-[-150.26px] left-1/2 transform -translate-x-1/2">
            <Image src="/images/icons/owasp-logo-bg-large.svg" alt="" fill className="object-contain" />
          </div>

          {/* Content Container */}
          <div className="flex flex-col gap-6 items-center justify-center relative z-10 w-full">
            {/* Small OWASP Logo */}
            <div className="h-10 w-[41px] relative">
              <Image src="/images/icons/owasp-logo-small-white.svg" alt="OWASP" fill className="object-contain" />
            </div>

            {/* Main Heading */}
            <div className="font-['Barlow'] font-medium text-[#ffffff] text-[48px] text-center tracking-[-0.96px] leading-[48px] w-full">
              Have an <span className="text-[#00a7e1]">Idea</span> for a Project?
            </div>

            {/* Subtitle */}
            <div className="font-['Poppins'] text-[#ffffff] text-[16px] text-center tracking-[-0.32px] leading-[24px] w-full">
              Take advantage of our resources and let it grow with OWASP.
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <Button text="Start a Project" type="Primary" size="56" />
          </div>
        </div>
      </div>
    </div>
  );
} 
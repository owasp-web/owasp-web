import Button from "./Button";

// Placeholder images - these should be replaced with actual OWASP news and conference images
const newsImage = "/images/events/event-1.png";
const conferenceImage = "/images/events/event-2.png";

interface NewsArticle {
  id: string;
  image: string;
  author: string;
  date: string;
  title: string;
}

interface Conference {
  id: string;
  image: string;
  dates: string;
  month: string;
  year: string;
  title: string;
  hasEarlyBird?: boolean;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    image: newsImage,
    author: "Starr Brown",
    date: "May 6",
    title: "OWASP Enables AI Regulation That Works with OWASP AI Exchange"
  },
  {
    id: "2", 
    image: newsImage,
    author: "Starr Brown",
    date: "May 6",
    title: "OWASP Enables AI Regulation That Works with OWASP AI Exchange"
  },
  {
    id: "3",
    image: newsImage,
    author: "Starr Brown", 
    date: "May 6",
    title: "OWASP Enables AI Regulation That Works with OWASP AI Exchange"
  }
];

const conferences: Conference[] = [
  {
    id: "1",
    image: conferenceImage,
    dates: "26-30",
    month: "MAY",
    year: "2025",
    title: "OWASP Global AppSec EU 2025"
  },
  {
    id: "2",
    image: conferenceImage,
    dates: "3-7",
    month: "NOV",
    year: "2025", 
    title: "OWASP Global AppSec USA 2025",
    hasEarlyBird: true
  },
  {
    id: "3",
    image: conferenceImage,
    dates: "2-6",
    month: "NOV",
    year: "2026",
    title: "OWASP Global AppSec USA 2026"
  }
];

export default function NewsSection() {
  return (
    <section className="bg-[#f1f6fe] px-4 py-20 lg:px-[120px]">
      <div className="w-full max-w-none">
        {/* Recent News Section */}
        <div className="mb-20">
          {/* News Heading */}
          <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <h2 className="font-['Barlow'] text-[32px] font-medium leading-[40px] tracking-[-0.8px] text-[#101820] lg:text-[40px]">
              Recent OWASP News & Opinions
            </h2>
            <Button 
              text="See More" 
              variant="ghost-dark" 
              size="48"
            />
          </div>

          {/* News Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article) => (
              <div key={article.id} className="flex flex-col">
                {/* Article Image */}
                <div 
                  className="h-60 w-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
                
                {/* Article Content */}
                <div className="flex flex-col gap-3">
                  {/* Author & Date */}
                  <div className="flex items-center border-l-[1px] border-[#003594] pl-2">
                    <p className="font-['Poppins'] text-[14px] font-semibold leading-[20px] tracking-[-0.28px] text-[#003594]">
                      {article.author}, {article.date}
                    </p>
                  </div>
                  
                  {/* Article Title */}
                  <h3 className="font-['Inter_Display'] text-[20px] font-medium leading-[28px] tracking-[-0.2px] text-[#101820]">
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Conferences Section */}
        <div>
          {/* Conferences Heading */}
          <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <h2 className="font-['Barlow'] text-[32px] font-medium leading-[40px] tracking-[-0.8px] text-[#101820] lg:text-[40px]">
              Upcoming Conferences
            </h2>
            <Button 
              text="See More" 
              variant="ghost-dark" 
              size="48"
            />
          </div>

          {/* Conference Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {conferences.map((conference) => (
              <div key={conference.id} className="flex flex-col bg-white">
                {/* Conference Image with optional banner */}
                <div className="relative">
                  <div 
                    className="h-60 w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${conference.image}')` }}
                  />
                  
                  {/* Early Bird Banner */}
                  {conference.hasEarlyBird && (
                    <div className="absolute left-1/2 top-0 flex w-[378px] max-w-full -translate-x-1/2 items-center justify-center gap-3 bg-[#00a7e1] px-4 py-2">
                      <div className="flex h-5 w-5 items-center justify-center">
                        <img 
                          src="/megaphone.svg" 
                          alt="Megaphone" 
                          className="h-4 w-4 rotate-180 scale-y-[-100%]"
                        />
                      </div>
                      <p className="font-['Poppins'] text-[14px] font-semibold leading-[20px] tracking-[-0.28px] text-white">
                        Early bird pricing ends soon!
                      </p>
                    </div>
                  )}
                </div>

                {/* Conference Content */}
                <div className="flex flex-col justify-between p-6">
                  <div className="mb-6 flex flex-col gap-4">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <span className="font-['Barlow'] text-[40px] font-medium leading-[40px] tracking-[-0.8px] text-[#101820]">
                        {conference.dates}
                      </span>
                      <div className="flex flex-col font-['Poppins'] text-[14px] leading-[20px] text-[#101820]">
                        <span>{conference.month}</span>
                        <span>{conference.year}</span>
                      </div>
                    </div>
                    
                    {/* Conference Title */}
                    <h3 className="font-['Barlow'] text-[24px] font-medium leading-[32px] tracking-[-0.48px] text-[#101820]">
                      {conference.title}
                    </h3>
                  </div>

                  {/* More Info Button */}
                  <Button 
                    text="More Info" 
                    variant="ghost-dark" 
                    size="48"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
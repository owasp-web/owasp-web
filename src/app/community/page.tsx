import Header from '@/components/Header'
import Footer from '@/components/Footer'

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/public/community`, { cache: 'no-store' })
    if (!res.ok) return { tabs: [] }
    return await res.json()
  } catch {
    return { tabs: [] }
  }
}

export default async function CommunityPage() {
  const { tabs } = await getData()
  const sortedTabs = Array.isArray(tabs) ? [...tabs].sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)) : []

  const parseSections = (tab: any): any[] => {
    try { const parsed = JSON.parse(tab?.content || '[]'); return Array.isArray(parsed) ? parsed : [] } catch { return [] }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-[#F1F6FE] py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-['Barlow'] font-medium text-4xl mb-3">Community</h1>
            <p className="text-[#757575]">Explore OWASP community programs, resources, and opportunities to get involved.</p>
          </div>
        </section>
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
              {sortedTabs.map((t: any, idx: number) => (
                <a key={t.id || idx} href={`#tab-${t.id || idx}`} className={`px-4 py-2 rounded-t-lg border border-b-0 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100`}>{t.name}</a>
              ))}
            </div>
            {sortedTabs.map((t: any, idx: number) => (
              <div key={t.id || idx} id={`tab-${t.id || idx}`} className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t.name}</h2>
                <div className="space-y-6">
                  {parseSections(t).map((section: any, i: number) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                      {section.title && <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-3">{section.title}</h3>}
                      {section.imageUrl && (
                        <div className="my-4">
                          <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <img src={section.imageUrl} alt={section.imageAlt || ''} className="w-full h-auto" />
                          </div>
                          {section.imageCaption && <p className="text-sm text-gray-600 text-center mt-2 italic">{section.imageCaption}</p>}
                        </div>
                      )}
                      {section.videoUrl && (
                        <div className="my-4">
                          <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <iframe className="w-full aspect-video" src={section.videoUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                          </div>
                        </div>
                      )}
                      {section.content && (<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />)}
                      {Array.isArray(section.buttons) && section.buttons.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {section.buttons.map((b: any, bi: number) => (
                            <a key={bi} href={b.url} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded ${b.style === 'secondary' ? 'border border-[#003594] text-[#003594]' : b.style === 'link' ? 'text-[#003594] underline' : 'bg-[#003594] text-white'}`}>{b.label}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}



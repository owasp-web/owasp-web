import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

async function getBoardData() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anon) return { tabs: [], members: [] }
    const supabase = createClient(url, anon)
    const { data: tabs } = await supabase
      .from('board_tabs')
      .select('*')
      .order('display_order', { ascending: true })

    const { data: members } = await supabase
      .from('board_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    return { tabs: tabs || [], members: members || [] }
  } catch {
    return { tabs: [], members: [] }
  }
}

export default async function BoardPage() {
  const { tabs, members } = await getBoardData()

  const sortedTabs = Array.isArray(tabs)
    ? [...tabs].sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
    : []

  // Ensure Board Members tab exists first
  const membersTab = { id: 'board_members', name: 'Board Members', content: null }
  const otherTabs = sortedTabs.filter((t: any) => (t?.name || '').toLowerCase() !== 'board members')

  const parseSections = (tab: any): any[] => {
    try {
      const parsed = JSON.parse(tab?.content || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-[#F1F6FE] py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-['Barlow'] font-medium text-4xl mb-3">Global Board</h1>
            <p className="text-[#757575]">
              The OWASP Foundation Global Board sets strategic direction and governance. Learn more about the Board and explore resources.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
              {[membersTab, ...otherTabs].map((t: any, idx: number) => (
                <a key={t.id || idx} href={`#tab-${t.id || idx}`} className={`px-4 py-2 rounded-t-lg border border-b-0 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100`}>
                  {t.name}
                </a>
              ))}
            </div>

            {/* Board Members (non-negotiable tab) */}
            <div id="tab-board_members" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Board Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(members) && members.length > 0 ? members.map((m: any) => (
                  <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    {m.image_url && (
                      <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded">
                        <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="font-medium text-lg">{m.name}</div>
                    {m.title && <div className="text-[#757575] text-sm">{m.title}</div>}
                    {m.description && <p className="text-sm text-gray-700 mt-2">{m.description}</p>}
                    {Array.isArray(m.links) && m.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {m.links.map((l: any, i: number) => (
                          <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-[#003594] underline text-sm">
                            {l.title || 'Link'}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-[#757575]">No board members available.</div>
                )}
              </div>
            </div>

            {/* Other tabs rendered as sections */}
            {otherTabs.map((t: any, idx: number) => (
              <div key={t.id || idx} id={`tab-${t.id || idx}`} className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t.name}</h2>
                <div className="space-y-6">
                  {parseSections(t).map((section: any, i: number) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                      {section.title && (
                        <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-3">{section.title}</h3>
                      )}
                      {section.imageUrl && (
                        <div className="my-4">
                          <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <img src={section.imageUrl} alt={section.imageAlt || ''} className="w-full h-auto" />
                          </div>
                          {section.imageCaption && (
                            <p className="text-sm text-gray-600 text-center mt-2 italic">{section.imageCaption}</p>
                          )}
                        </div>
                      )}
                      {section.videoUrl && (
                        <div className="my-4">
                          <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <iframe className="w-full aspect-video" src={section.videoUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                          </div>
                        </div>
                      )}
                      {section.content && (
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                      )}
                      {Array.isArray(section.buttons) && section.buttons.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {section.buttons.map((b: any, bi: number) => (
                            <a key={bi} href={b.url} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded ${b.style === 'secondary' ? 'border border-[#003594] text-[#003594]' : b.style === 'link' ? 'text-[#003594] underline' : 'bg-[#003594] text-white'}`}>
                              {b.label}
                            </a>
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



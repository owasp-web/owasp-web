import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

async function getPage(slug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anon) return { page: null }
    const supabase = createClient(url, anon)
    const { data, error } = await supabase
      .from('legal_pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .limit(1)
      .maybeSingle()
    if (error) return { page: null }
    return { page: data }
  } catch {
    return { page: null }
  }
}

export default async function LegalDetailPage({ params }: { params: { slug: string } }) {
  const { page } = await getPage(params.slug)
  const title = page?.title || 'Policy'
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-[#F1F6FE] py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-['Barlow'] font-medium text-4xl mb-3">{title}</h1>
          </div>
        </section>
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            {page?.content ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <div className="text-[#757575]">No content available.</div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}



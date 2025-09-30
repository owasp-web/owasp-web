import Header from '@/components/Header'
import Footer from '@/components/Footer'

async function getPages() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/public/legal`, { cache: 'no-store' })
    if (!res.ok) return { pages: [] }
    return await res.json()
  } catch {
    return { pages: [] }
  }
}

export default async function LegalIndexPage() {
  const { pages } = await getPages()
  const list = Array.isArray(pages) ? pages : []
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-[#F1F6FE] py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-['Barlow'] font-medium text-4xl mb-3">Legal Policies</h1>
            <p className="text-[#757575]">Browse OWASP legal and policy documents.</p>
          </div>
        </section>
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <ul className="bg-white border border-gray-200 rounded-md divide-y">
              {list.map((p: any) => (
                <li key={p.id} className="px-4 py-3">
                  <a className="text-[#003594] underline" href={`/legal/${encodeURIComponent(p.slug)}`}>{p.title}</a>
                </li>
              ))}
              {list.length === 0 && (
                <li className="px-4 py-3 text-[#757575]">No policies available.</li>
              )}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}



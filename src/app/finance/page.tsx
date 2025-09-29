import Header from '@/components/Header'
import Footer from '@/components/Footer'

async function getDocs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/public/finance-docs/list`, { cache: 'no-store' })
  const json = await res.json().catch(() => ({ documents: [] }))
  return Array.isArray(json?.documents) ? json.documents : []
}

export default async function FinancePage() {
  const docs = await getDocs()
  const byCat: Record<string, any[]> = {}
  for (const d of docs) {
    const cat = d.category || 'Other'
    byCat[cat] = byCat[cat] || []
    byCat[cat].push(d)
  }

  const sections: { key: string, title: string, blurb?: string }[] = [
    { key: 'Tax Return', title: 'Tax Returns (Form 990)' },
    { key: 'Annual Budget', title: 'Annual Budgets' },
    { key: 'Audited Financial Statement', title: 'Audited Financial Statements' },
    { key: 'Other', title: 'Other Financial Documents' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-[#F1F6FE] py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-['Barlow'] font-medium text-4xl mb-3">Finance</h1>
            <p className="text-[#757575]">
              OWASP is a radically transparent organization. Financial records, annual budgets, tax returns, and audited statements are published here for public review.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 space-y-10">
            {sections.map(sec => (
              <div key={sec.key}>
                <h2 className="text-2xl font-semibold mb-4">{sec.title}</h2>
                <div className="bg-white border border-gray-200 rounded-md">
                  <ul>
                    {(byCat[sec.key] || []).map((d) => (
                      <li key={d.id} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0">
                        <div>
                          <div className="font-medium">{d.name}</div>
                          {d.year ? <div className="text-[#757575] text-sm">{d.year}</div> : null}
                        </div>
                        <a className="text-[#003594] underline" href={d.file_url} target="_blank" rel="noopener noreferrer">Download</a>
                      </li>
                    ))}
                    {(!byCat[sec.key] || byCat[sec.key].length === 0) && (
                      <li className="px-4 py-3 text-[#757575]">No documents available.</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 text-sm text-[#757575]">
            <p>As a US-based 501(c)3 registered non-profit charity, donations to the OWASP Foundation may be tax deductible. Please consult a tax professional. EIN: 20-0963503. See also OWASP Finance page for context.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}



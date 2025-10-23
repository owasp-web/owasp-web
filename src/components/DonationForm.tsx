'use client'

import React, { useMemo, useState } from 'react'

interface DonationFormProps {
  projectName?: string
}

export default function DonationForm({ projectName }: DonationFormProps) {
  const [currency, setCurrency] = useState<'USD'|'EUR'|'GBP'>('USD')
  const [amount, setAmount] = useState<number>(50)
  const [custom, setCustom] = useState<string>('')
  const [recurring, setRecurring] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [email2, setEmail2] = useState('')
  const [publicSupporter, setPublicSupporter] = useState<boolean>(false)
  const [restricted, setRestricted] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const preset = useMemo(() => [10, 25, 50, 100, 500], [])
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || email !== email2) { setError('Emails must match'); return }
    const amt = custom.trim() ? parseFloat(custom) : amount
    if (!amt || amt <= 0) { setError('Enter a valid amount'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/donate/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency, amount: Math.round(amt * 100), // cents
          recurring,
          donor: { name, email },
          options: { publicSupporter, restricted, projectName }
        })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to start checkout')
      if (json.url) {
        window.location.href = json.url
      }
    } catch (err: any) {
      setError(err?.message || 'Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Amount */}
      <div>
        <div className="flex gap-2 mb-3">
          {(['USD','EUR','GBP'] as const).map((c) => (
            <button type="button" key={c} onClick={() => setCurrency(c)} className={`px-3 py-1 rounded ${currency===c?'bg-[#003594] text-white':'bg-gray-100 text-gray-800'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {preset.map((p) => (
            <button type="button" key={p} onClick={() => { setAmount(p); setCustom('') }} className={`px-3 py-3 rounded border ${amount===p && !custom ? 'bg-[#003594] text-white border-[#003594]':'bg-white'}`}>{symbol}{p}</button>
          ))}
          <div className="col-span-3 sm:col-span-2 flex items-center gap-2">
            <span className="text-gray-600">Other</span>
            <input type="number" min={1} step="0.01" value={custom} onChange={(e)=> setCustom(e.target.value)} className="flex-1 px-3 py-2 border rounded" placeholder={`${symbol}0.00`} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={recurring} onChange={(e)=>setRecurring(e.target.checked)} /> Make this a monthly recurring gift</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={publicSupporter} onChange={(e)=>setPublicSupporter(e.target.checked)} /> Publicly list me as a supporter{projectName?` of ${projectName}`:''}</label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Confirm Email</label>
          <input type="email" required value={email2} onChange={(e)=>setEmail2(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-900">
        Please restrict this gift for {projectName || 'OWASP Foundation'}. In doing so, I understand this gift amount is net 10% administration costs and unspent restricted gift balances become unrestricted after one year.
      </div>

      <div className="flex items-center gap-2">
        <input id="restricted" type="checkbox" checked={restricted} onChange={(e)=>setRestricted(e.target.checked)} />
        <label htmlFor="restricted" className="text-sm text-gray-700">Restrict this gift for {projectName || 'OWASP Foundation'}</label>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button type="submit" disabled={loading} className="px-6 py-3 bg-[#003594] text-white rounded disabled:opacity-50">{loading ? 'Processing…' : 'Donate'}</button>
    </form>
  )
}



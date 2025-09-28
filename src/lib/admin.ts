import { createClientComponentClient } from './supabase'
import type { Event, EventFormData } from './types'

export class AdminService {
  private getSupabase() {
    return createClientComponentClient()
  }

  // Events CRUD operations
  async getEvents(): Promise<Event[]> {
    const { data, error } = await this.getSupabase()
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data as unknown as Event[]) || []
  }

  async getEvent(id: string): Promise<Event | null> {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/admin/events/${id}`, {
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to load event')
    return (await res.json()).event as Event
  }

  async createEvent(eventData: EventFormData): Promise<Event> {
    const { data, error } = await this.getSupabase()
      .from('events')
      .insert(eventData)
      .select()
      .single()
    
    if (error) throw error
    return data as unknown as Event
  }

  async updateEvent(id: string, eventData: Partial<EventFormData>): Promise<Event> {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify(eventData)
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to update event')
    return (await res.json()).event as Event
  }

  async deleteEvent(id: string): Promise<void> {
    const { error } = await this.getSupabase()
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Authentication check
  async checkAuth(): Promise<boolean> {
    const { data: { user } } = await this.getSupabase().auth.getUser()
    return !!user
  }

  // Simple admin auth (you can enhance this with role-based access)
  async signIn(email: string, password: string) {
    const { data, error } = await this.getSupabase().auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data as unknown as Event
  }

  async signOut() {
    const { error } = await this.getSupabase().auth.signOut()
    if (error) throw error
  }

  // Chapter admins management
  async listChapterAdmins(chapterId: string) {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/chapters/${chapterId}/admins`, {
      headers: { Authorization: `Bearer ${session.access_token}` }
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch admins')
    return (await res.json()).admins as Array<{ id: string; email: string; user_id: string | null; created_at: string }>
  }

  async addChapterAdmin(chapterId: string, email: string) {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/chapters/${chapterId}/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ email })
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to add admin')
    return (await res.json()) as { 
      admin: { id: string; email: string; user_id: string | null; created_at: string }
      tempPassword?: string | null
    }
  }

  async removeChapterAdmin(chapterId: string, identifier: { id?: string; email?: string }) {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/chapters/${chapterId}/admins`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify(identifier)
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to remove admin')
    return true
  }

  async sendPasswordReset(chapterId: string, email: string) {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/chapters/${chapterId}/admins/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ email })
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to reset password')
    return (await res.json()).tempPassword as string
  }

  // Chapter content update (RLS enforced)
  async updateChapter(chapterId: string, changes: Partial<any>) {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    // Remove undefined keys to avoid PostgREST errors
    const sanitized: Record<string, any> = {}
    Object.entries(changes).forEach(([k, v]) => {
      if (v !== undefined) sanitized[k] = v
    })

    const { data, error } = await supabase
      .from('chapters')
      .update(sanitized)
      .eq('id', chapterId)
      .select('*')
      .single()
    if (error) {
      const msg = String(error.message || '')
      if (msg.includes('column') && msg.includes('tabs')) {
        throw new Error('Tabs not enabled in database. Please run add-chapter-tabs-schema.sql in Supabase.')
      }
      throw error
    }
    return data
  }

  // Create event for a chapter (RLS enforced)
  async createChapterEvent(chapterId: string, eventData: Partial<Event>) {
    const supabase = this.getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')
    const res = await fetch(`/api/chapters/${chapterId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify(eventData)
    })
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to create event')
    return (await res.json()).event as Event
  }
}

export const adminService = new AdminService() 
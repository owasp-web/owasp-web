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
    const { data, error } = await this.getSupabase()
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as unknown as Event
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
    const { data, error } = await this.getSupabase()
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as unknown as Event
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
}

export const adminService = new AdminService() 
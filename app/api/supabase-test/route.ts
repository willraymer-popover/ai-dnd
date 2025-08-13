import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET() {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1)
    
    if (error && error.code === '42P01') {
      return NextResponse.json({ 
        status: 'connected',
        message: 'Successfully connected to Supabase! No tables exist yet.',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL 
      })
    }
    
    if (error) {
      return NextResponse.json({ 
        status: 'error',
        message: error.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      status: 'connected',
      message: 'Successfully connected to Supabase!',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    })
  } catch (err) {
    return NextResponse.json({ 
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
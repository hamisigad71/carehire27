import { NextResponse } from 'next/server';
import { vehicles } from '@/data/vehicles';

export async function GET() {
  try {
    // Simulate a small delay for realistic API behavior
    // await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

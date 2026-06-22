import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await saveDb(data);
    
    // Clear Next.js cache for the entire site
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

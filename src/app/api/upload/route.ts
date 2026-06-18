import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a safe, unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filename = `${uniqueSuffix}-${originalName}`;
    
    // Directory path: public/images
    const uploadDir = path.join(process.cwd(), "public", "images");
    
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);

    // Write file to filesystem
    fs.writeFileSync(filePath, buffer);

    // Return the relative URL path to be used by the frontend
    const fileUrl = `/images/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

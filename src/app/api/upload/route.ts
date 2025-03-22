import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = Date.now() + path.extname(file.name);
  const filePath = path.join(uploadDir, fileName);

  await fs.promises.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  const fileUrl = `/api/upload/${fileName}`;
  return NextResponse.json({
    message: "File uploaded successfully",
    filePath: fileUrl,
  });
}

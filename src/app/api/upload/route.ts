// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("image") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const uploadDir = path.join(process.cwd(), "uploads");
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   const fileName = Date.now() + path.extname(file.name);
//   const filePath = path.join(uploadDir, fileName);

//   await fs.promises.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

//   const fileUrl = `/api/upload/${fileName}`;
//   return NextResponse.json({
//     message: "File uploaded successfully",
//     filePath: fileUrl,
//   });
// }

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64File, {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
      folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: uploadResponse.secure_url,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed", details: error }, { status: 500 });
  }
}


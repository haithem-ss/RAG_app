import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { loadPdf, saveToDB, splitTextIntoChunks } from "../../../lib/pdf";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const collectionName = formData.get("collectionName");

    if (!file || !collectionName) {
      throw new Error("No file uploaded");
    }

    const pdf = await loadPdf(file as File);

    const chunks = await splitTextIntoChunks(pdf);

    await saveToDB(collectionName as string, chunks);

    return new Response(JSON.stringify({ message: "Collection created" }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: 400,
    });
  }
};

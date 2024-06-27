import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

export const loadPdf = async (file: File) => {
  const loader = new PDFLoader(file);

  const docs = await loader.load();

  const pdfContent = docs.map((doc) => doc.pageContent).join("\n");

  return pdfContent;
};

export const splitTextIntoChunks = async (text: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 100,
  });

  const output = await splitter.createDocuments([text]);

  // return output.map((doc) => doc.pageContent);
  return output;
};

export const saveToDB = async (index: string, data: any) => {
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

  const indexes = await pc.listIndexes();

  if (indexes.indexes?.length === 0) {
    await pc.createIndex({
      name: "index",
      metric: "cosine",
      dimension: 1536,
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
  }

  const pineconeIndex = pc.index("index");

  await PineconeStore.fromDocuments(data, new OpenAIEmbeddings(), {
    pineconeIndex,
    maxConcurrency: 3,
    namespace: index,
  });

  // return vectorStore;
};

export const getVectorStore = async (index: string) => {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

  const pineconeIndex = pinecone.Index("index");

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex, namespace: index }
  );

  return vectorStore;
};

import { NextRequest, NextResponse } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { getVectorStore } from "../../../../lib/pdf";
import { HfInference } from "@huggingface/inference";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";

const PROMPT_TEMPLATE = `
Instructions:

Dont answer the question based on your own knowledge. Only use the information provided in the text.
If you cant find the answer, write "No answer found".
Use only the language of the provided context to answer.

Context:
{context}

Question:
{question}


Answer:

`;

const model = "mistralai/Mistral-7B-Instruct-v0.3";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const question = searchParams.get("question");
    const collectionName = params.name;

    const vectorStore = await getVectorStore(collectionName);

    const vector_results = await vectorStore.similaritySearch(question!, 4);

    const context = vector_results
      .map((doc) => doc.pageContent)
      .join("\n\n---\n\n");

    const prompt_template = PromptTemplate.fromTemplate(PROMPT_TEMPLATE);
    const prompt = await prompt_template.invoke({
      context,
      question: question!,
    });

    const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

    const res = await inference.textGeneration({
      model,
      inputs: prompt.value,
    });
    return NextResponse.json({
      answer: res.generated_text?.split("Answer:").pop(),
    });
  } catch (error) {
    return NextResponse.json("An error occurred", { status: 400 });
  }
};

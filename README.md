# Next.js PDF Question Answering App

This Next.js application uses Retrieval Augmented Generation (RAG) to answer questions based on the contents of a PDF file. It leverages OpenAI, HuggingFace, and Pinecone APIs to perform natural language processing and semantic search.

## Features

- Upload and process PDF files.
- Ask questions and get answers based on the PDF content.
- Uses OpenAI for generating answers.
- Uses HuggingFace for processing.
- Uses Pinecone for efficient semantic search.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn
- OpenAI API key
- HuggingFace API key
- Pinecone API key

### Installation

1. **Clone the repository**


2. **Install dependencies:**

   ```bash
   npm install
   ```


3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your API keys:

   ```bash
   OPENAI_API_KEY=sk-proj-
   HUGGINGFACE_API_KEY=
   PINECONE_API_KEY=
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.
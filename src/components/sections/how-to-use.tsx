import { Building2Icon, ThumbsUpIcon, Users2Icon } from "lucide-react";

export default function HowToUse() {
  return (
    <>
      <div className="container py-24 lg:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">
                How does it work?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Here, you can upload your study materials and generate questions
                to aid your revision. Follow the steps below to transform your
                PDFs into a valuable study resource.
              </p>
            </div>
            <div className="space-y-6 lg:space-y-10">
              <div className="flex">
                <div className="h-6 w-6 font-bold text-5xl">1</div>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Upload Your PDF
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Select the PDF file containing your study material and wait
                    for the file to upload and process.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="h-6 w-6 font-bold text-5xl">2</div>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Generate Answers to Your Questions
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Type in your questions related to the study material. The
                    app will then generate answers and additional questions to
                    enhance your understanding.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="h-6 w-6 font-bold text-5xl">3</div>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Save to Question Bank
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Your customized questions and answers will be stored and
                    organized for easy access during your study sessions, making
                    your revision process more interactive and efficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

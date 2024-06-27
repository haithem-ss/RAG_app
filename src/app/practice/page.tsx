import { FlashCardsCarousel } from "../../components/sections/flash-cards-slider";
import Header from "../../components/sections/header";

const Page = () => {
  return (
    <main className="h-[calc(100vh-4rem)] min-h-[600px] flex flex-col justify-center gap-20">
      <Header
        title="Welcome to your Question Bank!"
        description="This is your personal collection of saved questions, all generated from
      the PDFs you've uploaded. Use this page to review, edit, and organize your
      questions for effective revision."
      />
      <div className="flex items-center justify-center sm:px-10 md:px-20 lg:px-40 w-full">
        <FlashCardsCarousel />
      </div>
    </main>
  );
};

export default Page;
export default function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3">
      <div className="mx-auto text-center text-4xl md:text-5xl font-bold">
        <h1>{title}</h1>
      </div>
      <p className=" mx-auto text-md text-muted-foreground">{description}</p>
    </div>
  );
}

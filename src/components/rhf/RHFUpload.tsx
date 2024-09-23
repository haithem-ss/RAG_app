import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FileUploader } from "@/components/file-uploader";

export default function ({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUploader
              onValueChange={field.onChange}
              maxFiles={1}
              maxSize={10 * 1024 * 1024}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

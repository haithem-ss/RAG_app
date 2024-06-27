"use client";

import React, { useState } from "react";
import { UploadZone } from "./upload";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInput from "../rhf/RHFInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "../../lib/utils";
import RHFUpload from "../rhf/RHFUpload";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useQuestions } from "../../context/questionsContext";

const MultiStepForm: React.FC = () => {
  const { updateCollectionName } = useQuestions();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const validationSchema = z.object({
    collectionName: z
      .string()
      .regex(
        /^[a-z0-9-]+$/,
        "Collection name must be lowercase and contain only letters, numbers, and hyphens"
      )
      .min(4),
    doc: z.any(),
  });

  const form = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.doc[0]);
    formData.append("collectionName", data.collectionName);

    try {
      const response = await fetch(
        "https://rag-haithemss.vercel.app/api/collection",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        updateCollectionName(data.collectionName);
        setOpen(false);
        router.refresh();
      }
      if (response.status === 400) {
        const body = await response.json();
        form.setError("collectionName", {
          message: "Collection name already exists",
        });
      }
    } catch (error) {
      // Error occurred during the upload process
      console.log((error as Error).message);
    }
  };

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="w-5/6 md:w-1/4 font-bold group/arrow m-auto"
          >
            Get started
            <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create your collection</AlertDialogTitle>
            <AlertDialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex w-full flex-col gap-4">
                    <RHFInput
                      form={form}
                      name="collectionName"
                      label="Collection name"
                    />
                    <RHFUpload
                      form={form}
                      name="doc"
                      label="Upload your document"
                    />
                  </div>
                  <div
                    className={cn(
                      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-5"
                    )}
                  >
                    <Button
                      onClick={() => setOpen(false)}
                      variant={"outline"}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={form.formState.isSubmitting}
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MultiStepForm;

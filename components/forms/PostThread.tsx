"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread, editThread } from "@/lib/actions/thread.actions";
// import EditThread from "./EditThread";
// import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  userId: string;
  textThread?: string;
  threadId?: string | "";
  // user: {
  //   id: string;
  //   objectId: string;
  //   name: string;
  //   username: string;
  //   bio: string;
  //   image: string;
  // };
  // btnTitle: string;
}

const PostThread = ({ userId, textThread, threadId }: Props) => {
  // console.log("🚀 ~ PostThread ~ textThread:", textThread);
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: textThread || "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (textThread && threadId) {
      await editThread({
        text: values.thread,
        threadId,
        path: pathname,
      });
    } else {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });
    }

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          {textThread ? "Edit thread" : "Post thread"}
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;

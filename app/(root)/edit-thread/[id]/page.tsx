import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";
import { fetchThreadById } from "@/lib/actions/thread.actions";

const Page = async ({ params }: { params: { id: string } }) => {
  // console.log("🚀 ~ Page ~ params:", params.id);
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <>
      <h1 className="head-text">Edit thread</h1>

      <PostThread
        userId={userInfo._id}
        textThread={thread.text}
        threadId={thread.id}
      />
    </>
  );
};

export default Page;

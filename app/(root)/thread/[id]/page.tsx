import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import TreadCard from "@/components/cards/TreadCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <TreadCard
          key={thread?._id}
          id={thread?._id}
          currentUserId={user.id}
          parentId={thread?.parentId}
          content={thread?.text}
          author={thread?.author}
          community={thread?.community}
          createdAt={thread?.createdAt}
          comments={thread?.children}
          likes={thread.likes}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread?.children.map((children: any) => (
          // console.log(children.author._id)
          <TreadCard
            key={children._id}
            id={children._id}
            currentUserId={user.id}
            parentId={children.parentId}
            content={children.text}
            author={children.author}
            community={children.community}
            createdAt={children.createdAt}
            comments={children.children}
            likes={children.likes}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;

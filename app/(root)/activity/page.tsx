import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { replies, likes } = await getActivity(userInfo._id);

  const activities = replies
    .concat(likes)
    .sort((a, b) => b.createdAt - a.createdAt);
  console.log("🚀 ~ Page ~ activities:", activities);

  return (
    <section>
      <h1 className="mt-10 head-text">Activities</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activities &&
          activities.map((activity) =>
            activity.author ? (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="User Logo"
                    width={30}
                    height={30}
                    className="rounded-full object-cover activity-user-img"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ) : (
              <Link
                key={activity._id}
                href={`/thread/likes/${activity.threadId}`}
              >
                <article className="activity-card">
                  <Image
                    src={activity.user.image}
                    alt="User Logo"
                    width={30}
                    height={30}
                    className="rounded-full object-cover activity-user-img"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.user.name}
                    </span>{" "}
                    liked your thread
                  </p>
                </article>
              </Link>
            )
          )}

        {activities.length === 0 && (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
        {/* {replies.length > 0 ? (
          <>
            {replies.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="User Logo"
                    width={30}
                    height={30}
                    className="rounded-full object-cover activity-user-img"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )} */}

        {/* {likes.length > 0 ? (
          <>
            {likes.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.user.image}
                    alt="User Logo"
                    width={30}
                    height={30}
                    className="rounded-full object-cover activity-user-img"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.user.name}
                    </span>{" "}
                    liked your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )} */}
      </section>
    </section>
  );
};

export default Page;

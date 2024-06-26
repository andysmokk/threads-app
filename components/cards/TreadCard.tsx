import Link from "next/link";
import Image from "next/image";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import ReactionThread from "../reactions/ReactionThread";
import EditThread from "../forms/EditThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: {
    user: {
      image: string;
    };
  }[];
}

const TreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl 
      ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={author?.image}
                alt="User Community Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author?.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "pb-10"} mt-5 flex flex-col gap-3`}>
              <div className={`${isComment ? "pb-0" : "pb-5"} flex gap-3.5`}>
                <ReactionThread threadId={id} userId={currentUserId} />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              <div className="flex flex-row gap-2">
                {isComment && comments.length > 0 && (
                  <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} repl
                      {comments.length === 1 ? "y" : "ies"}
                    </p>
                  </Link>
                )}

                {isComment && comments.length > 0 && likes.length > 0 && (
                  <p className="mt-1 text-subtle-medium text-gray-1">•</p>
                )}

                {isComment && likes.length > 0 && (
                  <Link href={`/thread/likes/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {likes.length} lik
                      {likes.length === 1 ? "e" : "es"}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author?.id}
          parentId={parentId}
          isComment={isComment}
        />

        <EditThread
          currentUserId={currentUserId}
          authorId={author?.id}
          threadId={id}
        />
      </div>

      <div className="flex gap-1">
        {!isComment && comments?.length > 0 && (
          <div className="ml-2.5 mt-3 flex items-center gap-2">
            {comments.slice(0, 3).map((comment, index) => (
              <Image
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                width={24}
                height={24}
                className={`${index !== 0 && "-ml-5"} rounded-full object-cover 
              gap-0 activity-user-img`}
              />
            ))}

            <Link href={`/thread/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">
                {comments.length} repl{comments.length === 1 ? "y" : "ies"}
              </p>
            </Link>
          </div>
        )}

        {!isComment && likes && likes?.length > 0 && (
          <div className="ml-2.5 mt-3 flex items-center gap-2">
            {likes.slice(0, 3).map((like, index) => (
              <Image
                key={index}
                src={like?.user.image}
                alt={`user_${index}`}
                width={24}
                height={24}
                className={`${index !== 0 && "-ml-5"} rounded-full object-cover 
              gap-0 activity-user-img`}
              />
            ))}

            <Link href={`/thread/likes/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">
                {likes.length} lik{likes.length === 1 ? "e" : "es"}
              </p>
            </Link>
          </div>
        )}
      </div>

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="mt-0.5 ml-1 rounded-full object-cover activity-user-img"
          />
        </Link>
      )}
    </article>
  );
};

export default TreadCard;

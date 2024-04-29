"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  createReaction,
  fetchReactions,
  getReactionOfUser,
} from "@/lib/actions/thread.actions";

import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  userId: string;
}

const ReactionThread = ({ threadId, userId }: Props) => {
  const [likeOfUser, setLikeOfUser] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchLikeOfUser = async () => {
      const isLiked = await getReactionOfUser({
        threadId,
        userId,
      });
      setLikeOfUser(isLiked);
    };

    fetchLikeOfUser();
  }, [threadId, userId]);

  const handleClick = async () => {
    await createReaction({ threadId, userId, path: pathname });
    await fetchReactions({ threadId });
    setLikeOfUser(!likeOfUser);
  };

  return (
    <>
      <Image
        src={`/assets/heart-${likeOfUser ? "filled" : "gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        onClick={handleClick}
        className="cursor-pointer"
      />
    </>
  );
};

export default ReactionThread;

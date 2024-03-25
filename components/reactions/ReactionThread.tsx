"use client";

import Image from "next/image";

import { createReaction } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  userId: string;
  isLiked: boolean;
}

const ReactionThread = async ({ threadId, userId, isLiked }: Props) => {
  const handleClick = async () => {
    await createReaction(threadId, userId);
  };

  return (
    <div>
      <Image
        src={`/assets/heart-${isLiked ? "filled" : "gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        onClick={handleClick}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ReactionThread;

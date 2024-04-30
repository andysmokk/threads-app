import Image from "next/image";
import Link from "next/link";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative object w-20 h-20">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading2-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>

        {accountId === authUserId && (
          <Link
            href={`/profile/edit/${accountId}`}
            className="flex p-3 bg-dark-3 rounded-lg"
          >
            <Image
              src="/assets/edit.svg"
              alt="edit-img"
              width={24}
              height={24}
            />
            <p className="text-base-medium text-light-2 ml-2">Edit Profile</p>
          </Link>
        )}
      </div>

      <p className="mt-6 max-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;

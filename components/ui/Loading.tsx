"use client";

import { Blocks } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="h-[32rem] flex justify-center items-center">
      <Blocks
        height="180"
        width="180"
        color="bg-primary-500"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
}

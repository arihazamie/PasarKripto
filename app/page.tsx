import React from "react";
import Link from "next/link";

const HomeAPP = () => {
  return (
    <>
      <div className="alert bg-red-500 text-white text-center p-4 block lg:hidden">
        Please open with Desktop versions
        <br />
        For now not compatible for mobile
        <br />
        Thanks :{" "}
        <Link
          href={"https://github.com/AriHazamie"}
          className="underline hover:text-MyPurple"
          target="_blank">
          AriHazamie
        </Link>
      </div>
    </>
  );
};

export default HomeAPP;

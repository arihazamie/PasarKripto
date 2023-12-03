import Link from "next/link";
const HomeAPP = () => {
  return (
    <>
      <div className="alert bg-red-700 text-white text-center p-4 block lg:hidden">
        maybe mobile version has many <b>bugs</b>
        <br />
        please report {"> "}
        <Link
          href="mailto:arihzmii.work@gmail.com"
          className="underline hover:text-MyPurple"
          target="_blank">
          AriHazamie
        </Link>
      </div>
    </>
  );
};

export default HomeAPP;

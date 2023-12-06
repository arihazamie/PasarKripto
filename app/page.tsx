import Link from "next/link";
const HomeAPP = () => {
  return (
    <div className="mb-28">
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
      <div className="text-center text-5xl font-bold mt-32 md:mt-44">
        <div className="text-MyPurple/80">PasarKripto</div>
        <div className="">Easily and Quickly Tracking</div>
      </div>
    </div>
  );
};

export default HomeAPP;

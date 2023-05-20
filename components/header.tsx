import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { applyCategory } from "@/store";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic", "normal"],
});

const Header = () => {
  return (
    <header className="px-16 py-8">
      <div className="mb-5 flex justify-between">
        <Link href={"/"}>
          <Image
            src={"https://www.creasmall.com/images/web/etc/etc-logo.svg"}
            alt={"로고"}
            width={37}
            height={40}
            className="hover:cursor-pointer"
          />
        </Link>
        <ul className="flex h-[0.9rem] items-center divide-x-2 text-[0.75rem] [&>li:last-child]:pr-0 [&>li>a]:hover:cursor-pointer [&>li]:flex [&>li]:justify-center [&>li]:px-[1rem]">
          <li>
            <a>로그인</a>
          </li>
          <li>
            <a>회원가입</a>
          </li>
          <li>
            <a>마이페이지</a>
          </li>
          <li>
            <a>찜목록</a>
          </li>
          <li className="items-center">
            <a className="flex space-x-1">
              <div>장바구니</div>
              <div className="flex h-[1.1rem] w-[1.1rem] items-center justify-center rounded-full bg-rose-500 text-white">
                0
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <nav>
          <ul className="mb-5 flex space-x-10 text-3xl font-[900]">
            {["NEW ARRIVAL", "BEST", "BRAND", "LOOK BOOK"].map((el) => (
              <li
                className={`${
                  el === "LOOK BOOK" && "italic"
                } hover:cursor-pointer hover:underline ${roboto.className}`}
                key={el}
              >
                {el}
              </li>
            ))}
          </ul>
          <ul className="flex divide-x-2 text-lg">
            {["all", "male", "female", "unisex", "accessory"].map((el, idx) => (
              <li
                className={`flex justify-center px-8 text-slate-700 hover:cursor-pointer hover:font-extrabold hover:underline ${
                  idx === 0 && "pl-0"
                }`}
                key={el}
                onClick={() => applyCategory(el)}
              >
                {el.toUpperCase()}
              </li>
            ))}
          </ul>
        </nav>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-20 w-20 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;

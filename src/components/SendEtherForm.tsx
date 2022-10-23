import { KeyboardEvent } from "react";

export default function SendEtherForm() {
  const blockInvalidChar = (e: KeyboardEvent) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  return (
    <form className="mt-6 mb-16 lg:my-6 bg-customblue-200 py-6 px-4 rounded-2xl max-w-md mx-auto">
      <input type="text" name="receiver" className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5" placeholder="Address to" />
      <input type="number" name="amount" max="10000" onKeyDown={blockInvalidChar} className="bg-[#252849] mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5" placeholder="Ether" />
      <input type="text" name="keyword" className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5" placeholder="Keyword" />
      <input type="text" name="message" className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5" placeholder="Message" />
      <hr className="bg-white mx-4 my-3" />
      <input type="submit" value="Send" className="bg-customblue-100 mt-5 w-1/2 block mx-auto border-white border shadow-black shadow-md py-3 px-3 rounded-xl" />
    </form>
  )
}

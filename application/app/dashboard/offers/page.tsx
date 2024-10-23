import { fetchOffers, serachOffers } from "app/app/lib/data";
import { CreateOffer } from "app/app/ui/Buttons";
import Search from "app/app/ui/search";
import { FaTrash } from "react-icons/fa6";
import { MdOutlineEditRoad } from "react-icons/md";

export default async function Page(props : {searchParams ? : Promise<{query?: string}>}) {

    const searchParams = await props.searchParams
    let data = null;
    if (searchParams?.query) {
      data = await serachOffers(searchParams.query)
    } else {
      data = await fetchOffers()
    }

    console.log(data)

    return (
      <div className="w-full">
        <div className="h-[100px] flex items-center px-10 border-b-1 border-black/10">
            <h1 className="uppercase text-2xl font-bold">My Offers</h1>
        </div>
        <div className="flex mt-4">
          <div className="flex-grow mr-2">
            <Search placeholder="search..." />
          </div>
          <div className="w-[140px]">
            <CreateOffer />
          </div>
        </div>
        <div className="mt-6 h-full">
          <table className="w-full p-4">
            <thead className="h-[40px] bg-gray-600 rounded text-white">
              <tr className="uppercase w-full">
                <th>title</th>
                <th>desc</th>
                <th>type</th>
                <th>status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody className="">
              {
                data?.map((offer, index : number) => {
                  return (<tr key={index} className="capitalize h-[60px] text-center">
                    <td>{offer.title}</td>
                    <td>{offer.description}</td>
                    <td>{offer.type}</td>
                    <td>{offer.status}</td>
                    <td className="h-[60px] flex justify-evenly items-center">
                    <button className=" h-[35px] p-2 rounded flex justify-center items-center">
                        <MdOutlineEditRoad />
                    </button>
                    <button className=" h-[35px] p-2 rounded flex justify-center items-center">
                        <FaTrash />
                    </button>
                    </td>
                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>  
    );
  }
import { MdOutlineEditRoad } from "react-icons/md"
import DeleteOffer from "./DeleteOffer"
import Link from "next/link"

export default function OffersTable({data} : {data: any}) {
    return (
        <table className="w-full p-4">
        <thead className="h-[40px] bg-gray-600 rounded text-white">
          <tr className="capitalize w-full text-sm">
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
              return (<tr key={index} className="font-light text-sm h-[60px] text-center ">
                <td><Link href={`offers/${offer.id}`}>{offer.title}</Link></td>
                <td>{offer.description.substring(0, 20)}</td>
                <td>{offer.type}</td>
                <td>{offer.status}</td>
                <td className="h-[60px] flex justify-evenly items-center">
                <Link href={`offers/${offer.id}/edit`} className=" h-[35px] p-2 rounded flex justify-center items-center">
                    <MdOutlineEditRoad />
                </Link>
                <DeleteOffer id={offer.id} />
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
    )
}
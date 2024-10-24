import Link from "next/link"
import ApplyButton from "./ApplyBtn"

export default function JobsTable({data} : {data: any}) {
    return (
        <table className="w-full p-4">
        <thead className="h-[40px] bg-gray-600 rounded text-white">
          <tr className="capitalize w-full text-sm">
            <th>title</th>
            <th>description</th>
            <th>type</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody className="">
          {
            data?.map(offer => {
              return (<tr key={offer.id} className="font-light text-sm h-[60px] text-center">
                <td><Link href={`/dashboard/offers/${offer.id}`}>{offer.title}</Link></td>
                <td>{offer.description.substring(0, 20)}</td>
                <td>{offer.type}</td>
                <td>{offer.status}</td>
                <td className="h-[60px] flex justify-evenly items-center">
                  <ApplyButton id={offer.id} />
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
    )
}
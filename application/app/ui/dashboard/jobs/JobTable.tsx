import Link from "next/link"
import ApplyButton from "./ApplyBtn"
import { OfferType } from "app/Types"

export default function JobsTable({data} : {data: OfferType[]}) {
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
            data?.map((job : OfferType) => {
              return (
              <tr key={job.id} className="font-light text-sm h-[60px] text-center">
                <td>
                  <Link href={`/dashboard/offers/${job.id}`}>{job.title}</Link>
                </td>
                <td>{job.description.substring(0, 20)}</td>
                <td>{job.type}</td>
                <td>{job.status}</td>
                <td className="h-[60px] flex justify-evenly items-center">
                  <ApplyButton id={job.id} />
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
    )
}
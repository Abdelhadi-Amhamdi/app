import { fetchApplicants } from '../lib/data';

export default async function Applicants() {

    const data = await fetchApplicants()
    return (
        <>
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
                        <button className="bg-orange-300 h-[35px] w-[100px] capitalize p-2 rounded">cancel</button>
                        </td>
                    </tr>)
                    })
                }
                </tbody>
            </table>
        </>
    )
}
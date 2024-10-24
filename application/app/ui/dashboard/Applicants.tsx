import { ImCancelCircle } from 'react-icons/im';
import { fetchApplicants } from '../../data/data';
import { cancelApplicant } from 'app/app/data/actions';


export async function CancelApplicantBtn({ id } : {id : string}) {
    const cancelApplicentWithId = cancelApplicant.bind(null, id)

    return (
        <form action={cancelApplicentWithId}>
            <button type="submit" className="bg-orange-400 text-white h-[35px] w-[100px] capitalize p-2 rounded flex items-center justify-center">
                <span className='mr-2'>cancel</span>
                <ImCancelCircle />
            </button>
        </form>
    )
}

export default async function Applicants() {

    const data = await fetchApplicants()
    return (
        <>
            <table className="w-full p-4">
                <thead className="h-[40px] bg-gray-600 rounded text-white">
                <tr className="capitalize text-sm w-full">
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
                    return (<tr key={index} className="font-light text-sm h-[60px] text-center">
                        <td>{offer.title}</td>
                        <td>{offer.description.substring(0, 20)}</td>
                        <td>{offer.type}</td>
                        <td>{offer.status}</td>
                        <td className="h-[60px] flex justify-evenly items-center">
                            <CancelApplicantBtn id={offer.applicant_id} />
                        </td>
                    </tr>)
                    })
                }
                </tbody>
            </table>
        </>
    )
}
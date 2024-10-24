import { getMyStatus } from 'app/app/data/data';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BiSolidShoppingBagAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { TiThListOutline } from 'react-icons/ti';
import StatusCard from './StatusCard';

const items = [
    {
      title : "applicants",
      icon : <BiSolidShoppingBagAlt />
    },
    {
      title : "offers",
      icon : <TiThListOutline />
    },
    {
      title : "accepted",
      icon : <IoMdCheckmarkCircleOutline />
    },
    {
      title : "pending",
      icon : <AiOutlineClose />
    },
]

export default async function Status() {
    const data = await getMyStatus()
    return (
        <ul className="grid grid-cols-4 gap-4 w-full mt-10">
        {items.map((i, index) => <li key={index} className="w-full h-[160px]">
            <StatusCard data={data} props={i} />
        </li>)}
        </ul>
    )
}
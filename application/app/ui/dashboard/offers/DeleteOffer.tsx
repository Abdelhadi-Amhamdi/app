import { deleteOffer } from "app/app/data/actions"
import { FaTrash } from "react-icons/fa6"

export default function DeleteOffer({id} : {id : string}) {

    const deleteOfferWithId = deleteOffer.bind(null, id)
  
    return (
      <form action={deleteOfferWithId} className=" h-[35px] p-2 rounded flex justify-center items-center">
          <button type="submit" className="w-full h-full">
            <FaTrash />
          </button>
      </form>
    )
  }
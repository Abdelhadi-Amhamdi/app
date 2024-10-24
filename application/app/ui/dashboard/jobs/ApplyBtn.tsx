import { applyToOffer } from "app/app/data/actions"
import { LuUserCheck2 } from "react-icons/lu"



export default async function ApplyButton({id} : {id : string}) {

    const applyToOfferWithId = applyToOffer.bind(null, id)
  
    return (
      <form action={applyToOfferWithId} className="bg-gray-600 text-white h-[35px] w-[100px] p-2 rounded">
        <button type="submit" className="flex justify-center items-center w-full h-full">
          <span className="mr-2">apply</span>
          <LuUserCheck2 />
        </button>
      </form>
    )
  }
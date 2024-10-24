import Applicants from '../../ui/dashboard/Applicants';
import Status from "app/app/ui/dashboard/Status";

export default  function Page() {
  return (
    <div className="w-full">
        <div className="h-[100px] flex items-center px-10 border-b-1 border-black/10">
            <h1 className="uppercase text-2xl font-bold">Home</h1>
        </div>
        <div className="w-full">
          <Status />
        </div>
        <div className='mt-10'>
          <h1 className='capitalize'>recent application history :</h1>
          <div className='mt-4'>
            <Applicants />
          </div>
        </div>
    </div>  
  );
}
import { fetchJobs, searchJob } from "app/app/data/data";
import JobsTable from "app/app/ui/dashboard/jobs/JobTable";
import Search from "app/app/ui/search";
import { OfferType } from "app/Types";

export default async function Page(props : {searchParams? : Promise<{query? : string}>}) {

  const searchParams = await props.searchParams
  let data : OfferType[] | null = null
  if (searchParams?.query) {
    data = await searchJob(searchParams.query)
  } else {
    data = await fetchJobs()
  }

    return (
      <div className="w-full">
        <div className="h-[100px] flex items-center px-10 border-b-1 border-black/10">
            <h1 className="uppercase text-2xl font-bold">Find Jobs</h1>
        </div>
        <div className="flex mt-4">
          <div className="flex-grow mr-2">
            <Search placeholder="search..." />
          </div>
        </div>
        <div className="mt-6 h-full">
          <JobsTable data={data!} />
        </div>
      </div>  
    );
  }
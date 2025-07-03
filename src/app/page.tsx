import { Button } from "@/components/ui/Button"

const page = () => {


  return (
    <div className="flex items-center flex-col h-screen ">
      <div className="mt-24 flex flex-col  items-center ">
        <h1 className="text-4xl">Ultimate Planner</h1>
        <div>
          <Button variant="primary" size="md" text="SignIn" />
        </div>
      </div>
    </div >
  )
}

export default page
import CreateFieldForm from "@/components/fields/CreateFieldForm"
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";


const CreateFieldPage = () => {

    return (
        <div className="bg-green-100 p-4">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold mb-4">Crear campo</h1>
        <button className="flex items-center gap-1 p-1 rounded-md bg-green-300 shadow-md px-4">
          <CheckCircleIcon width={24}/> Guardar
        </button>
      </div>

      <div className="p-2  rounded-md">
        <CreateFieldForm />
      </div>      

    </div>
    )

}

export default CreateFieldPage;
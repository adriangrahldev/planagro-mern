'use client'

import { ChevronRightIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";



export default function HomePage() {

	

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-6 gap-4">
				<div className="bg-green-200 p-2 flex justify-between items-center rounded-md shadow-sm">
					<span className="font-semibold">
						Campos
					</span>
					<span>
						3	
					</span>		
				</div>
				<div className="bg-green-200 p-2 flex justify-between items-center rounded-md shadow-sm">
					<span className="font-semibold">
						Activ. Pendientes
					</span>
					<span>
						8	
					</span>		
				</div>
			</div>
			<hr className="border-green-600" />
			<div className="bg-green-200 p-2 gap-2 flex flex-col rounded-md">
				<div className="flex justify-between">				
					<h2 className="text-lg font-semibold">Próximas actividades</h2>
					<Link href={"/dashboard/activities"} className="underline flex items-center gap-2">
						Ver todas
						<ChevronRightIcon className="h-4 w-4"/>
					</Link>
				</div>
				<div className="bg-white rounded-md">
					<table className="w-full text-left">
						<thead>
							<tr>
								<th className="p-1">Actividad</th>
								<th className="p-1">Campo</th>
								<th className="p-1">Fecha</th>
								<th className="p-1">Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="p-1">Actividad 1</td>
								<td className="p-1">Campo 1</td>
								<td className="p-1">2021-09-01</td>
								<td className="p-1 flex gap-2">
									<button>
										<EyeIcon className="h-5 w-5" />
									</button>
									<button>
										<PencilIcon className="h-5 w-5"/>
									</button>
									<button>
										<TrashIcon className="h-5 w-5"/>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

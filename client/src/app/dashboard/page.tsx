'use client'

import { ActivitiesTable } from "@/components/activities/ActivitiesTable";
import { useUser } from "@/contexts/UserContext";
import { DashboardService } from "@/services/DashboardService";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardData {
	fieldsCount: number;
	activitiesCount: number;
	nextActivities: any[];

}


export default function HomePage() {
const { user } = useUser();

	const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

	const getDashboardData = async () => {
		DashboardService.getDashboardData(user?.authToken || "").then((data: DashboardData) => {
			console.log(data);
			setDashboardData(data);
		}).catch((error) => {
			console.error(error);
		});

	}

	useEffect(() => {
		if (user) {
			getDashboardData();
		}
	}
	, [user]);
	
	const handleDeleteActivity = async (activityId: string) => {
		try {
			const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}`, {
				headers: {
					'Authorization': `Bearer ${user?.authToken}`,
				},
			});
			console.log(response.data);
			getDashboardData();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-6 gap-4">
				<div className="bg-green-200 p-2 flex justify-between items-center rounded-md shadow-sm">
					<span className="font-semibold">
						Campos
					</span>
					<span>
						{dashboardData?.fieldsCount || 0}
					</span>		
				</div>
				<div className="bg-green-200 p-2  w-48 flex justify-between items-center rounded-md shadow-sm">
					<span className="font-semibold">
						Activ. Pendientes
					</span>
					<span>
						{dashboardData?.activitiesCount || 0}
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
					<ActivitiesTable activities={dashboardData?.nextActivities || []} handleDelete={handleDeleteActivity} />
				</div>
			</div>
		</div>
	);
}

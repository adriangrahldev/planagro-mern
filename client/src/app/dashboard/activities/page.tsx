"use client"
import { ActivitiesTable } from "@/components/activities/ActivitiesTable";
import { useUser } from "@/contexts/UserContext";
import { Activity } from "@/interfaces/activity.interface";
import ActivityService from "@/services/ActivityService";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

 const ActivitiesPage = () => {

  const {user} = useUser();

  const [activities, setActivities] = useState<Activity[]>([]);

  
  useEffect(() => {
    if(user){
      fetchActivities();
    }

  }, [user]);

  const fetchActivities = async () => {
    try {
      const authToken = user?.authToken || ''; // Provide a default value of an empty string if authToken is undefined
      const activities = await ActivityService.getActivities(authToken);
      setActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="bg-green-100 p-4">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold mb-4">Actividades</h1>
        <Link href="/dashboard/activities/create" className="flex items-center gap-1 p-1 rounded-md bg-green-300 shadow-md">
          <PlusCircleIcon width={24}/> Agregar actividad
        </Link>
      </div>

      <div className="p-2 bg-white rounded-md">
        <ActivitiesTable activities={activities} />
      </div>      

    </div>
  );
};
export default ActivitiesPage;
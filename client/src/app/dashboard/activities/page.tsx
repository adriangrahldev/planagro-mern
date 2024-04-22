"use client";
import * as XLSX from "xlsx";

import { ActivitiesTable } from "@/components/activities/ActivitiesTable";
import { useUser } from "@/contexts/UserContext";
import { Activity } from "@/interfaces/activity.interface";
import { Field } from "@/interfaces/field.interface";
import ActivityService from "@/services/ActivityService";
import { ArrowDownOnSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const ActivitiesPage = () => {
  const { user } = useUser();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const fetchActivities = async () => {
    try {
      const authToken = user?.authToken || ""; // Provide a default value of an empty string if authToken is undefined
      const activities = await ActivityService.getActivities(authToken);
      setActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (activityId: string) => {
    try {
      await ActivityService.deleteActivity(activityId,user?.authToken || "");
      setActivities(activities.filter((activity) => activity._id !== activityId));
    } catch (error) {
      console.error(error);
    }
  }

  const onGetExportActivities = async (title?: string, worksheetname?: string) => {
    try {
      // Check if the action result contains data and if it's an array
      if (activities && Array.isArray(activities)) {
        // filtrar las actividades por estado
        let filteredActivities = activities;
        if (statusFilter !== "all") {
          filteredActivities = activities.filter((activity) => activity.status === statusFilter);
        }
        const dataToExport = filteredActivities.map((activity: Activity) => ({
          TITULO: activity.title,
          DESCRIPCION: activity.description,
          CAMPO: (activity.targetField as Field).name,
          FECHA: new Date(activity.date.split("T")[0]+" 12:00:00").toLocaleDateString(),
          ESTADO: activity.status === "completed" ? "Completada" : "Pendiente",
        })
          ,);
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.log("#==================Export Error")
      }
    } catch (error: any) {
      console.log("#==================Export Error", error.message);

    }
  };
  return (
    <div className="bg-green-100 p-4">
      <div className="flex items-start justify-between">
      <div className="flex gap-12">
        <h1 className="text-xl font-semibold mb-4">Actividades</h1>
        <select name="" id=""
        className=" rounded-md min-w-44 bg-white h-7 border-gray-300 shadow-md"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/activities/create"
            className="flex items-center gap-1 p-1 rounded-md bg-green-300 shadow-md"
          >
            <PlusCircleIcon width={24} /> Agregar actividad
          </Link>
          <button type="button" onClick={
            () => onGetExportActivities("Actividades", "Actividades")
          } className="flex items-center gap-1 p-1 rounded-md bg-white text-green-600 border-[2px] border-green-500 shadow-md">
            <ArrowDownOnSquareIcon width={24}/> Exportar
          </button>

        </div>
      </div>

      <div className="p-2 bg-white rounded-md">
        <ActivitiesTable statusFilter={statusFilter} activities={activities} handleDelete={handleDelete} />
      </div>
    </div>
  );
};
export default ActivitiesPage;

"use client";
import EditActivityForm from "@/components/activities/EditActivityForm";
import Loading from "@/components/commons/loading";
import EditFieldForm from "@/components/fields/EditFieldForm";
import { useUser } from "@/contexts/UserContext";
import { Activity } from "@/interfaces/activity.interface";
import { Field } from "@/interfaces/field.interface";
import ActivityService from "@/services/ActivityService";
import FieldService from "@/services/FieldService";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const EditActivityPage = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [activity, setActivity] = useState<Activity | null>(null);

  const { user } = useUser();

  const onSubmitEdit = async (event: FormEvent) => {
    try {
      const data = new FormData(event.target as HTMLFormElement);
      const ActivityData = {
        title: data.get("title") as string,
        description: data.get("description") as string,
        date: data.get("date") as string,
        status: data.get("status") as string,
        targetField: data.get("targetField") as string,
    };
      ActivityService.updateActivity(id, ActivityData, user?.authToken || "")
        .then((activity) => {
          setActivity(activity);
          router.back();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getActivity = async () => {
    try {
      ActivityService.getActivityById(id, user?.authToken || "").then((activity) => {
        setActivity(activity);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getActivity();
    }
  }, [user]);

  if (!activity) {
    return <Loading />;
  }

  return(
    <div className="bg-gray-50 rounded p-4 shadow">
    <div className="flex items-start justify-between">
      <h1 className="text-xl font-semibold mb-4">Modificar actividad</h1>
    </div>
    <hr />
    <div className="p-2  rounded-md">
      <EditActivityForm onSubmitEdit={onSubmitEdit} activity={activity}/>
    </div>
  </div>
  )
};

export default EditActivityPage;

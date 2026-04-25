import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { EditProfile } from "./EditProfile";
import { Logout } from "./Logout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Home,
  Search,
  Users,
  Star,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile() {
  const { userData } = useContext(UserContext);

  const profileImage =
  userData?.images?.[0]?.url || undefined;
  if(userData?.images.length != 0){
    /*userData.images.forEach(element => {
      if(element.IsProfile){
        profileImage = element.url;
      }
    });*/
  }

  if (!userData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        No user is currently logged in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-10">

      <div className="max-w-4xl mx-auto space-y-6">

        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Your profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your account and preferences
          </p>
        </div>

        <Card className="border shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div className="flex items-center gap-4">
              <Avatar className="h-15 w-15 transition">
                <AvatarImage src={profileImage} />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold text-lg">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-sm text-slate-500">
                  {userData.email}
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <EditProfile />
              <Button
                onClick={() => (window.location.href = "/setupprofile")}
                className="rounded-xl px-4 py-2 text-white"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Setup profile
              </Button>
              <Logout />
            </div>
          </CardContent>
        </Card>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <InfoCard icon={<Mail size={16} />} label="Email" value={userData.email} />
          <InfoCard icon={<Phone size={16} />} label="Phone" value={userData.phoneNumber} />

          <InfoCard
            icon={<Home size={16} />}
            label="Has house"
            value={userData.hasHouse ? "Yes" : "No"}
          />

          <InfoCard
            icon={<Search size={16} />}
            label="Looking for house"
            value={userData.lookingForHouse ? "Yes" : "No"}
          />

          <InfoCard
            icon={<Users size={16} />}
            label="Looking for roommate"
            value={userData.lookingForPeople ? "Yes" : "No"}
          />

          <InfoCard
            icon={<Star size={16} />}
            label="Rating"
            value={`${userData.rating ?? 0} / 5`}
          />
        </div>

        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Settings size={16} className="text-purple-600" />
              Account status
            </h2>

            <div className="flex flex-wrap gap-2">
              {userData.hasHouse && (
                <Badge label="Home owner" />
              )}
              {userData.lookingForHouse && (
                <Badge label="Searching house" />
              )}
              {userData.lookingForPeople && (
                <Badge label="Looking for roommates" />
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition border">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <span className="text-purple-600">{icon}</span>
          {label}
        </div>
        <div className="font-medium text-slate-800 text-sm">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 border border-purple-200">
      {label}
    </span>
  );
}
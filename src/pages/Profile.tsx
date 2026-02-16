import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { EditProfile } from "./EditProfile";
import { Card, CardTitle } from "@/components/ui/card";
import {
  FieldGroup,
  FieldSeparator,
  FieldLabel,
  Field,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function Profile() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {userData ? (
        <div className="flex justify-center mt-10">
          <Card className="card w-full max-w-sm p-6">
            <CardTitle className="text-center text-xl font-bold">
              Profile data
            </CardTitle>
            <FieldSeparator />
            <FieldGroup className="grid max-w-sm grid-cols-2">
              <Field>
                <FieldLabel>First Name:</FieldLabel> {userData.firstName}
              </Field>
              <Field>
                <FieldLabel>Last Name:</FieldLabel> {userData.lastName}
              </Field>
            </FieldGroup>
            <div className="flex items-center gap-2">
              <Label>Email:</Label> {userData.email}
            </div>
            <div className="flex items-center gap-2">
              <Label>Phone Number:</Label> {userData.phoneNumber}
            </div>
            <div className="flex items-center gap-2">
              <Label>Has House to Rent:</Label>
              {userData.hasHouse ? "Yes" : "No"}
            </div>
            <div className="flex items-center gap-2">
              <Label>Looking for House:</Label>
              {userData.lookingForHouse ? "Yes" : "No"}
            </div>
            <div className="flex items-center gap-2">
              <Label>Looking for Roommate:</Label>
              {userData.lookingForPeople ? "Yes" : "No"}
            </div>

            <EditProfile />
            <Button
              onClick={() => {
                window.location.href = "/setupprofile";
              }}
            >
              Setup profile
            </Button>
          </Card>
        </div>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
}

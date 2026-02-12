import { useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function EditProfile() {
  const context = useContext(UserContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>You can edit your profile here</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            handleSubmit(e, context);
          }}
        >
          <FieldGroup className="gap-1">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={context.userData?.firstName}
                required
              />
              <FieldDescription
                id="firstNameErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={context.userData?.lastName}
                required
              />
              <FieldDescription
                id="lastNameErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={context.userData?.phoneNumber}
                required
              />
              <FieldDescription
                id="phoneErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={context.userData?.email}
                required
              />
            </Field>
            <Field>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="hasHouse">
                  Do you wanna rent house out for others
                </FieldLabel>
                <Checkbox
                  id="hasHouse"
                  name="hasHouse"
                  defaultChecked={context.userData?.hasHouse}
                />
              </div>
              <FieldDescription
                id="hasHouseErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>

            <Field>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="lookingForHouse">
                  Are you looking for a house
                </FieldLabel>
                <Checkbox
                  id="lookingForHouse"
                  name="lookingForHouse"
                  defaultChecked={context.userData?.lookingForHouse}
                />
              </div>
              <FieldDescription
                id="lookingForPeopleErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>

            <Field>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="lookingForPeople">
                  Are you looking for a roommate
                </FieldLabel>
                <Checkbox
                  id="lookingForPeople"
                  name="lookingForPeople"
                  defaultChecked={context.userData?.lookingForHouse}
                />
              </div>
              <FieldDescription
                id="lookingForPeopleErr"
                className="text-red-600 text-sm mt-1"
              ></FieldDescription>
            </Field>
          </FieldGroup>
          <DialogFooter>
            {/*<DialogClose asChild>*/}
            <Button type="submit">Save changes</Button>
            {/*</DialogClose>*/}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
) {
  e.preventDefault();

  console.log(context.userData);

  const confirmed = window.confirm(
    "Are you sure you want to change your data?",
  );

  if (!confirmed) {
    return;
  }

  const form = new FormData(e.currentTarget);
  //TODO: check wether they actually changed something
  //TODO: check if any of the required fields are empty

  const firstName = (form.get("firstName") as string) || undefined;
  const lastName = (form.get("lastName") as string) || undefined;
  const phoneNumber = (form.get("phoneNumber") as string) || undefined;
  const hasHouse = form.has("hasHouse");
  const lookingForPeople = form.has("lookingForPeople");
  const lookingForHouse = form.has("lookingForHouse");
  const email = (form.get("email") as string) || undefined;

  // Validation regex patterns
  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/; // Simplified email regex
  const regexPhone =
    /^\+?\d{1,3}[-\s\.]?\(?\d{2,3}\)?[-\s\.]?\d{3}[-\s\.]?\d{4,6}$/; // Simplified phone number regex

  switch (true) {
    case !firstName || !lastName || !phoneNumber || !email:
      console.log("Please fill in all fields.");
      return;
    case !regexEmail.test(email as string):
      console.log("Please enter a valid email address.");
      return;
    case !regexPhone.test(phoneNumber as string):
      console.log("Please enter a valid phone number.");
      return;
  }

  try {
    await context.changeUserData?.({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      hasHouse: hasHouse,
      lookingForPeople: lookingForPeople,
      lookingForHouse: lookingForHouse,
    });
    alert("Profile updated successfully"); //change later to better notification
    window.location.href = "/profile";
  } catch (err) {
    alert((err as Error).message); //change later to better error notification
  }
}

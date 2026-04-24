import { useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  Dialog,
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
import { isDate } from "date-fns";

export function EditProfile() {
  const context = useContext(UserContext);

  const birthday = context.userData?.birthDay
    ? new Date(context.userData.birthDay).toISOString().split("T")[0]
    : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="card sm:max-w-lg max-h-[85vh] overflow-y-auto flex flex-col rounded-2xl p-0">
        {/* HEADER */}
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-muted">
          <DialogTitle className="text-lg font-semibold">
            Edit your profile
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Keep your information up to date
          </DialogDescription>
        </DialogHeader>

        <form
          className="form-scope flex flex-col gap-5 px-6 py-5"
          onSubmit={async (e) => {
            handleSubmit(e, context);
          }}
        >
          <FieldGroup className="space-y-4">

            {/* NAME ROW */}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={context.userData?.firstName}
                  required
                  className="rounded-xl focus-visible:ring-[var(--color-accent)]"
                />
                <FieldDescription
                  id="firstNameErr"
                  className="text-red-600 text-sm mt-1"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={context.userData?.lastName}
                  required
                  className="rounded-xl focus-visible:ring-[var(--color-accent)]"
                />
                <FieldDescription
                  id="lastNameErr"
                  className="text-red-600 text-sm mt-1"
                />
              </Field>
            </div>

            {/* BIRTHDAY */}
            <Field>
              <FieldLabel htmlFor="age">
                Birthday <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type="date"
                name="age"
                id="age"
                defaultValue={birthday}
                className="rounded-xl focus-visible:ring-[var(--color-accent)]"
              />
              <FieldDescription
                id="ageErr"
                className="text-red-600 text-sm mt-1"
              />
            </Field>

            {/* CONTACT ROW */}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={context.userData?.phoneNumber}
                  required
                  className="rounded-xl focus-visible:ring-[var(--color-accent)]"
                />
                <FieldDescription
                  id="phoneErr"
                  className="text-red-600 text-sm mt-1"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={context.userData?.email}
                  required
                  className="rounded-xl focus-visible:ring-[var(--color-accent)]"
                />
                <FieldDescription
                  id="emailErr"
                  className="text-red-600 text-sm mt-1"
                />
              </Field>
            </div>

            {/* CHECKBOXES */}
            <div className="space-y-3 pt-2">

              <Field>
                <div
                  className="flex items-center justify-between rounded-xl border p-3"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <FieldLabel htmlFor="hasHouse" className="text-sm">
                    Rent out your house
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
                />
              </Field>

              <Field>
                <div
                  className="flex items-center justify-between rounded-xl border p-3"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <FieldLabel htmlFor="lookingForHouse" className="text-sm">
                    Looking for house
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
                />
              </Field>

              <Field>
                <div
                  className="flex items-center justify-between rounded-xl border p-3"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <FieldLabel htmlFor="lookingForPeople" className="text-sm">
                    Looking for roommate
                  </FieldLabel>
                  <Checkbox
                    id="lookingForPeople"
                    name="lookingForPeople"
                    defaultChecked={context.userData?.lookingForPeople}
                  />
                </div>
                <FieldDescription
                  id="lookingForPeopleErr"
                  className="text-red-600 text-sm mt-1"
                />
              </Field>

            </div>

          </FieldGroup>

          {/* FOOTER */}
          <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t border-muted">
            <Button
              type="submit"
              className="w-full rounded-xl text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Save changes
            </Button>
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

  if (!confirmed) return;

  const form = new FormData(e.currentTarget);

  const firstName = (form.get("firstName") as string) || undefined;
  const lastName = (form.get("lastName") as string) || undefined;
  const phoneNumber = (form.get("phoneNumber") as string) || undefined;
  const hasHouse = form.has("hasHouse");
  const lookingForPeople = form.has("lookingForPeople");
  const lookingForHouse = form.has("lookingForHouse");
  const email = (form.get("email") as string) || undefined;

  const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const regexPhone =
    /^\+?\d{1,3}[-\s.]?\(?\d{2,3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;

  let hasError = false;

  /**------------------------------- Validation -------------------------------*/

  /** Name validation */
  if (!firstName || !lastName) {
    document.getElementById("firstNameErr")?.append("Please fill in all fields");
    hasError = true;
  }

  /** Email validation */
  if (!email) {
    document
      .getElementById("emailErr")
      ?.append("Please enter an email address");
    hasError = true;
  } else if (!regexEmail.test(email as string)) {
    document.getElementById("emailErr")?.append("Invalid Email");
    hasError = true;
  }

  /** Phone number validation */
  if (!phoneNumber) {
    document.getElementById("phoneErr")?.append("Please enter a phone number");
    hasError = true;
  } else if (!regexPhone.test(phoneNumber as string)) {
    document.getElementById("phoneErr")?.append("Invalid phone number format");
    hasError = true;
  }

  /** Age validation */
  /** User must be at least 18 years old */
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const birth = (form.get("age") as string) || null;
  const birthDay = new Date(birth as string);

  if (!birthDay) {
    hasError = true;
    document.getElementById("ageErr")?.append("Please enter your birthday");
  } else if (!(isDate(birthDay) && eighteenYearsAgo > birthDay)) {
    hasError = true;
    document
      .getElementById("ageErr")
      ?.append("User must be at least 18 years old");
  }

  if (hasError) return;

  try {
    await context.changeUserData?.({
      firstName,
      lastName,
      birthDay,
      phoneNumber,
      email,
      hasHouse,
      lookingForPeople,
      lookingForHouse,
    });

    alert("Profile updated successfully");
    window.location.href = "/profile";
  } catch (err) {
    alert((err as Error).message);
  }
}
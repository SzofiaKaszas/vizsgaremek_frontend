import { useContext, useEffect, useState } from "react";
import Languages from "../assets/languages";
import { UserContext } from "../context/userContext";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { Genders } from "@/assets/genders";
import type { GoNextProp } from "@/interfaces";
import filter from "leo-profanity";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export function RoommateProfile({ goNext }: GoNextProp) {
  const context = useContext(UserContext);

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");

  // NEW IMAGE STATE (PLUS FEATURE)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (context.userData?.gender) {
      setGender(context.userData.gender);
    }

    if (context.userData?.language) {
      setLanguage(context.userData.language);
    }

    setShowEmailInput(!!context.userData?.connectionEmail);
  }, [context.userData]);

  // NEW: upload handler (keeps backend logic intact)
  const handleImageUpload = async () => {
    if (!selectedFile) return;
    if (images.length >= 8) return;

    setUploading(true);

    try {
      await context.uploadUserImage(selectedFile);

      // preview only (backend doesn't return URL)
      const previewUrl = URL.createObjectURL(selectedFile);

      setImages((prev) => [...prev, previewUrl]);
      setSelectedFile(null);

      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <form
        className="space-y-6 sm:space-y-7 px-1 sm:px-2"
        onSubmit={(e) => handleSubmit(e, context, goNext)}
      >
        {/* HEADER */}
        <div className="text-center space-y-1 sm:space-y-2">
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Your Profile
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tell others who you are
          </p>
        </div>

        {/* BIO */}
        <Field>
          <FieldLabel htmlFor="userBio">About you</FieldLabel>
          <Textarea
            name="userBio"
            id="userBio"
            placeholder="I'm 20, I love skateboarding..."
            defaultValue={context.userData?.userBio}
            className="min-h-[90px] sm:min-h-[110px]"
          />
          <FieldDescription id="userBioErr" className="text-xs text-red-500 mt-1" />
        </Field>

        {/* GENDER */}
        <Field>
          <FieldLabel htmlFor="gender">Your Gender:</FieldLabel>
          <Combobox
            items={Genders}
            name="gender"
            value={gender}
            onValueChange={(value) => setGender(value ?? "")}
          >
            <ComboboxInput placeholder="Select a gender" id="gender" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <FieldDescription id="genderErr" className="text-red-600 text-sm mt-1" />
          <input type="hidden" name="gender" />
        </Field>

        {/* LANGUAGE */}
        <Field>
          <FieldLabel htmlFor="language">Language you speak:</FieldLabel>
          <Combobox
            items={Languages}
            name="language"
            value={language}
            onValueChange={(value) => setLanguage(value ?? "")}
          >
            <ComboboxInput placeholder="Select a language" id="language" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <FieldDescription id="languageErr" className="text-red-600 text-sm mt-1" />
          <input type="hidden" name="language" />
        </Field>

        {/* OCCUPATION */}
        <Field>
          <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
          <Input
            name="occupation"
            placeholder="Teacher, Developer..."
            defaultValue={context.userData?.occupation}
          />
          <FieldDescription id="occErr" className="text-xs text-red-500 mt-1" />
        </Field>

        {/* EMAIL SWITCH */}
        <div className="flex items-center justify-between rounded-2xl border border-muted/60 bg-white px-4 py-4 shadow-sm hover:shadow-md transition">
          <div className="space-y-0.5">
            <FieldLabel className="text-sm font-medium" htmlFor="wantsConnectionEmail">
              Separate contact email
            </FieldLabel>
            <p className="text-xs text-muted-foreground">
              Use a different email for contact
            </p>
          </div>

          <div className="scale-110">
            <Checkbox
              id="wantsConnectionEmail"
              name="wantsConnectionEmail"
              checked={showEmailInput}
              onCheckedChange={(c) => setShowEmailInput(!!c)}
            />
          </div>
        </div>

        {/* EMAIL */}
        {showEmailInput && (
          <Field>
            <FieldLabel htmlFor="connectionEmail">Contact email</FieldLabel>
            <Input
              type="email"
              name="connectionEmail"
              placeholder="you@email.com"
              defaultValue={context.userData?.connectionEmail}
            />
            <FieldDescription id="emailErr" className="text-xs text-red-500 mt-1" />
          </Field>
        )}

        {/* NEW MULTI IMAGE UPLOAD SYSTEM */}
        <Field>
          <FieldLabel>Images (max 8)</FieldLabel>

          <div className="flex gap-2 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />

            <Button
              type="button"
              onClick={handleImageUpload}
              disabled={!selectedFile || images.length >= 8 || uploading}
              className="bg-accent text-white"
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {images.length}/8 uploaded
          </p>

          {/* PREVIEW */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </Field>

        {/* BACKEND ERROR */}
        <FieldDescription id="backendErr" className="text-xs text-red-500" />

        {/* BUTTONS */}
        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-2.5"
          >
            Next
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-accent text-accent rounded-xl py-2.5"
            onClick={goNext}
          >
            Skip
          </Button>
        </div>
      </form>
    </>
  );
}

/**Main handleSubmit function for updating user profile */
async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  context: React.ContextType<typeof UserContext>,
  goNext: () => void,
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);
  const userBio = (form.get("userBio") as string) || null;
  const gender = (form.get("gender") as string) || null;
  const language = (form.get("language") as string) || null;
  const occupation = (form.get("occupation") as string) || null;
  const wantsConnectionEmail = form.get("wantsConnectionEmail") === "on";

  let connectionEmail = null;

  if (wantsConnectionEmail) {
    connectionEmail = (form.get("connectionEmail") as string) || null;
    document.getElementById("emailErr")!.innerHTML = "";
  }

  document.getElementById("userBioErr")!.innerHTML = "";
  document.getElementById("occErr")!.innerHTML = "";
  document.getElementById("genderErr")!.innerHTML = "";
  document.getElementById("languageErr")!.innerHTML = "";
  document.getElementById("backendErr")!.innerHTML = "";

  let hasError = false;

  if (userBio && filter.check(userBio)) {
    document.getElementById("userBioErr")!.append(
      "Inappropriate content detected in user bio"
    );
    hasError = true;
  }

  if (occupation && filter.check(occupation)) {
    document.getElementById("occErr")!.append(
      "Inappropriate content detected in occupation"
    );
    hasError = true;
  }

  const emailRegex =
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (wantsConnectionEmail) {
    const connectionEmail = form.get("connectionEmail") as string;

    if (!connectionEmail || !emailRegex.test(connectionEmail)) {
      document.getElementById("emailErr")!.append("Invalid Email");
      hasError = true;
    }
  }

  if (hasError) return;

  try {
    context.changeUserData({
      userBio: userBio as string,
      gender: gender as string,
      language: language as string,
      occupation: occupation as string,
      connectionEmail: connectionEmail as string,
    });

    toast.success("Profile data saved successfully");

    setTimeout(() => {
      goNext();
    }, 800);
  } catch (error) {
    document.getElementById("backendErr")!.innerHTML =
      (error as Error).message;
  }
}
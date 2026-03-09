import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserContext } from "@/context/userContext";
import type { DialogContentProps, User } from "@/interfaces";
import { useContext, useEffect, useState } from "react";

export function FindRoommateDialogContent(props: DialogContentProps) {
  const context = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await context.getUserById(props.id);
      setSelectedUser(user);
    };
    fetchUser();
  }, [props.id, context]);

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedUser
              ? `${selectedUser.firstName} ${selectedUser.lastName} - ${selectedUser.age}`
              : "Loading..."}
          </DialogTitle>
          <DialogDescription>
            {selectedUser ? `${selectedUser.gender}` : "Loading..."}
          </DialogDescription>
        </DialogHeader>
        {selectedUser ? `${selectedUser.userBio}` : ``}
      </DialogContent>
    </>
  );
}

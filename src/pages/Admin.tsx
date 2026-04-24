import { useContext, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { useNavigate } from "react-router";
import { UserContext } from "@/context/userContext";
import type { RateHouse, RateUser, User } from "@/interfaces";

type Tab = "create" | "admins" | "roommates" | "houses";

export function Admin() {
  const context = useContext(UserContext);

  const [admins, setAdmins] = useState<User[]>([]);
  const [roommateRatings, setRoommateRatings] = useState<RateUser[]>([]);
  const [houseRatings, setHouseRatings] = useState<RateHouse[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("create");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    email: "",
    backend: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;

    const timeout = setTimeout(() => {
      navigate("/");
    }, 300000);

    return () => clearTimeout(timeout);
  }, [loading, navigate]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const [a, r1, r2] = await Promise.all([
        context.adminList(),
        context.pendingRoommateRatings(),
        context.pendingHouseRatingList(),
      ]);

      setAdmins(a);
      setRoommateRatings(r1);
      setHouseRatings(r2);

      setLoading(false);
    }

    load();
  }, [context]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      email: "",
      backend: "",
    };

    let hasError = false;

    // NAME
    if (!form.firstName) {
      newErrors.firstName = "First name required";
      hasError = true;
    }

    if (!form.lastName) {
      newErrors.lastName = "Last name required";
      hasError = true;
    }

    // EMAIL VALIDATION (DTO STYLE)
    const emailRegex =
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    if (!form.email) {
      newErrors.email = "Please enter an email address";
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    // PHONE
    const phoneRegex =
      /^\+?[0-9]{1,3}([-\s.]?[0-9]{2,4}){2,4}$/;

    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone required";
      hasError = true;
    } else if (!phoneRegex.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone format";
      hasError = true;
    }

    // PASSWORD
    const hasMin = /.{6,}/.test(form.password);
    const hasUpper = /[A-Z]/.test(form.password);
    const hasNumber = /[0-9]/.test(form.password);

    if (!form.password) {
      newErrors.password = "Password required";
      hasError = true;
    } else {
      const msgs = [];
      if (!hasMin) msgs.push("Min 6 characters");
      if (!hasUpper) msgs.push("1 uppercase letter needed");
      if (!hasNumber) msgs.push("1 number needed");

      if (msgs.length) {
        newErrors.password = msgs.join(", ");
        hasError = true;
      }
    }

    setErrors(newErrors);
    return !hasError;
  }

  async function handleCreateAdmin() {
    setErrors((p) => ({ ...p, backend: "" }));

    if (!validate()) return;

    try {
      await context.createAdmin(form);

      const updated = await context.adminList();
      setAdmins(updated);

      setForm({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        email: "",
      });

      setActiveTab("admins");
    } catch (err: any) {
      setErrors((p) => ({
        ...p,
        backend: err?.message || "Something went wrong",
      }));
    }
  }

  async function approveRoommate(id: number) {
    await context.approveRoommateRating(id);
    setRoommateRatings((prev) => prev.filter((r) => r.id !== id));
  }

  async function approveHouse(id: number) {
    await context.approveHouseRating(id);
    setHouseRatings((prev) => prev.filter((r) => r.id !== id));
  }

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* TABS */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "create", label: "Create Admin" },
          { id: "admins", label: "Admins" },
          { id: "roommates", label: "Roommate Ratings" },
          { id: "houses", label: "House Ratings" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as Tab)}
            className="px-4 py-2 rounded border text-sm"
            style={{
              backgroundColor:
                activeTab === t.id ? "var(--color-accent)" : "transparent",
              color: activeTab === t.id ? "white" : "inherit",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CREATE ADMIN */}
      {activeTab === "create" && (
        <div className="border rounded-xl p-4 space-y-3 max-w-lg">

          <h2 className="font-semibold">Create Admin</h2>

          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <p className="text-xs text-red-500">{errors.firstName}</p>

          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <p className="text-xs text-red-500">{errors.lastName}</p>

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <p className="text-xs text-red-500">{errors.email}</p>

          <input
            name="phoneNumber"
            placeholder="Phone number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <p className="text-xs text-red-500">{errors.phoneNumber}</p>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
          <p className="text-xs text-red-500">{errors.password}</p>

          <button
            onClick={handleCreateAdmin}
            className="w-full px-4 py-2 rounded text-white"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Add Admin
          </button>

          {errors.backend && (
            <p className="text-red-500 text-sm">{errors.backend}</p>
          )}
        </div>
      )}

      {/* ADMINS */}
      {activeTab === "admins" && (
        <div className="space-y-2">
          {admins.map((a) => (
            <div
              key={a.idUser}
              className="border rounded-xl p-3 flex justify-between"
            >
              <span className="text-sm">{a.email}</span>
              <span className="text-xs text-muted-foreground">
                ID: {a.idUser}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ROOMMATES */}
      {activeTab === "roommates" && (
        <div className="space-y-2">
          {roommateRatings.map((r) => (
            <div
              key={r.id}
              className="border rounded-xl p-3 flex justify-between"
            >
              <div>
                <p className="text-sm font-medium">
                  Rating: {r.ratingScore}
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.ratingMessage}
                </p>
              </div>

              <button
                onClick={() => approveRoommate(r.id)}
                className="px-3 py-1 rounded text-white text-xs"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}

      {/* HOUSES */}
      {activeTab === "houses" && (
        <div className="space-y-2">
          {houseRatings.map((r) => (
            <div
              key={r.id}
              className="border rounded-xl p-3 flex justify-between"
            >
              <div>
                <p className="text-sm font-medium">
                  Rating: {r.ratingScore}
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.ratingMessage}
                </p>
              </div>

              <button
                onClick={() => approveHouse(r.id)}
                className="px-3 py-1 rounded text-white text-xs"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useContext, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { useNavigate } from "react-router";
import { UserContext } from "@/context/userContext";
import type { RateHouse, RateUser, User } from "@/interfaces";

/*if rating is long create admin becomes longer too and pushes house rating down*/
export function Admin() {
  const context = useContext(UserContext);

  const [admins, setAdmins] = useState<User[]>([]);
  const [roommateRatings, setRoommateRatings] = useState<RateUser[]>([]);
  const [houseRatings, setHouseRatings] = useState<RateHouse[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;

    const timeout = setTimeout(() => {
      navigate("/");
    }, 300000); // 5 perc

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

  async function handleCreateAdmin() {
    if (!email) return;

    await context.createAdmin({ email } as any);

    const updated = await context.adminList();
    setAdmins(updated);

    setEmail("");
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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {/* CREATE ADMIN */}
      <div className="border p-4 rounded-xl">
        <h2 className="font-semibold mb-3">Create Admin</h2>

        <div className="flex gap-2">
          <input
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />

          <button
            onClick={handleCreateAdmin}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* ADMIN LIST */}
      <div>
        <h2 className="font-semibold mb-3">Admins</h2>

        <div className="space-y-2">
          {admins.map((a) => (
            <div
              key={a.idUser}
              className="p-3 border rounded-lg flex justify-between"
            >
              <span>{a.email}</span>
              <span className="text-sm text-gray-500">ID: {a.idUser}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROOMMATE RATINGS */}
      <div>
        <h2 className="font-semibold mb-3">Roommate Ratings</h2>

        <div className="space-y-2">
          {roommateRatings.map((r) => (
            <div
              key={r.id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">Rating: {r.ratingScore}</p>
                <p className="text-sm text-gray-500">{r.ratingMessage}</p>
              </div>

              <button
                onClick={() => approveRoommate(r.id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HOUSE RATINGS */}
      <div>
        <h2 className="font-semibold mb-3">House Ratings</h2>

        <div className="space-y-2">
          {houseRatings.map((r) => (
            <div
              key={r.id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">Rating: {r.ratingScore}</p>
                <p className="text-sm text-gray-500">{r.ratingMessage}</p>
              </div>

              <button
                onClick={() => approveHouse(r.id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
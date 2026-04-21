import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Home,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function Main() {
  const { currentUserId } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* ================= GUEST VIEW ================= */}
      {!currentUserId && <GuestView />}

      {/* ================= LOGGED IN VIEW ================= */}
      {currentUserId && <DashboardView />}

    </div>
  );
}

/* =======================================================
   👋 GUEST VIEW (marketing / onboarding)
======================================================= */
function GuestView() {
  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Find your perfect{" "}
          <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            roommate
          </span>
        </h1>

        <p className="text-slate-600 max-w-xl mx-auto mb-8">
          Join a smarter way to find roommates and housing. Fast, simple,
          and tailored to your lifestyle.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            onClick={() => (window.location.href = "/register")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl"
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-2 rounded-xl"
          >
            Login
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-semibold text-center mb-10">
          Why choose us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users size={20} />}
            title="Smart matching"
            desc="Find compatible roommates based on lifestyle."
          />
          <FeatureCard
            icon={<Home size={20} />}
            title="Housing made easy"
            desc="Discover listings tailored to your needs."
          />
          <FeatureCard
            icon={<Sparkles size={20} />}
            title="Modern experience"
            desc="Clean, fast and intuitive platform."
          />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <Card className="text-center border shadow-sm">
          <CardContent className="py-10">
            <p className="text-slate-600 mb-2">
              “I found my roommate in less than 3 days.”
            </p>
            <p className="text-sm text-slate-400">— Happy user</p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

/* =======================================================
   🔐 DASHBOARD VIEW (logged in)
======================================================= */
function DashboardView() {
  return (
    <>
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back 👋
        </h1>
        <p className="text-slate-600">
          Here’s what’s happening in your network today.
        </p>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "New matches", value: "12" },
            { label: "Messages", value: "5" },
            { label: "Likes", value: "18" },
            { label: "Views", value: "42" },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-sm">
              <CardContent className="py-6 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionCard icon={<Users size={18} />} title="Find roommates" link="/findroomate" />
          <ActionCard icon={<Home size={18} />} title="Find housing" link="/findhouse" />
          <ActionCard icon={<Heart size={18} />} title="Your likes" link="/likes" />
        </div>
      </section>

      {/* ACTIVITY FEED */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-lg font-semibold mb-4">Recent activity</h2>

        <Card className="shadow-sm">
          <CardContent className="divide-y">
            {[
              "Anna liked your profile",
              "New match: David",
              "3 new listings near you",
            ].map((item, i) => (
              <div key={i} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-700">
                  <MessageCircle size={16} className="text-purple-500" />
                  {item}
                </div>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

/* =======================================================
   COMPONENTEK
======================================================= */

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-purple-600">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-600 text-sm">
        {desc}
      </CardContent>
    </Card>
  );
}

function ActionCard({
  icon,
  title,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  link: string;
}) {
  return (
    <div
      onClick={() => (window.location.href = link)}
      className="cursor-pointer border rounded-xl p-4 bg-white hover:shadow-md transition flex justify-between items-center"
    >
      <div className="flex items-center gap-2 text-slate-700">
        <span className="text-purple-600">{icon}</span>
        {title}
      </div>
      <ArrowRight size={16} className="text-slate-400" />
    </div>
  );
}
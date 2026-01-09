import {
  UsersIcon,
  DocumentTextIcon,
  LinkIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import Layout from "./layout";

const recentActivity = [
  { id: 1, type: "New post created", user: "Admin", time: "3 hours ago" },  
  {
    id: 2,
    type: "Form submission received",
    user: "Contact Form",
    time: "7 hours ago",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Halo, Bro
            <span className="inline-block ml-2">👋</span>
          </h1>
          <p className="text-gray-600">Here's whats going on today</p>
        </div>

        {/* Recent Activity*/}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

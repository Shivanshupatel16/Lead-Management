import DashboardLayout from "./DashboardLayout.jsx";
import LeadForm from "../components/LeadForm.jsx";
import LeadList from "../components/LeadList.jsx";
import { useSelector } from "react-redux";

export default function LeadsPage() {
  const { items } = useSelector((state) => state.leads);
  
  const stats = {
    total: items.length,
    new: items.filter(lead => lead.status === 'new').length,
    inProgress: items.filter(lead => lead.status === 'in-progress').length,
    converted: items.filter(lead => lead.status === 'converted').length,
  };

  return (
    <DashboardLayout title="Lead Management">
      <div className="space-y-6">
        <LeadForm />
        <LeadList />
      </div>
    </DashboardLayout>
  );
}
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLead, fetchLeads } from "../features/leads/leadSlice.js";
import { Plus, User, Mail, Phone, Globe, FileText, Target } from "lucide-react";
import { toast } from 'sonner';

export default function LeadForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Website",
    notes: "",
    status: "new",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
  e.preventDefault();

  if (!form.name.trim()) {
    toast.error("Name is required");
    return;
  }
    dispatch(createLead(form))
    .unwrap()
    .then(() => {
      toast.success("Lead created successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        source: "Website",
        notes: "",
        status: "new",
      });
      dispatch(fetchLeads({ page: 1, limit: 5 }));
    })
    .catch(() => {
      toast.error("Failed to create lead");
    });
};

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Lead</h3>
      
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        {/* Name Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-gray-400" />
          </div>
          <input
            className={`pl-10 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
            placeholder="Name*"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-400" />
          </div>
          <input
            className={`pl-10 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone size={18} className="text-gray-400" />
          </div>
          <input
            className="pl-10 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Source Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe size={18} className="text-gray-400" />
          </div>
          <select
            className="pl-10 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          >
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Status Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Target size={18} className="text-gray-400" />
          </div>
          <select
            className="pl-10 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="new">New</option>
            <option value="in-progress">In-Progress</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Notes Field */}
        <div className="relative md:col-span-2">
          <div className="absolute top-3 left-3 flex items-center pointer-events-none">
            <FileText size={18} className="text-gray-400" />
          </div>
          <textarea
            className="pl-10 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-100"
          >
            <Plus size={18} /> Save Lead
          </button>
        </div>
      </form>
    </div>
  );
}
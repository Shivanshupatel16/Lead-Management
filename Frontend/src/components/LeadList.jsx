import { useDispatch, useSelector } from "react-redux";
import { deleteLead, fetchLeads, updateLead } from "../features/leads/leadSlice.js";
import { useEffect, useState } from "react";
import { Search, Trash2, Edit3, Filter, ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { toast } from 'sonner';

export default function LeadList() {
  const dispatch = useDispatch();
  const { items, status, page, pages } = useSelector((s) => s.leads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [limit] = useState(5);
  const [localPage, setLocalPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    dispatch(fetchLeads({ page: localPage, limit, q: query, status: statusFilter }));
  }, [dispatch, localPage, query, statusFilter]);

  const handleUpdate = (id, field, value) => {
    dispatch(updateLead({ id, updates: { [field]: value } }))
      .unwrap()
      .then(() => {
        toast.success('Lead updated successfully');
      })
      .catch(() => {
        toast.error('Failed to update lead');
      });
  };

  const saveEdit = (id) => {
    dispatch(updateLead({ id, updates: editForm }))
      .unwrap()
      .then(() => {
        setEditingId(null);
        setEditForm({});
        toast.success('Lead updated successfully');
      })
      .catch(() => {
        toast.error('Failed to update lead');
      });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    toast.info('Edit cancelled');
  };

  const startEdit = (lead) => {
    setEditingId(lead._id);
    setEditForm({ ...lead });
  };

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "in-progress", label: "In-Progress" },
    { value: "converted", label: "Converted" },
    { value: "lost", label: "Lost" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-amber-100 text-amber-800";
      case "converted": return "bg-green-100 text-green-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const showDeleteConfirmation = (lead) => {
    toast.custom((t) => (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete the lead for <span className="font-medium">{lead.name}</span>? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              dispatch(deleteLead(lead._id))
                .unwrap()
                .then(() => {
                  toast.success('Lead deleted successfully');
                })
                .catch(() => {
                  toast.error('Failed to delete lead');
                });
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const showSaveConfirmation = (lead) => {
    toast.custom((t) => (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Changes</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to save the changes to <span className="font-medium">{lead.name}</span>'s information?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              toast.dismiss(t);
              cancelEdit();
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              saveEdit(lead._id);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    ), {
      duration: Infinity 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800">All Leads</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              className="pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full"
              placeholder="Search by name/email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none w-full"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {status === "loading" && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {items.length === 0 && status !== "loading" ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingId === lead._id ? (
                        <input
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full border border-gray-300 px-2 py-1 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingId === lead._id ? (
                        <input
                          value={editForm.email || ""}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full border border-gray-300 px-2 py-1 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <div className="text-gray-600">{lead.email || "-"}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingId === lead._id ? (
                        <input
                          value={editForm.phone || ""}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full border border-gray-300 px-2 py-1 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      ) : (
                        <div className="text-gray-600">{lead.phone || "-"}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingId === lead._id ? (
                        <select
                          value={editForm.status || "new"}
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="border border-gray-300 px-2 py-1 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In-Progress</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                        </select>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{lead.source}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === lead._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => showSaveConfirmation(lead)}
                            className="text-green-600 hover:text-green-800 flex items-center"
                          >
                            <Save size={14} className="mr-1" /> Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <X size={14} className="mr-1" /> Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(lead)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Edit3 size={14} className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => showDeleteConfirmation(lead)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <Trash2 size={14} className="mr-1" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing page <span className="font-medium">{localPage}</span> of <span className="font-medium">{pages}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLocalPage(Math.max(1, localPage - 1))}
                  disabled={localPage === 1}
                  className="flex items-center px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </button>
                <button
                  onClick={() => setLocalPage(Math.min(pages, localPage + 1))}
                  disabled={localPage === pages}
                  className="flex items-center px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
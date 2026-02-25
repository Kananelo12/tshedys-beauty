"use client";

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, UserCog } from 'lucide-react';

interface Provider {
  _id: string;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

interface ProviderForm {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  password: string;
}

const emptyForm: ProviderForm = {
  name: '',
  email: '',
  phone: '',
  timezone: 'Africa/Maseru',
  password: '',
};

export default function AdminSettingsPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [currentProviderId, setCurrentProviderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProviderForm>(emptyForm);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProviders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/providers');
      if (!res.ok) throw new Error('Failed to fetch providers');
      const data = await res.json();
      setProviders(data);
    } catch {
      setError('Failed to load providers');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentProvider = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated) {
        setCurrentProviderId(data.provider.id);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchProviders();
    fetchCurrentProvider();
  }, [fetchProviders, fetchCurrentProvider]);

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (provider: Provider) => {
    setEditingId(provider._id);
    setForm({
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      timezone: provider.timezone,
      password: '',
    });
    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const url = editingId ? `/api/providers/${editingId}` : '/api/providers';
      const method = editingId ? 'PUT' : 'POST';

      const payload: Record<string, string> = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        timezone: form.timezone,
      };
      // Only send password if provided
      if (form.password) {
        payload.password = form.password;
      } else if (!editingId) {
        setError('Password is required for new providers');
        setSaving(false);
        return;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccessMsg(editingId ? 'Provider updated' : 'Provider created');
      closeModal();
      fetchProviders();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/providers/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      setSuccessMsg('Provider deleted');
      setDeleteConfirmId(null);
      fetchProviders();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-medium text-foreground tracking-[-0.025em]">Settings</h2>
      </div>

      {/* Providers section */}
      <div className="bg-white rounded-2xl border border-[#EEECEA]">
        <div className="flex items-center justify-between p-6 border-b border-[#EEECEA]">
          <div className="flex items-center gap-3">
            <UserCog className="text-foreground/30" size={18} />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Providers</h3>
              <p className="text-xs text-foreground/35">
                Manage provider accounts that can log in to the admin panel.
              </p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-foreground/90 transition-colors"
          >
            <Plus size={14} />
            Add Provider
          </button>
        </div>

        {/* Success banner */}
        {successMsg && (
          <div className="mx-6 mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
            {successMsg}
          </div>
        )}

        {/* Error banner */}
        {error && !modalOpen && (
          <div className="mx-6 mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Provider list */}
        <div className="divide-y divide-[#EEECEA]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-foreground/20" size={20} />
            </div>
          ) : providers.length === 0 ? (
            <div className="py-12 text-center text-sm text-foreground/35">
              No providers found. Add one to get started.
            </div>
          ) : (
            providers.map((provider) => {
              const isSelf = provider._id === currentProviderId;
              return (
                <div
                  key={provider._id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-[#FAFAF8] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {provider.name}
                      </p>
                      {isSelf && (
                        <span className="inline-flex items-center rounded-full bg-foreground/5 px-2 py-0.5 text-[11px] font-medium text-foreground/50 border border-[#EEECEA]">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/35 truncate">{provider.email}</p>
                    {provider.phone && (
                      <p className="text-xs text-foreground/25">{provider.phone}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <button
                      onClick={() => openEdit(provider)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#EEECEA] px-3 py-1.5 text-xs text-foreground/50 hover:bg-[#F5F4F2] transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>

                    {!isSelf &&
                      (deleteConfirmId === provider._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(provider._id)}
                            disabled={deleting}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                          >
                            {deleting ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              'Confirm'
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="inline-flex items-center rounded-lg border border-[#EEECEA] px-2 py-1.5 text-xs text-foreground/40 hover:bg-[#F5F4F2] transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(provider._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#EEECEA] p-6 mx-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-serif font-medium text-foreground">
                {editingId ? 'Edit Provider' : 'Add Provider'}
              </h3>
              <button
                onClick={closeModal}
                className="text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 px-4 py-2.5 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 px-4 py-2.5 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                  placeholder="provider@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 px-4 py-2.5 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                  placeholder="+266..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-1.5">
                  Timezone
                </label>
                <select
                  value={form.timezone}
                  onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  className="w-full rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 px-4 py-2.5 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                >
                  <option value="Africa/Maseru">Africa/Maseru</option>
                  <option value="Africa/Johannesburg">Africa/Johannesburg</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/35 uppercase tracking-wider mb-1.5">
                  Password{' '}
                  {editingId ? (
                    <span className="text-foreground/25 font-normal normal-case tracking-normal">(leave blank to keep current)</span>
                  ) : (
                    <span className="text-red-400">*</span>
                  )}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl border border-[#EEECEA] bg-[#F5F4F2]/50 px-4 py-2.5 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                  placeholder={editingId ? '••••••••' : 'Set a strong password'}
                  required={!editingId}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-[#EEECEA] px-4 py-2 text-sm font-medium text-foreground/50 hover:bg-[#F5F4F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editingId ? 'Save Changes' : 'Create Provider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

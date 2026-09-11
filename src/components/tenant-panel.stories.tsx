import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { X, Plus, Trash2, Search, Pencil } from 'lucide-react'
import { Button } from './button'
import { Pill } from './pill'
import { Input } from './input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table'

/**
 * PROTOTYPE — Tenant panel flow (for review, not a shipped component).
 *
 * Replaces the old stacked-modals flow (details modal → add-users modal →
 * remove-users modal) with ONE right-side drawer that has two tabs:
 *   • Details — tenant overview + inline edit
 *   • Users   — the user list + inline "Add user" row (no separate modal)
 *
 * Terminology: "Users" everywhere (was "Members").
 */

const meta = {
  title: 'Prototypes/TenantPanel',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'PROTOTYPE for review. One drawer, two tabs (Details / Users). Add-user is an inline row inside the Users tab — no stacked modals. "Members" renamed to "Users".',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

type MockUser = { id: string; name: string; email: string; role: string }

const SEED_USERS: MockUser[] = [
  { id: '1', name: 'Jordan Blake', email: 'jordan.blake@acme.com', role: 'Admin' },
  { id: '2', name: 'Priya Nair', email: 'priya.nair@acme.com', role: 'Member' },
  { id: '3', name: 'Sam Okafor', email: 'sam.okafor@acme.com', role: 'Member' },
]

const DIRECTORY: MockUser[] = [
  { id: '4', name: 'Lena Fischer', email: 'lena.fischer@acme.com', role: 'Member' },
  { id: '5', name: 'Marco Rossi', email: 'marco.rossi@acme.com', role: 'Member' },
  { id: '6', name: 'Aisha Khan', email: 'aisha.khan@acme.com', role: 'Admin' },
]

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function TenantPanel() {
  const [open, setOpen] = useState(true)
  const [tab, setTab] = useState<'details' | 'users'>('details')
  const [editing, setEditing] = useState(false)

  // tenant details (mock)
  const [displayName, setDisplayName] = useState('Acme Motors')
  const [plan] = useState('Enterprise')
  const [status] = useState('Active')

  // users
  const [users, setUsers] = useState<MockUser[]>(SEED_USERS)
  const [userSearch, setUserSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [addSearch, setAddSearch] = useState('')

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  )
  const addable = DIRECTORY.filter(
    (d) =>
      !users.some((u) => u.id === d.id) &&
      (d.name.toLowerCase().includes(addSearch.toLowerCase()) ||
        d.email.toLowerCase().includes(addSearch.toLowerCase()))
  )

  const tabBtn = (key: 'details' | 'users', label: string) => (
    <button
      type="button"
      onClick={() => setTab(key)}
      className="relative -mb-px border-b-2 px-1 pb-2.5 text-sm font-medium outline-none"
      style={{
        borderColor: tab === key ? 'var(--primary)' : 'transparent',
        color: tab === key ? 'var(--primary)' : 'var(--ink-muted)',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ position: 'relative', height: '100vh', background: 'var(--surface-page, #f8f9fb)' }}>
      {/* faux page behind */}
      <div style={{ padding: 32 }}>
        <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>
          (Tenants list would be here) — click to reopen the panel:
        </p>
        {!open && (
          <Button onClick={() => setOpen(true)} className="mt-2">
            Open Acme Motors
          </Button>
        )}
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 40 }}
          />
          <div
            style={{
              position: 'fixed',
              inset: '0 0 0 auto',
              width: 460,
              maxWidth: '92vw',
              background: 'var(--card)',
              borderLeft: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-default)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      display: 'grid', placeItems: 'center', height: 36, width: 36, borderRadius: 999,
                      background: 'var(--primary)', color: '#fff', fontSize: 13, fontWeight: 600,
                    }}
                  >
                    {initials(displayName)}
                  </span>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ink-primary)' }}>{displayName}</h2>
                    <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                      <Pill variant="success">{status}</Pill>
                      <Pill variant="brand">{plan}</Pill>
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'var(--surface-alt)', border: 'none', borderRadius: 'var(--radius)', width: 28, height: 28, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--ink-muted)' }}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: 20, marginTop: 16, borderBottom: '1px solid var(--border-default)' }}>
                {tabBtn('details', 'Details')}
                {tabBtn('users', `Users (${users.length})`)}
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {tab === 'details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outline" size="sm" onClick={() => setEditing((e) => !e)}>
                      <Pencil className="h-3.5 w-3.5" /> {editing ? 'Done' : 'Edit'}
                    </Button>
                  </div>
                  <Field label="Display name">
                    {editing ? (
                      <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    ) : (
                      <span style={{ fontSize: 14, color: 'var(--ink-primary)' }}>{displayName}</span>
                    )}
                  </Field>
                  <Field label="Plan"><span style={{ fontSize: 14, color: 'var(--ink-primary)' }}>{plan}</span></Field>
                  <Field label="Status"><Pill variant="success">{status}</Pill></Field>
                  <Field label="Users"><span style={{ fontSize: 14, color: 'var(--ink-primary)' }}>{users.length}</span></Field>
                </div>
              )}

              {tab === 'users' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Users toolbar */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search className="h-4 w-4" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-faint)' }} />
                      <input
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Search users..."
                        style={{ width: '100%', height: 32, paddingLeft: 32, paddingRight: 10, borderRadius: 'var(--radius)', border: '1px solid var(--border-default)', background: 'var(--card)', fontSize: 13, color: 'var(--ink-primary)', outline: 'none' }}
                      />
                    </div>
                    <Button size="sm" onClick={() => setAdding((a) => !a)}>
                      <Plus className="h-4 w-4" /> Add user
                    </Button>
                  </div>

                  {/* Inline add-user panel (no separate modal) */}
                  {adding && (
                    <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius)', background: 'var(--surface-alt)', padding: 12 }}>
                      <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Add a user</p>
                      <input
                        value={addSearch}
                        onChange={(e) => setAddSearch(e.target.value)}
                        placeholder="Search directory by name or email..."
                        style={{ width: '100%', height: 32, padding: '0 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border-default)', background: 'var(--card)', fontSize: 13, marginBottom: 8, outline: 'none' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 160, overflowY: 'auto' }}>
                        {addable.length === 0 && <p style={{ fontSize: 13, color: 'var(--ink-muted)', margin: 4 }}>No matching users.</p>}
                        {addable.map((d) => (
                          <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 8px', borderRadius: 'var(--radius)', background: 'var(--card)' }}>
                            <div>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--ink-primary)' }}>{d.name}</p>
                              <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)' }}>{d.email}</p>
                            </div>
                            <Button size="xs" variant="outline" onClick={() => { setUsers((u) => [...u, d]); }}>
                              Add
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* User list */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ display: 'grid', placeItems: 'center', height: 28, width: 28, borderRadius: 999, background: 'var(--accent)', color: 'var(--primary)', fontSize: 11, fontWeight: 600 }}>{initials(u.name)}</span>
                              <div>
                                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--ink-primary)' }}>{u.name}</p>
                                <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)' }}>{u.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell><Pill variant="neutral">{u.role}</Pill></TableCell>
                          <TableCell style={{ textAlign: 'right' }}>
                            <Button size="icon-sm" variant="ghost" aria-label={`Remove ${u.name}`} onClick={() => setUsers((list) => list.filter((x) => x.id !== u.id))}>
                              <Trash2 className="h-4 w-4" style={{ color: 'var(--destructive)' }} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filtered.length === 0 && <p style={{ fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center', padding: 16 }}>No users match your search.</p>}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</p>
      {children}
    </div>
  )
}

export const Prototype: Story = {
  render: () => <TenantPanel />,
}

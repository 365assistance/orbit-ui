import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { X, Plus, Trash2, Search } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'
import { Table, TableBody, TableRow, TableCell } from './table'

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

function TenantPanel() {
  const [open, setOpen] = useState(true)
  const [tab, setTab] = useState<'details' | 'users'>('details')

  // tenant details (mock). Fields are always inputs; Save/Cancel gate on dirty.
  const ORIGINAL = { displayName: 'Acme Motors', plan: 'Enterprise', status: 'Active' }
  const [displayName, setDisplayName] = useState(ORIGINAL.displayName)
  const [plan, setPlan] = useState(ORIGINAL.plan)
  const [status, setStatus] = useState(ORIGINAL.status)
  const dirty =
    displayName !== ORIGINAL.displayName || plan !== ORIGINAL.plan || status !== ORIGINAL.status
  const resetDetails = () => {
    setDisplayName(ORIGINAL.displayName)
    setPlan(ORIGINAL.plan)
    setStatus(ORIGINAL.status)
  }

  // users
  const [users, setUsers] = useState<MockUser[]>(SEED_USERS)
  const [userSearch, setUserSearch] = useState('')
  // (single search: userSearch also filters the add-user suggestions)
  const [adding, setAdding] = useState(false)

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  )
  const addable = DIRECTORY.filter(
    (d) =>
      !users.some((u) => u.id === d.id) &&
      (d.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        d.email.toLowerCase().includes(userSearch.toLowerCase()))
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
            {/* Header — no avatar, no status/plan pills. Single divider is the
                tabs' border-bottom (header itself has no separate border). */}
            <div style={{ padding: '16px 20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ink-primary)' }}>{displayName}</h2>
                <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'var(--surface-alt)', border: 'none', borderRadius: 'var(--radius)', width: 28, height: 28, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--ink-muted)' }}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Tabs (the only horizontal divider) */}
              <div style={{ display: 'flex', gap: 20, marginTop: 16, borderBottom: '1px solid var(--border-default)' }}>
                {tabBtn('details', 'Details')}
                {tabBtn('users', `Users (${users.length})`)}
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {tab === 'details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Field label="Display name">
                    <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  </Field>
                  <Field label="Plan">
                    <Input value={plan} onChange={(e) => setPlan(e.target.value)} />
                  </Field>
                  <Field label="Status">
                    <Input value={status} onChange={(e) => setStatus(e.target.value)} />
                  </Field>
                  <Field label="Users">
                    <span style={{ fontSize: 14, color: 'var(--ink-primary)' }}>{users.length}</span>
                  </Field>
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

                  {/* Add-user suggestions — driven by the SAME search box above
                      (no second search). When 'Add user' is active, directory
                      matches show as a plain suggestion list. */}
                  {adding && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <p style={{ margin: '0 0 2px', fontSize: 12, color: 'var(--ink-muted)' }}>
                        {userSearch ? 'Matching people you can add:' : 'Start typing above to find people to add.'}
                      </p>
                      {userSearch && addable.length === 0 && (
                        <p style={{ fontSize: 13, color: 'var(--ink-muted)', margin: 4 }}>No matching people.</p>
                      )}
                      {userSearch && addable.map((d) => (
                        <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '8px 4px', borderBottom: '1px solid var(--border-subtle)' }}>
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
                  )}

                  {/* User list — no avatars, no header background */}
                  {!adding && (
                    <>
                      <Table>
                        <TableBody>
                          {filtered.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell>
                                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--ink-primary)' }}>{u.name}</p>
                                <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)' }}>{u.email}</p>
                              </TableCell>
                              <TableCell style={{ textAlign: 'right', width: 44 }}>
                                <Button size="icon-sm" variant="ghost" aria-label={`Remove ${u.name}`} onClick={() => setUsers((list) => list.filter((x) => x.id !== u.id))}>
                                  <Trash2 className="h-4 w-4" style={{ color: 'var(--destructive)' }} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {filtered.length === 0 && <p style={{ fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center', padding: 16 }}>No users match your search.</p>}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer — Save/Cancel for Details edits. Inactive until a change
                is made (dirty). Only shown on the Details tab. */}
            {tab === 'details' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--border-default)' }}>
                <Button variant="outline" disabled={!dirty} onClick={resetDetails}>Cancel</Button>
                <Button disabled={!dirty} onClick={resetDetails}>Save changes</Button>
              </div>
            )}
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

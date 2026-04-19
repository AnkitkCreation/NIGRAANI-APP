# NIGRANI Database Schema Blueprint (Supabase Edition)

This document outlines how the 3-sided ecosystem (Citizen, Contractor, Admin) will interact once we move to a real database.

---

## 1. Core Tables

### `profiles` (Authentication & User Details)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key (from Supabase Auth) |
| `name` | Text | Full name |
| `phone` | Text | Primary contact number |
| `role` | Enum | `citizen`, `contractor`, `admin` |
| `ward_id` | UUID | Foreign Key to `wards` |
| `avatar_url`| Text | Link to profile photo in Storage |

### `complaints` (The Heart of the App)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key to `profiles` |
| `category` | Enum | `road_damage`, `garbage`, etc. |
| `title` | Text | Max 80 chars |
| `description`| Text | Detailed issue description |
| `coords` | Point | [lat, lng] for Map integration |
| `address` | Text | Geocoded street name |
| `ward_id` | UUID | Foreign Key to `wards` |
| `status` | Enum | `pending`, `assigned`, `in_progress`, `resolved` |
| `photos` | Text[] | Array of URLs from Storage |

### `assignments` (The Contractor Side)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `complaint_id`| UUID | Foreign Key to `complaints` |
| `contractor_id`| UUID | Foreign Key to `profiles` (with contractor role) |
| `budget` | Numeric | Financial allocation for this fix |
| `tender_id` | Text | Official government contract ID |
| `deadline` | Date | Expected completion date |

---

## 2. Interaction Flow

### **The Citizen Flow**
1. User reports an issue (GPS captured + Photos uploaded to Storage).
2. Data saved to `complaints` with `status: pending`.

### **The Admin Flow**
1. Admin sees a list of `pending` complaints in the **Admin Dashboard**.
2. Admin creates a record in `assignments`, linking a `contractor_id` to the complaint.
3. Complaint `status` automatically moves to `assigned`.

### **The Contractor Flow**
1. Contractor logs in and sees only `assignments` linked to their `contractor_id`.
2. They click "Check-in" (verifies GPS against `complaints.coords`).
3. They upload a "Resolution Photo" to Storage and mark as `resolved`.

---

## 3. Security (RLS - Row Level Security)
- **Citizens**: Can only `UPDATE` (upvote) any complaint, but can only `INSERT` their own.
- **Contractors**: Can only `UPDATE` complaints they are assigned to.
- **Admins**: Can `CREATE`, `UPDATE`, and `DELETE` anything.

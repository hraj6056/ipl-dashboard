# 🏏 IPL Dashboard

A modern IPL dashboard built with **Next.js**, **Tailwind CSS**, **Recharts**, and **SWR**.

It shows:

- Live match details with notifications
- Points table with real-time updates
- Match schedule
- Interactive charts of team performance
- Dark mode and responsive design

👉 **Live site**: [https://ipl-dashboard-inky-six.vercel.app/](https://ipl-dashboard-inky-six.vercel.app/)

---

## ✨ Features

✅ Live match data auto-refresh every 30s  
✅ Native and in-app notifications for:

- Match start
- Toss result
- Score updates
- Milestones

✅ Dark Mode Toggle  
✅ Notification Drawer with unread counts  
✅ Fully Responsive UI  
✅ Historical charts for points progression  
✅ Smooth transitions between light/dark  
✅ Caching with SWR

---

## 📂 Project Structure

```
/components
  Navbar.tsx
  MatchCard.tsx
  PointsTable.tsx
  ScheduleList.tsx
  NotificationBell.tsx
  DarkModeToggle.tsx
  Loader.tsx

/lib
  dummyData.ts
  utils.ts

/pages
  index.tsx        # Home page (live match + points table)
  schedule.tsx     # Schedule page
  history.tsx      # Historical charts
  api/scrape.ts    # Server API to fetch & transform data

/types
  Match.ts
  PointsTableEntry.ts
  ScheduleEntry.ts
  HistoryPoint.ts
```

---

## 🚀 Getting Started

**1️⃣ Clone the repo**

```bash
git clone https://github.com/hraj6056/ipl-dashboard.git
cd ipl-dashboard
```

**2️⃣ Install dependencies**

```bash
npm install
```

**3️⃣ Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## 🧪 Testing the Project

### Live Updates

- Wait ~30s to see the data auto-refresh.
- If notifications are enabled, you’ll see them pop up.

### Dark Mode

- Use the toggle in the navbar.
- Verify smooth transitions and correct colors.

### Notifications

- Grant notification permissions.
- Check bell icon badge count.
- Open the drawer to see notification history.

### Charts

- Scroll below points table to view points progression.

- Observe the lines for each team evolving over matches.

---

## 🛠️ Available Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm start` – Run production server

---

## 💡 Tech Stack

- **Next.js 14**
- **Tailwind CSS**
- **SWR** (caching + revalidation)
- **Recharts** (data visualization)

---

## ✍️ Author

Harsh Raj  
[GitHub](https://github.com/hraj6056/)  
[LinkedIn](https://www.linkedin.com/in/harsh-raj-nitp/)

---

## 📃 License

MIT

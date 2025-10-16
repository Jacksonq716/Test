# PT Assessment Simulator

A web-based simulation platform for testing Physical Therapists' ability to access and interpret real-time and historical patient data.

## Features

✅ **Live Session Monitor** - Real-time patient metrics (Heart Rate, ROM, Repetitions, Error Flags)
✅ **Historical Performance Charts** - Bar and line charts showing progress over multiple sessions
✅ **Recovery Metrics Dashboard** - Track recovery rate, pain level, functional score, and compliance
✅ **Doctor's Notes** - Editable clinical observations and treatment recommendations
✅ **Real-time Data Synchronization** - Multi-user support with instant updates across all connected devices
✅ **Data Entry Modal** - Add new historical sessions or update live session data

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project: https://nhdnjgozjcbdrarwliwg.supabase.co
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `supabase-setup.sql`
4. Click **Run** to create tables and insert sample data

### 2. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import this Git repository (or upload the folder)
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

## Usage Guide

### Testing Real-time Sync

1. Open the deployed URL in multiple browser windows/tabs
2. Click the **+ button** (bottom right) to add/update data
3. Choose between:
   - **Update Live Session** - Modify current session metrics
   - **Add Historical Session** - Add new session to charts
4. Watch all windows update automatically!

### Modifying Doctor's Notes

1. Click **Edit** in the Doctor's Notes section
2. Type your clinical observations
3. Click **Save Notes**
4. Notes sync across all connected users

### Interpreting the Dashboard

**Live Session Metrics:**
- Heart Rate: Normal (<120 BPM), Elevated (>120 BPM)
- ROM: Progress bar shows percentage of full range (180°)
- Repetitions: Shows current/target reps
- Error Flags: Red if >0, indicates compensation patterns

**Historical Charts:**
- ROM Progress: Bar chart showing improvement over sessions
- Trends: Line chart comparing heart rate vs repetitions
- Error Analysis: Bar chart showing error frequency

**Recovery Metrics:**
- Green trends (↑) = Improvement
- Red trends (↓) = Decline
- Overall progress bar shows cumulative recovery

## Database Schema

```sql
live_sessions
  - patient_id
  - heart_rate
  - rom
  - repetitions
  - target_reps
  - error_flags
  - exercise_type
  - duration

historical_sessions
  - session_number
  - heart_rate
  - rom
  - repetitions
  - error_flags
  - duration
  - exercise_type

doctor_notes
  - notes
  - updated_at

recovery_metrics
  - recovery_rate
  - pain_level
  - functional_score
  - compliance_rate
  - sessions_attended
  - total_sessions
  - overall_progress
```

## Testing Scenarios

### Scenario 1: Has the patient improved?
1. Look at Historical Charts → ROM Progress
2. Check trend direction (should be increasing)
3. Compare Session 1 vs Session 4 values

### Scenario 2: Are there consistent errors?
1. Check Historical Charts → Error Flags chart
2. Look for patterns (high errors in specific sessions)
3. Cross-reference with ROM data

### Scenario 3: Would you modify the exercise plan?
1. Review Live Session error flags
2. Check Recovery Metrics → Pain Level
3. Read Doctor's Notes for context
4. Consider compliance rate

## Troubleshooting

**Data not syncing?**
- Check Supabase SQL has been run
- Verify tables exist in Supabase Table Editor
- Check browser console for errors

**Charts not showing?**
- Ensure historical_sessions table has data
- Session numbers should be sequential (1, 2, 3, 4...)

**Can't edit notes?**
- Check doctor_notes table exists
- Verify RLS policies are enabled

## License

MIT - Created for PT assessment testing purposes

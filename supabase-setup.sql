-- PT Assessment Simulator Database Setup
-- Run this script in Supabase SQL Editor

-- Table 1: Live Sessions (current real-time data)
CREATE TABLE IF NOT EXISTS live_sessions (
  id BIGSERIAL PRIMARY KEY,
  patient_id TEXT NOT NULL,
  heart_rate INTEGER NOT NULL,
  rom INTEGER NOT NULL,
  repetitions INTEGER NOT NULL,
  target_reps INTEGER DEFAULT 12,
  error_flags INTEGER DEFAULT 0,
  exercise_type TEXT NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 2: Historical Sessions (past session data)
CREATE TABLE IF NOT EXISTS historical_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_number INTEGER NOT NULL UNIQUE,
  heart_rate INTEGER NOT NULL,
  rom INTEGER NOT NULL,
  repetitions INTEGER NOT NULL,
  error_flags INTEGER DEFAULT 0,
  duration INTEGER NOT NULL,
  exercise_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 3: Doctor Notes
CREATE TABLE IF NOT EXISTS doctor_notes (
  id INTEGER PRIMARY KEY DEFAULT 1,
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 4: Recovery Metrics
CREATE TABLE IF NOT EXISTS recovery_metrics (
  id INTEGER PRIMARY KEY DEFAULT 1,
  recovery_rate INTEGER NOT NULL,
  previous_recovery_rate INTEGER,
  pain_level INTEGER NOT NULL,
  previous_pain_level INTEGER,
  functional_score INTEGER NOT NULL,
  previous_functional_score INTEGER,
  compliance_rate INTEGER NOT NULL,
  sessions_attended INTEGER NOT NULL,
  total_sessions INTEGER NOT NULL,
  overall_progress INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (for testing purposes)
CREATE POLICY "Allow all operations on live_sessions" ON live_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on historical_sessions" ON historical_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on doctor_notes" ON doctor_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on recovery_metrics" ON recovery_metrics FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data for Live Session (Current Active Session)
INSERT INTO live_sessions (patient_id, heart_rate, rom, repetitions, target_reps, error_flags, exercise_type, duration)
VALUES 
  ('PT-2024-001', 88, 118, 10, 12, 1, 'Knee Extension', 28),
  ('PT-2024-001', 92, 115, 8, 12, 1, 'Knee Extension', 25),
  ('PT-2024-001', 85, 120, 11, 12, 0, 'Knee Extension', 30);

-- Insert sample data for Historical Sessions (Past 8 Sessions showing improvement)
INSERT INTO historical_sessions (session_number, heart_rate, rom, repetitions, error_flags, duration, exercise_type)
VALUES 
  (1, 102, 75, 5, 4, 18, 'Knee Extension'),
  (2, 98, 85, 6, 3, 20, 'Knee Extension'),
  (3, 95, 95, 7, 2, 22, 'Knee Extension'),
  (4, 93, 105, 8, 2, 25, 'Knee Extension'),
  (5, 90, 110, 9, 1, 28, 'Knee Extension'),
  (6, 88, 115, 10, 1, 30, 'Knee Extension'),
  (7, 87, 118, 11, 1, 32, 'Knee Extension'),
  (8, 85, 122, 11, 0, 35, 'Knee Extension')
ON CONFLICT (session_number) DO NOTHING;

-- Insert sample data for Doctor Notes
INSERT INTO doctor_notes (id, notes)
VALUES (1, 'PATIENT: PT-2024-001 | AGE: 52 | POST-OP: ACL Reconstruction (Week 6)

=== ASSESSMENT SUMMARY ===
Patient demonstrates EXCELLENT progress over 8-week rehabilitation period.

KEY OBSERVATIONS:
• ROM improved from 75° to 122° (62% increase) - EXCEEDS target progression
• Heart rate trending downward (102→85 BPM) - indicates improved cardiovascular efficiency
• Error/compensation patterns reduced from 4 to 0 - proper movement mechanics achieved
• Repetition capacity increased from 5 to 11 - significant strength gains

=== FUNCTIONAL PROGRESS ===
✓ Pain reduced from 6/10 to 3/10
✓ Gait pattern normalized - no longer requires assistive device
✓ Able to perform single-leg stance for 30+ seconds
✓ Stair negotiation without handrail support

=== TREATMENT PLAN ===
PHASE ADVANCEMENT RECOMMENDED:
1. Increase target repetitions: 12 → 15 reps
2. Add progressive resistance (bodyweight → 2kg ankle weight)
3. Introduce proprioceptive training on unstable surfaces
4. Begin sport-specific drills (light jogging on treadmill)

=== CONCERNS/PRECAUTIONS ===
⚠ Monitor for fatigue - patient tends to push beyond prescribed limits
⚠ Educate on importance of rest days (currently attending 5x/week, recommend 3-4x)
⚠ Watch for swelling post-session - ice protocol compliance needs improvement

=== NEXT MILESTONE ===
Target Date: 2 weeks
Goal: Full ROM (135°), 15 reps @ 5kg resistance, pain <2/10
Reassessment: Isokinetic strength testing scheduled

=== PATIENT COMPLIANCE ===
Excellent - 85% attendance rate, actively engaged in home exercise program.

PT Signature: Dr. Sarah Chen, DPT | Date: 2025-10-14')
ON CONFLICT (id) DO UPDATE SET notes = EXCLUDED.notes;

-- Insert sample data for Recovery Metrics (Showing positive trends)
INSERT INTO recovery_metrics (
  id, 
  recovery_rate, 
  previous_recovery_rate,
  pain_level,
  previous_pain_level,
  functional_score,
  previous_functional_score,
  compliance_rate,
  sessions_attended,
  total_sessions,
  overall_progress
)
VALUES (1, 78, 65, 3, 6, 85, 68, 85, 17, 20, 82)
ON CONFLICT (id) DO UPDATE SET
  recovery_rate = EXCLUDED.recovery_rate,
  previous_recovery_rate = EXCLUDED.previous_recovery_rate,
  pain_level = EXCLUDED.pain_level,
  previous_pain_level = EXCLUDED.previous_pain_level,
  functional_score = EXCLUDED.functional_score,
  previous_functional_score = EXCLUDED.previous_functional_score,
  compliance_rate = EXCLUDED.compliance_rate,
  sessions_attended = EXCLUDED.sessions_attended,
  total_sessions = EXCLUDED.total_sessions,
  overall_progress = EXCLUDED.overall_progress;

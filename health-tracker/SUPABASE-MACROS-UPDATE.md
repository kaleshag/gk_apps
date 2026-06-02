# Supabase Database Update for Macronutrients

## Overview
This guide shows how to update your existing Supabase database to support macronutrient tracking (protein, carbs, fat).

## Step 1: Update the health_data Table

Run this SQL in your Supabase SQL Editor to add the new columns:

```sql
-- Add macronutrient columns to health_data table
ALTER TABLE health_data 
ADD COLUMN IF NOT EXISTS protein_goal INTEGER DEFAULT 150,
ADD COLUMN IF NOT EXISTS carbs_goal INTEGER DEFAULT 200,
ADD COLUMN IF NOT EXISTS fat_goal INTEGER DEFAULT 60;

-- Add comment to document the changes
COMMENT ON COLUMN health_data.protein_goal IS 'Daily protein goal in grams';
COMMENT ON COLUMN health_data.carbs_goal IS 'Daily carbohydrate goal in grams';
COMMENT ON COLUMN health_data.fat_goal IS 'Daily fat goal in grams';
```

## Step 2: Update Existing Data (Optional)

If you want to set default goals for existing records:

```sql
-- Update existing records with default macro goals
UPDATE health_data 
SET 
    protein_goal = 150,
    carbs_goal = 200,
    fat_goal = 60
WHERE protein_goal IS NULL 
   OR carbs_goal IS NULL 
   OR fat_goal IS NULL;
```

## Step 3: Verify the Changes

Check that the columns were added successfully:

```sql
-- Verify the table structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'health_data'
ORDER BY ordinal_position;
```

## Step 4: Test the Integration

1. Visit your app: `https://kaleshag.github.io/gk_apps/health-tracker/`
2. Sign in with your Supabase account
3. Add a food item with macros:
   - Food: "Chicken Breast"
   - Calories: 165
   - Protein: 31g
   - Carbs: 0g
   - Fat: 3.6g
4. Verify the data syncs to Supabase

## Data Structure

The `data` JSONB column in `health_data` table now stores:

```json
{
  "calorieGoal": 1900,
  "proteinGoal": 150,
  "carbsGoal": 200,
  "fatGoal": 60,
  "foods": [
    {
      "id": 1234567890,
      "name": "Chicken Breast",
      "calories": 165,
      "protein": 31,
      "carbs": 0,
      "fat": 3.6,
      "mealType": "lunch",
      "timestamp": "2026-06-02T09:00:00.000Z"
    }
  ],
  "workouts": [...],
  "waterIntake": 2.5,
  "steps": 5000,
  "sleepHours": 7.5,
  "habits": [...]
}
```

## Notes

- The macro goals are stored at the top level of the data structure
- Each food item now includes optional `protein`, `carbs`, and `fat` fields
- If macros are not entered (0 or empty), they won't be displayed in the UI
- The app is backward compatible - old food entries without macros will still work

## Troubleshooting

If you encounter issues:

1. **Check RLS Policies**: Ensure your Row Level Security policies allow updates
2. **Verify User ID**: Make sure you're signed in with the correct account
3. **Check Browser Console**: Look for any error messages
4. **Test Sync**: Try adding a simple food item and check if it appears in Supabase

## Default Macro Goals

The default goals are based on a 68kg person:
- **Protein**: 150g (2.2g per kg body weight)
- **Carbs**: 200g (moderate carb intake)
- **Fat**: 60g (healthy fat intake)

You can adjust these in the app's settings (feature coming soon).
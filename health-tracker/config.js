// Supabase Configuration
// Replace these values with your actual Supabase credentials
// Find them at: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

const SUPABASE_CONFIG = {
    url: 'https://ovcokjysbkdmyjiqiffq.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92Y29ranlzYmtkbXlqaXFpZmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODM2NTIsImV4cCI6MjA5NTk1OTY1Mn0.Glt4dNMtykcxh_b5qN1pnyW-gVHHC-yBrDmSWH2iEYE' // Replace with your actual anon/public key
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}

// Made with Bob

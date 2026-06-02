// Supabase Sync Module
// Handles cloud synchronization of health tracker data

let supabaseClient = null;
let currentUser = null;
let syncEnabled = false;

// Initialize Supabase client
async function initSupabase() {
    try {
        if (typeof SUPABASE_CONFIG === 'undefined' ||
            SUPABASE_CONFIG.anonKey === 'YOUR_SUPABASE_ANON_KEY_HERE') {
            console.log('Supabase not configured - running in offline mode');
            return false;
        }

        const { createClient } = window.supabase;
        supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
        
        // Check if user is already logged in
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            currentUser = session.user;
            syncEnabled = true;
            console.log('User already logged in:', currentUser.email);
            return true;
        }
        
        // Listen for auth changes
        supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event);
            if (session) {
                currentUser = session.user;
                syncEnabled = true;
                if (typeof updateSyncStatus === 'function') {
                    updateSyncStatus();
                }
            } else {
                currentUser = null;
                syncEnabled = false;
                if (typeof updateSyncStatus === 'function') {
                    updateSyncStatus();
                }
            }
        });

        return true;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        return false;
    }
}

// Sign in with email
async function signIn(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        currentUser = data.user;
        syncEnabled = true;
        console.log('Signed in successfully:', currentUser.email);
        
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
    }
}

// Sign up new user
async function signUp(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });

        if (error) throw error;

        return { success: true, message: 'Check your email for confirmation link' };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error.message };
    }
}

// Sign out
async function signOut() {
    try {
        await supabaseClient.auth.signOut();
        currentUser = null;
        syncEnabled = false;
        console.log('Signed out successfully');
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
    }
}

// Sync data to cloud
async function syncToCloud(data) {
    if (!syncEnabled || !currentUser) {
        console.log('Sync disabled - saving locally only');
        return;
    }

    try {
        // Upsert current day's data
        const { error } = await supabaseClient
            .from('health_data')
            .upsert({
                user_id: currentUser.id,
                date: data.date,
                data: data,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,date'
            });

        if (error) throw error;
        
        console.log('Data synced to cloud');
    } catch (error) {
        console.error('Sync to cloud failed:', error);
    }
}

// Sync data from cloud
async function syncFromCloud() {
    if (!syncEnabled || !currentUser) {
        return null;
    }

    try {
        const today = new Date().toDateString();
        
        // Get today's data
        const { data: cloudData, error } = await supabaseClient
            .from('health_data')
            .select('*')
            .eq('user_id', currentUser.id)
            .eq('date', today)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
            throw error;
        }

        if (cloudData) {
            console.log('Data loaded from cloud');
            return cloudData.data;
        }

        return null;
    } catch (error) {
        console.error('Sync from cloud failed:', error);
        return null;
    }
}

// Get history from cloud
async function getHistoryFromCloud() {
    if (!syncEnabled || !currentUser) {
        return [];
    }

    try {
        const { data: historyData, error } = await supabaseClient
            .from('health_data')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('date', { ascending: false })
            .limit(30);

        if (error) throw error;

        return historyData.map(item => item.data);
    } catch (error) {
        console.error('Failed to get history from cloud:', error);
        return [];
    }
}

// Check if user is logged in
function isLoggedIn() {
    return syncEnabled && currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSupabase,
        signIn,
        signUp,
        signOut,
        syncToCloud,
        syncFromCloud,
        getHistoryFromCloud,
        isLoggedIn,
        getCurrentUser
    };
}

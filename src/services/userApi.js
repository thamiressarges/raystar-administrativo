import { supabase } from './supabase';

export const UserApi = {

  async getAllUsers() {
    const { data, error } = await supabase
      .from('users') 
      .select('*');
      
    if (error) throw error;
    return data;
  },

  async approveAdmin({ userIdToApprove }) {
    console.log("Chamando RPC 'approve_admin':", userIdToApprove);
    
    const { data, error } = await supabase.rpc('approve_admin', {
      admin_uid: userIdToApprove
    });

    if (error) throw error;
    return data;
  },

  async deleteAdmin({ userIdToDelete }) {
    console.log("Chamando RPC 'reject_admin':", userIdToDelete);

    const { data, error } = await supabase.rpc('reject_admin', {
      admin_uid: userIdToDelete,
    });

    if (error) throw error;
    return data;
  },
};
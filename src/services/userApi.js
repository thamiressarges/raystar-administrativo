import { supabase } from './supabase';

export const UserApi = {

  async getAllUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  },

  async getClients({ page, limit, searchTerm = "" }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('users')
      .select('uid, name, email, phones, cpf', { count: 'exact' })
      .eq('is_deleted', false)
      .contains('permissions', '{client}');

    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) throw new Error(error.message);
    return { data, count };
  },

  async getClientById(uid) {
    const { data, error } = await supabase.from('users').select('*').eq('uid', uid).single();
    if (error) throw error;
    return data;
  },

  async deleteClient(uid) {
    const { error } = await supabase
        .from('users')
        .update({ is_deleted: true, status: 'deleted' })
        .eq('uid', uid);
    if (error) throw error;
    return true;
  },

  async approveAdmin({ userIdToApprove }) {
    const { data, error } = await supabase.rpc('approve_admin', { admin_uid: userIdToApprove });
    if (error) throw error;
    return data;
  },

  async deleteAdmin({ userIdToDelete }) {
    const { data, error } = await supabase.rpc('reject_admin', { admin_uid: userIdToDelete });
    if (error) throw error;
    return data;
  },

  async recoverPassword(email) {
    const redirectUrl = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
    if (error) throw error;
    return true;
  },

  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  },

  async signUp({ email, password, name }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
    });

    if (error) throw error;
    if (!data.user) throw new Error("Erro inesperado ao criar usuário.");
    
    return data;
  }
};
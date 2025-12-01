import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { UserApi } from '../services/userApi';

export function useProfile() {
    const { userProfile: currentUser } = useAuth();
    
    const [loading, setLoading] = useState(true);
    const [activeUsers, setActiveUsers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);

    const isSuperAdmin = currentUser?.permissions?.includes('super_admin');

    const loadData = useCallback(async () => {
        if (!isSuperAdmin) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const allUsers = await UserApi.getAllUsers();
            setActiveUsers(allUsers.filter(u => u.status === 'active'));
            setPendingUsers(allUsers.filter(u => u.status === 'pending'));
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar lista de usuários.");
        } finally {
            setLoading(false);
        }
    }, [isSuperAdmin]);

    useEffect(() => {
        if (currentUser) {
            loadData();
        }
    }, [currentUser, loadData]);

    const approveUser = async (user) => {
        setLoading(true);
        try {
            await UserApi.approveAdmin({ userIdToApprove: user.uid });
            toast.success(`Usuário ${user.name} APROVADO!`);
            await loadData();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao aprovar usuário.");
            setLoading(false);
        }
    };

    const removeUser = async (user) => {
        setLoading(true);
        try {
            await UserApi.deleteAdmin({ userIdToDelete: user.uid });
            toast.success(`Usuário ${user.name} processado com sucesso.`);
            await loadData();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao remover usuário.");
            setLoading(false);
        }
    };

    return {
        currentUser,
        loading,
        isSuperAdmin,
        activeUsers,
        pendingUsers,
        approveUser,
        removeUser
    };
}
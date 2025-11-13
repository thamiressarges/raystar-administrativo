import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiMail, FiShield, FiCalendar, FiUsers, FiUserCheck, FiAlertTriangle,
  FiInfo, FiTrash2, FiChevronLeft, FiCheckCircle
} from 'react-icons/fi';
import { Header } from '../../components/Header';
import { Brand } from '../../components/Brand';
import { Menu } from '../../components/Menu';
import { Loading } from '../../components/Loading';
import { ConfirmModal } from '../../components/ConfirmModal';
import { useMenu } from '../../contexts/MenuContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserApi } from '../../services/userApi';
import {
  Container, Content, BackLink, ProfileCard, Avatar, ProfileInfo,
  Section, AdminTable, MiniAvatar, TrashButton,
  ActionButton, PendingHeader 
} from './styles';


export function Profile() {
  const { isMenuOpen } = useMenu();
  const navigate = useNavigate();
  const { userProfile: currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  
  async function loadUsersData() {
    setLoading(true);
    try {
      const allUsers = await UserApi.getAllUsers();
      setActiveUsers(allUsers.filter(u => u.status === 'active'));
      setPendingUsers(allUsers.filter(u => u.status === 'pending'));
    } catch (error) {
      toast.error("Erro ao carregar lista de usuários: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentUser?.permissions?.includes('super_admin')) {
      loadUsersData();
    } else if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  const handleApproveAdmin = async (userToApprove) => {
    setLoading(true);
    try {
      await UserApi.approveAdmin({ userIdToApprove: userToApprove.uid });
      toast.success(`Usuário ${userToApprove.name} APROVADO!`);
      await loadUsersData();
    } catch (error) {
      toast.error("Erro ao aprovar usuário: " + error.message);
      setLoading(false);
    }
  };

  const confirmDelete = async (userToDelete) => {
    setLoading(true);
    try {
      await UserApi.deleteAdmin({ userIdToDelete: userToDelete.uid });
      toast.success(`Usuário ${userToDelete.name} rejeitado/deletado.`);
      await loadUsersData();
    } catch (error) {
      toast.error("Erro ao deletar usuário: " + error.message);
      setLoading(false);
    }
  };
  
  const handleDeleteAdmin = (userToDelete, isPending = false) => {
    if (userToDelete.uid === currentUser.uid) {
      toast.warn("Você não pode remover a si mesmo.");
      return;
    }
    
    const actionText = isPending ? "Rejeitar" : "Deletar";
    const message = `${actionText} o administrador "${userToDelete.name}"?`;

    toast.warn(
      ({ closeToast }) => (
        <ConfirmModal
          closeToast={closeToast}
          onConfirm={() => confirmDelete(userToDelete)}
          message={message}
          confirmText={actionText}
        />
      ),
      { autoClose: false, closeOnClick: false, theme: "light" }
    );
  };

  // --- Helpers ---
  const getInitials = (name) => {
    if (!name) return "?";
    const names = (name || "").split(' ');
    const first = names[0] ? names[0][0] : '';
    const last = names.length > 1 ? names[names.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  const isSuperAdmin = currentUser?.permissions?.includes('super_admin');
  const getRoleName = (permissions) => {
    if (!permissions) return "Usuário";
    if (permissions.includes('super_admin')) return 'Admin Principal';
    if (permissions.includes('admin')) return 'Administrador';
    return 'Usuário';
  };

  if (loading && !currentUser) {
    return (
        <Container $isopen={isMenuOpen}>
          <Brand />
          <Header />
          <Menu />
          <Loading />
        </Container>
    );
  }

  if (!currentUser) {
    navigate("/");
    return null;
  }

  return (
    <Container $isopen={isMenuOpen}>
      {loading && <Loading />}
      <Brand />
      <Header />
      <Menu />

      <Content>
        <BackLink onClick={() => navigate(-1)}>
          <FiChevronLeft /> Voltar
        </BackLink>

        <ProfileCard>
          <Avatar>{getInitials(currentUser.name)}</Avatar>
          <ProfileInfo>
            <h2>{currentUser.name}</h2>
            <span><FiMail size={18} /> {currentUser.email}</span>
            <span><FiShield size={18} /> {getRoleName(currentUser.permissions)}</span>
            <span><FiCalendar size={18} /> Membro desde {formatDate(currentUser.created_at)}</span>
          </ProfileInfo>
        </ProfileCard>

        {isSuperAdmin && (
          <>
            <Section>
              <PendingHeader> 
                <FiAlertTriangle/> Solicitações Pendentes ({pendingUsers.length})
              </PendingHeader>
              
              {pendingUsers.length === 0 ? (
                <p>Nenhuma solicitação pendente.</p>
              ) : (
                <AdminTable>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Solicitado em</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map(user => (
                      <tr key={user.uid}>
                        <td className="user-cell">
                          <MiniAvatar>{getInitials(user.name)}</MiniAvatar>
                          {user.name}
                        </td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.created_at)}</td>
                        <td style={{ display: 'flex', gap: '8px' }}>
                          <ActionButton
                            title="Aprovar"
                            onClick={() => handleApproveAdmin(user)}
                            disabled={loading}
                          >
                            <FiCheckCircle size={20} />
                          </ActionButton>
                          <TrashButton 
                            title="Rejeitar"
                            onClick={() => handleDeleteAdmin(user, true)}
                            disabled={loading}
                          >
                            <FiTrash2 size={20} />
                          </TrashButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </AdminTable>
              )}
            </Section>

            <Section>
              <h3><FiUsers /> Administradores Ativos ({activeUsers.length})</h3>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Função</th>
                    <th>Adicionado em</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsers.map(user => (
                    <tr key={user.uid}>
                      <td className="user-cell">
                        <MiniAvatar>{getInitials(user.name)}</MiniAvatar>
                        {user.name}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span 
                          className={`role-tag ${user.permissions?.includes('super_admin') ? 'super' : ''}`}
                        >
                          {getRoleName(user.permissions)}
                        </span>
                      </td>
                      <td>{formatDate(user.created_at)}</td>
                      <td>
                        <TrashButton 
                          onClick={() => handleDeleteAdmin(user, false)}
                          disabled={loading || user.uid === currentUser.uid}
                        >
                          <FiTrash2 size={20} />
                        </TrashButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </AdminTable>
            </Section>
          </>
        )}
        
        {!isSuperAdmin && (
           <Section>
             <h3><FiUserCheck /> Perfil de Administrador</h3>
             <p>Você é um administrador da loja. Contate o administrador principal para gerenciar usuários.</p>
           </Section>
        )}

      </Content>
    </Container>
  );
}
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiMail, FiShield, FiCalendar, FiUsers, FiUserCheck, FiAlertTriangle,
  FiTrash2, FiChevronLeft, FiCheckCircle
} from 'react-icons/fi';

import { useProfile } from '../../hooks/useProfile';
import { Loading } from '../../components/Loading';
import { ConfirmModal } from '../../components/ConfirmModal';
import { getInitials, formatDate, getRoleName } from '../../utils/format';

import { PageContainer } from '../../styles/commonStyles';
import {
  BackLink, ProfileCard, Avatar, ProfileInfo,
  Section, AdminTable, MiniAvatar, TrashButton,
  ActionButton, PendingHeader 
} from './styles';

export function Profile() {
  const navigate = useNavigate();
  
  const { 
    currentUser, 
    loading, 
    isSuperAdmin, 
    activeUsers, 
    pendingUsers, 
    approveUser, 
    removeUser 
  } = useProfile();

  const handleConfirmDelete = (userToDelete, isPending = false) => {
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
          onConfirm={() => removeUser(userToDelete)}
          message={message}
          confirmText={actionText}
        />
      ),
      { autoClose: false, closeOnClick: false, theme: "light" }
    );
  };

  if (loading && !currentUser) return <Loading />;
  if (!currentUser) return null; // Redirecionamento é tratado no PrivateRoute geralmente

  return (
    <PageContainer>
      {loading && <Loading />}

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
                          onClick={() => approveUser(user)}
                          disabled={loading}
                        >
                          <FiCheckCircle size={20} />
                        </ActionButton>
                        <TrashButton 
                          title="Rejeitar"
                          onClick={() => handleConfirmDelete(user, true)}
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
                        onClick={() => handleConfirmDelete(user, false)}
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
    </PageContainer>
  );
}
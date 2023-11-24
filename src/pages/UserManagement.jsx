import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import useAuth from '../hooks/common/useAuth';
import { useGetUsers } from '../hooks/common/useGetUsers';
import { useUpdateUserInfoByAdmin } from '../hooks/common/useUpdateUserInfoByAdmin';
import Pagination from '../components/Pagination';
import DeleteUserByAdminModal from '../components/modal/DeleteUserByAdminModal';
import EditUserByAdminModal from '../components/modal/EditUserByAdminModal';
import Filter from '../components/filter/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { TableData } from '../styles/Styles';

export default function UsersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { handleSubmit, control, setValue, getValues } = useForm();
  const { token } = useAuth();
  const { data: users, refetch: refetchUsers } = useGetUsers(
    currentPage,
    filterOptions
  );
  const {
    mutateAsync: updateUser,
    isLoading: loadingUpdateUser,
    error: errorUpdateUser,
  } = useUpdateUserInfoByAdmin();

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleOptionsClick = (item, label) => {
    setFilterOptions({
      ...filterOptions,
      [label]: item,
    });
  };

  const handleDeleteOption = (label) => {
    const updatedOptions = { ...filterOptions };
    delete updatedOptions[label];
    setFilterOptions(updatedOptions);
  };

  const updateUserHandler = async (userId) => {
    const updatedInfo = {};

    const usernameValue = getValues('username');
    if (usernameValue !== '' && usernameValue !== selectedUser?.username) {
      updatedInfo.username = usernameValue;
    }

    const rolesValue = getValues('roles');
    if (rolesValue !== '' && rolesValue !== selectedUser?.roles[0]) {
      updatedInfo.roles = [rolesValue];
    }

    try {
      await updateUser({
        userId,
        updatedInfo,
        token,
      });

      refetchUsers();
    } catch (error) {
      console.error('UserInfo Update Error', error.message);
    }

    handleCloseEditModal();
  };

  const handleDeleteUser = (userId) => {
    console.log('계정 삭제됨');
    // TODO: 계정 삭제 로직
    // setIsDeletionChecked(false);
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 9;
  const displayedUsers = users?.users?.slice(startIndex, endIndex + 1);

  return (
    <>
      <h1>유저 관리페이지</h1>
      <Filter
        filterOptions={filterOptions}
        handleOptionsClick={handleOptionsClick}
        handleDeleteOption={handleDeleteOption}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center d-none d-md-table-cell'>#</th>
            <th>닉네임</th>
            <th>계정</th>
            <th className='text-center text-nowrap'>가입 날짜</th>
            <th className='text-center text-nowrap'>유저 권한</th>
            <th className='text-center text-nowrap'>가입 유형</th>
            <th className='text-center'>옵션</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers &&
            displayedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className='text-center align-middle p-0 d-none d-md-table-cell'>
                  {index + 1 + (currentPage - 1) * 10}
                </td>
                <TableData $maxW={100} className='align-middle d-md-none'>
                  {user.username}
                </TableData>
                <TableData className='align-middle d-none d-md-table-cell'>
                  {user.username}
                </TableData>
                <TableData $maxW={100} className='align-middle d-md-none'>
                  {user.email}
                </TableData>
                <TableData className='align-middle d-none d-md-table-cell'>
                  {user.email}
                </TableData>
                <TableData
                  $maxW={100}
                  className='text-center align-middle d-md-none'
                >
                  {user.createdAt.slice(0, 10)}
                </TableData>
                <TableData className='text-center align-middle d-none d-md-table-cell'>
                  {user.createdAt.slice(0, 10)}
                </TableData>
                <td className='text-center align-middle'>
                  {user.roles[0] === 'admin' ? '관리자' : '유저'}
                </td>
                <td className='text-center align-middle'>
                  {user.provider === 'local' ? '로컬' : '소셜'}
                </td>
                <td className='text-center align-middle'>
                  <DropdownButton
                    id='dropdown-basic-button'
                    variant='light'
                    title={<FontAwesomeIcon icon={faEllipsis} />}
                  >
                    <Dropdown.Item onClick={() => handleShowEditModal(user)}>
                      수정
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowDeleteModal(user)}>
                      삭제
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className='d-flex justify-content-center'>
        <Pagination
          currentPage={currentPage}
          changePage={setCurrentPage}
          paginatinoData={users?.meta}
        />
      </div>

      <DeleteUserByAdminModal
        key={selectedUser?.id}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        user={selectedUser}
        handleSubmitForm={handleSubmit}
        handleUpdateUser={updateUserHandler}
        handleDelete={handleDeleteUser}
      />

      <EditUserByAdminModal
        key={selectedUser}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        user={selectedUser}
        handleSubmitForm={handleSubmit}
        handleUpdateUser={updateUserHandler}
        setValue={setValue}
        control={control}
        loading={loadingUpdateUser}
      />
    </>
  );
}
